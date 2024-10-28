import React from "react";
import { Modal, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close, FileDownload } from "@mui/icons-material";

const ImageGalleryModal = ({ open, onClose }) => {
  const imageUrl = "https://png.pngtree.com/png-clipart/20240917/original/pngtree-transparent-background-abstract-black-and-white-png-image_16022324.png";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center h-screen w-full bg-black bg-opacity-75 relative">
        <IconButton onClick={onClose} className="absolute top-4 right-4">
          <Close style={{ color: "white" }} />
        </IconButton>

        {/* Download Icon */}
        <IconButton href={imageUrl} download target="_blank" className="absolute top-4 right-16">
            <FileDownload style={{ color: "white" }} />
        </IconButton>
        
        {/* Navigation Icons (static image, so no functionality here) */}
        <IconButton className="absolute left-4">
          <ArrowBack style={{ color: "white" }} />
        </IconButton>

        <img src={imageUrl} alt="Gallery" className="max-h-full w-2/4 max-w-full rounded-lg" />

        <IconButton className="absolute right-4">
          <ArrowForward style={{ color: "white" }} />
        </IconButton>
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;
