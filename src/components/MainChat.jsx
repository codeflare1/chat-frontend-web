import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EmojiPicker from "emoji-picker-react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatNameModal from "./ChatNameModal";
import MainChatMore from "./MainChatMore";
import MainContent from "./MainContent";
import { ChatContext } from "../context/ChatContext";
import { getData, postData } from "../api/apiService";
import axios from "axios";
import MediaFile from "./common/MediaFile";
import ImageGalleryModal from "./ImageGalleryModal";

const socket = io("https://api.gatsbychat.com"); // Replace with your socket server URL

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

const MainChat = () => {
  const loginUserId = localStorage.getItem("loginUserId");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserDate] = useState([]);
  const lastMessageRef = useRef(null); 
  const { selectedReceiverId, refreshMsg } = useContext(ChatContext); // Access context values
  const [textareaHeightClass, setTextareaHeightClass] = useState("pb-16");
  const textFieldRef = useRef(null);
  const emojiPickerRef = useRef(null); 
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };
  useEffect(() => {
    const textFieldHeight = textFieldRef.current?.getBoundingClientRect().height;
    if (textFieldHeight > 80) { // Adjust the threshold as needed
      setTextareaHeightClass("pb-24");
    } else {
      setTextareaHeightClass("pb-16");
    }
  }, [message]);

  useEffect(() => {
    if (!socket || !selectedReceiverId || !loginUserId) return;

    socket.emit("joinChat", {
      senderId: loginUserId,
      receiverId: selectedReceiverId,
    });

    socket.emit("markAsSeen", {
      senderId: loginUserId,
      receiverId: selectedReceiverId,
    });

    return () => {
      socket.off("messageHistory");
      socket.off("receiveMessage");
    };
  }, [socket, loginUserId, selectedReceiverId, refreshMsg]);

  useEffect(() => {
    if (!socket) return;

    // Handler for message history
    const handleMessageHistory = (history) => {
      setMessages(history);
    };

    // Handler for real-time messages
    const handleReceiveMessage = (msg) => {
      if (msg.senderId === selectedReceiverId) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("getAllChats", { senderId: loginUserId });
        socket.emit("markAsSeen", {
          senderId: loginUserId,
          receiverId: selectedReceiverId,
        });
      } else if (msg.senderId === loginUserId) {
        console.log("chla");
        setMessages((prev) => [...prev, msg]);
        socket.emit("getAllChats", { senderId: loginUserId });
        socket.emit("markAsSeen", {
          senderId: loginUserId,
          receiverId: selectedReceiverId,
        });
      }
    };

    // Register socket listeners
    socket.on("messageHistory", handleMessageHistory);
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup listeners when dependencies change or component unmounts
    return () => {
      socket.off("messageHistory", handleMessageHistory);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, selectedReceiverId, refreshMsg]);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);


  const handleSendMessage = () => {
    if (message.trim()) {
      const msgData = {
        senderId: loginUserId,
        receiverId: selectedReceiverId,
        fileType: null,
        message,
      };
      socket.emit("sendMessage", msgData);
      setMessage("");
    }
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  useEffect(() => {
    getUserData();
  }, [selectedReceiverId]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getData(`/fetchOtherUser/${selectedReceiverId}`);
      if (response?.success === true) {
        setUserDate(response);
      }
    } catch (error) {
      console.log(error?.response?.message);
      setUserDate([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFile = async (event) => {
    const token = localStorage.getItem("token");
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("uploadDocument", selectedFile);
    formData.append("fileType", selectedFile?.type);

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
        setMessage(response?.data?.imageURI[0]?.imageURI);
      } else {
        setMessage("Upload failed");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    checkLastScroll();
  }, [messages, socket, loginUserId, selectedReceiverId, refreshMsg]); // Trigger auto-scroll when messages change
  console.log("messages66", messages);

  const checkLastScroll = () => {
    if (lastMessageRef.current) {
      socket.emit("markAsSeen", {
        senderId: loginUserId,
        receiverId: selectedReceiverId,
      });
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" }); // Auto-scroll to the last message
    }
  };

  // Helper function to format file sizes
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const imageMessages = messages
      .filter((msg) => msg.fileType?.startsWith("image/"))
      .map((msg) => msg.message);
    setImageUrls(imageMessages);
  }, [messages]);


  const renderMessageContent = (msg) => {
    const { message, fileType } = msg;

    if (fileType?.startsWith("image/")) {
        // Render an image if fileType starts with "image/"
        return (
            <img
                src={message}
                alt={"Uploaded Image"}
                // height={100}
                width={280}
                className="rounded cursor-pointer"
                onClick={() => handleImageClick()}
            />
        );
    } else if (fileType) {
        // Render other files with name, size, and download icon
        return (
            <div className="flex items-center gap-2">
                <DescriptionIcon style={{ color: "#fff" }} />
                <Typography variant="body2" className="text-white-500">
                    {fileType}
                </Typography>
                <a href={message} download>
                    <IconButton>
                        <DownloadIcon style={{ color: "#fff" }} />
                    </IconButton>
                </a>
            </div>
        );
    }

    // Render text if there's no fileType
    return (
        <Typography variant="body1" className="text-white-500">
            {message}
        </Typography>
    );
};


  return (
    <>
      {selectedReceiverId ? (
        <>
          {loading && (
            <Box className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-40">
              <CircularProgress />
            </Box>
          )}
          <div className="flex flex-col justify-between w-full h-screen bg-white">
            <Box className="overflow-auto">
              <div className="flex items-center justify-between shadow p-4 fixed bg-white h-20 w-newW z-50 ">
                <div className="flex items-center gap-2">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "#dfdfdf",
                      fontWeight: 700,
                      color: "#1E1E1E",
                      fontSize: "10px",
                    }}
                    src={userData?.user?.image}
                  >
                    {!userData?.user?.image == "" && `${userData?.user?.firstName?.charAt(0)}`}
                  </Avatar>
                  <Typography
                    variant="h6"
                    className="font-medium text-base flex gap-2 capitalize cursor-pointer"
                  >
                    {userData?.user?.firstName} {userData?.user?.lastName || ""}
                    <AccountCircleOutlinedIcon className="w-4 h-6 text-newgray" />
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <MainChatMore />
                  </IconButton>
                </div>
              </div>

              <div className={`main_chat overflow-auto pt-20 ${textareaHeightClass}`}>
                <Box className="mt-6 mb-6">
                  <Box className="user_profile flex flex-col items-center">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "#dfdfdf",
                        fontWeight: 700,
                        color: "#1E1E1E",
                        fontSize: "32px",
                      }}
                      src={userData?.user?.image}
                    >
                    {!userData?.user?.image == "" && `${userData?.user?.firstName?.charAt(0)}`}
                    </Avatar>
                    <ChatNameModal selectedUser={userData} />
                  </Box>
                </Box>

                <div className="flex-1 p-4 overflow-auto" ref={lastMessageRef}>
                  {messages.map((msg, index) => {
                    const isLastMessage = index === messages.length - 1;
                    const isCurrentUser = msg.senderId === loginUserId;

                    return (
                      <div
                        key={msg._id}
                        className={`flex ${isCurrentUser ? "justify-end flex-col" : "justify-between"
                          } mb-3 gap-1 items-end`}
                          ref={isLastMessage ? lastMessageRef : null}
                      >
                        <div className="flex items-end gap-2">
                          {/* Avatar for received messages */}
                          {!isCurrentUser && (
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "#dfdfdf",
                                fontWeight: 800,
                                color: "#1E1E1E",
                              }}
                              src={userData?.user?.image}
                            >
                               {!userData?.user?.image == "" && `${userData?.user?.firstName?.charAt(0)}`}
                            </Avatar>
                          )}

                          {/* Time for sent messages */}
                          {isCurrentUser && (
                            <Typography
                              variant="caption"
                              className="msg_sent time text-xxs text-gray-500"
                            >
                              {formatTime(msg.createdAt)}
                            </Typography>
                          )}

                          <div className="flex items-end gap-2">
                            {/* Message bubble with conditional content */}
                            <div
                              className={`${isCurrentUser
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-300 text-black"
                                } p-3 rounded-md flex items-end gap-2 relative`}
                            >
                              {renderMessageContent(msg)}
                            </div>

                            {/* Time for received messages */}
                            {!isCurrentUser && (
                              <Typography
                                variant="caption"
                                className="msg_received time text-xxs text-gray-500"
                              >
                                {formatTime(msg.createdAt)}
                              </Typography>
                            )}
                          </div>
                        </div>

                        {/* Seen indicator for the last message */}
                        <div className="time_seen flex gap-1">
                          {isLastMessage && (
                            <Avatar sx={{ width: 16, height: 16 }} src={userData?.user?.image}>
                                  {!userData?.user?.image == "" && `${userData?.user?.firstName?.charAt(0)}`}
                            </Avatar>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ImageGalleryModal
                  images={imageUrls}
                  open={isGalleryOpen}
                  onClose={() => setIsGalleryOpen(false)}
                  currentIndex={currentImageIndex}
                  setCurrentIndex={setCurrentImageIndex}
                />

              </div>
            </Box>

            <div className="flex items-center p-4 py-3 bg-whites shadow-chatWrite fixed bottom-0 bg-white w-newW z-50">
              {showEmojiPicker && (
                <div className="absolute bottom-16 z-50" ref={emojiPickerRef}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}

              <IconButton onClick={toggleEmojiPicker}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>

              {message && message.includes("https") ? (
                <img
                  src={message}
                  alt="Uploaded"
                  height={20}
                  width={20}
                  className=" border text-sm border-gray-300 "
                />
              ) : (
                <TextField
                  value={message}
                  ref={textFieldRef}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  multiline
                  minRows={1}
                  maxRows={4}
                  fullWidth
                  variant="outlined"
                  className="flex-1 break-words text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      padding: '12px',
                      '& textarea': {
                        padding: '0',
                        lineHeight: '1',

                      },
                    },
                    '& .MuiInputBase-input': {
                      height: '1.2em',
                    },
                    '& fieldset': {
                      borderColor: '#d1d5db',
                      borderRadius: '12px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0d6efd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0d6efd',
                    },
                  }}
                />

              )}

              <MediaFile />
              <IconButton
                className="ml-2 text-blue-500"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <MainContent />
      )}
    </>
  );
};

export default MainChat;
