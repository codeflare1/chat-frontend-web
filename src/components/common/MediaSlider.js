import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChatContext } from "../../context/ChatContext";
import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const MediaSlider = ({ socket }) => {
  const loginUserId = localStorage.getItem("loginUserId");
  const token = localStorage.getItem("token");
  const { selectedMedia, setSelectedMedia, selectedReceiverId ,setIsMediaShow } = useContext(ChatContext);

  const [mediaURLs, setMediaURLs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const generatePreviews = async () => {
      const promises = selectedMedia.map((file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );

      try {
        const urls = await Promise.all(promises);
        setMediaURLs(urls);
      } catch (error) {
        console.error("Error generating previews:", error);
      }
    };

    if (selectedMedia?.length > 0) {
      generatePreviews();
    }
  }, [selectedMedia]);

  const handleAddMoreImages = (event) => {
    const files = Array.from(event.target.files);
    setSelectedMedia((prevMedia) => [...prevMedia, ...files]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("uploadDocument", file);
    formData.append("fileType", file.type);

    try {
      const response = await axios.post(
        `https://api.gatsbychat.com/v1/auth/uploadFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        return response.data.imageURI[0]?.imageURI; // Assuming API returns an array with a single URI
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSend = async () => {
    setIsUploading(true);

    for (const file of selectedMedia) {
      const uploadedURI = await uploadFile(file);
      if (uploadedURI) {
        const msgData = {
          senderId: loginUserId,
          receiverId: selectedReceiverId,
          fileType: file.type,
          message: uploadedURI,
        };
        socket.emit("sendMessage", msgData);
      }
    }

    console.log("All messages sent successfully");
    setSelectedMedia([]); // Clear selected media after sending
    setIsMediaShow(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box sx={{ width: "50%", margin: "0 auto", mt: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleAddMoreImages}
          />
          <label htmlFor="upload-image">
            <IconButton component="span" color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
        </Grid>
      </Grid>

      {mediaURLs.length > 0 ? (
        <Slider {...settings}>
          {mediaURLs.map((url, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <img
                src={url}
                alt={`Media ${index + 1}`}
                height={150}
                style={{ borderRadius: 8 }}
              />
              <Typography variant="caption" display="block" align="center">
                {selectedMedia[index]?.name || `Media ${index + 1}`}
              </Typography>
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="h6" align="center">
          No media available.
        </Typography>
      )}

      {mediaURLs.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          sx={{ mt: 2 }}
          onClick={handleSend}
          disabled={isUploading}
          fullWidth
        >
          {isUploading ? "Sending..." : "Send"}
        </Button>
      )}
    </Box>
  );
};

export default MediaSlider;
