import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChatContext } from "../../context/ChatContext";
import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const MediaSlider = ({ socket }) => {
  const loginUserId = localStorage.getItem("loginUserId");
  const token = localStorage.getItem("token");
  const { selectedMedia, setSelectedMedia, selectedReceiverId, setIsMediaShow } = useContext(ChatContext);

  const [mediaURLs, setMediaURLs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const generatePreviews = async () => {
      const promises = selectedMedia.map((file) =>
        new Promise((resolve, reject) => {
          if (file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          } else {
            resolve(null); // Skip preview for non-image files.
          }
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

  const handleAddMoreFiles = (event) => {
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
        return response.data.imageURI[0]?.imageURI;
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
    setSelectedMedia([]);
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

  const formatSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop().toUpperCase();
  };

  return (
    <Box className='media_modal' sx={{ width: "50%", margin: "0 auto", mt: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <input
            accept="image/*,video/*,.pdf,.doc,.docx"
            id="upload-media"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleAddMoreFiles}
          />
          <label htmlFor="upload-media">
            <IconButton component="span" color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
        </Grid>
      </Grid>

      {mediaURLs.length > 0 ? (
        <Slider {...settings}>
          {selectedMedia.map((file, index) => {
            const isImage = file.type.startsWith("image");
            const fileExtension = getFileExtension(file.name);

            return (
              <Box key={index} sx={{ textAlign: "center" }}>
                {isImage ? (
                  <img
                    src={mediaURLs[index]}
                    alt={`Media ${index + 1}`}
                    height={150}
                    style={{ borderRadius: 8 }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      border: "1px solid #ccc",
                      borderRadius: 8,
                      padding: 2,
                      height: 150,
                    }}
                  >
                    <InsertDriveFileIcon fontSize="large" color="action" />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {file.name} ({fileExtension}) - {formatSize(file.size)}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
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
