import React, { useContext, useRef } from "react";
import { Box } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { ChatContext } from "../../context/ChatContext";
import { toast, ToastContainer } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

const MediaFile = () => {
  const { setSelectedMedia, setIsMediaShow } = useContext(ChatContext); // Access context values
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleSelectFile = async (event) => {
    const files = Array.from(event.target.files);

    // Validate file size (max 5MB)
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024); // 5MB = 5 * 1024 * 1024 bytes
    // const invalidFiles = files.filter(file => file.size > 2 * 1024); 

    if (invalidFiles.length > 0) {
      toast.error("File size should not exceed 5MB."); // Show toast notification
      return; // Stop further execution if file is invalid
    }

    // If all files are valid, update state
    setIsMediaShow(true);
    setSelectedMedia(files);
  };

  return (
    <Box className="ms-1.5 flex gap-2">
      <KeyboardVoiceOutlinedIcon />
      <AttachFileOutlinedIcon
        onClick={handleIconClick} // Trigger the file input on icon click
        style={{ cursor: "pointer" }}
      />
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleSelectFile}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default MediaFile;
