import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChatContext } from "../../context/ChatContext";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const MediaSlider = ({ socket }) => {
  const loginUserId = localStorage.getItem("loginUserId");
  const token = localStorage.getItem("token");
  const { selectedMedia, setSelectedMedia, selectedReceiverId, setIsMediaShow } = useContext(ChatContext);

  const [mediaURLs, setMediaURLs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const generatePreviews = async () => {
      const promises = selectedMedia.map((file) =>
        new Promise((resolve) => {
          if (file && file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          } else {
            resolve(null); // Skip preview for non-image files
          }
        })
      );

      const urls = await Promise.all(promises);
      setMediaURLs(urls);
    };

    if (selectedMedia.length > 0) {
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

  const handleDelete = (index) => {
    setSelectedMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
    setMediaURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const formatSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getFileExtension = (filename) => {
    return filename ? filename.split(".").pop().toUpperCase() : "";
  };

  return (
    <Box className='media_modal border my-8 rounded-lg relative' sx={{ width: "50%", margin: "0 auto" }}>
      {mediaURLs.length > 0 ? (
        <Slider ref={sliderRef} className="Media_slider !flex !flex-col" {...settings}>
          {selectedMedia.map((file, index) => {
            const isImage = file && file.type.startsWith("image");
            const fileExtension = getFileExtension(file?.name);

            return (
              <Box key={index} sx={{ textAlign: "center", position: "relative" }}>
                {isImage ? (
                  <Box className='flex justify-center my-4 p-10 bg-gray-100 mx-auto'>
                    <img
                      src={mediaURLs[index]}
                      alt={`Media ${index + 1}`}
                      height={150}
                      className="rounded-lg h-40"
                    />
                  </Box>
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
                      {file?.name} ({fileExtension}) - {formatSize(file?.size)}
                    </Typography>
                  </Box>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <DeleteIcon className="text-gray-300" />
                </IconButton>
              </Box>
            );
          })}
        </Slider>
      ) : (
        <Box variant="h6" align="center" className="flex flex-col text-grayc h-full text-sm items-center justify-center">
          <strong>Oh!! No Media</strong>
          <span>There are no photos & videos. please try again!</span>
        </Box>
      )}

      <Box className='bottom_footer flex items-center justify-between bg-gray-200 absolute w-full bottom-0 px-6 py-2'>
        <Box>
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
        </Box>

          {/* Custom Image Previews as Dots inside bottom_footer */}
          <Box className="flex gap-2 max-w-56">
            {mediaURLs.map((url, index) => (
              <div
                key={index}
                style={{
                  width: "40px", // Width of the preview
                  height: "40px", // Height of the preview
                  overflow: "hidden",
                  borderRadius: "4px",
                  border: index === currentSlide ? "2px solid #007bff" : "1px solid #ddd", // Highlight active preview
                  cursor: "pointer",
                }}
                onClick={() => sliderRef.current.slickGoTo(index)}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Box>

        {mediaURLs.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSend}
            disabled={isUploading}
          >
            {isUploading ? "Sending..." : "Send"}
          </Button>
        )}
        
      </Box>
    </Box>
  );
};

export default MediaSlider;
