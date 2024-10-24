import React, { useContext, useRef } from "react";
import { Box } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { ChatContext } from "../../context/ChatContext";
const MediaFile = () => {
    const {setSelectedMedia, setIsMediaShow } = useContext(ChatContext); // Access context values
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };
  const handleSelectFile = async (event) => {
        const files = Array.from(event.target.files);
        if (files && files.length > 0) {
            setIsMediaShow(true)
            setSelectedMedia(files)
        }

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
