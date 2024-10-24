import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import { io } from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatNameModal from './ChatNameModal';
import MainChatMore from './MainChatMore';
import ProfileDrawer from './ProfileDrawer';
import MainContent from './MainContent';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { ChatContext } from '../context/ChatContext';
import { getData, postData } from '../api/apiService';
import axios from 'axios';
import moment from 'moment';

const socket = io('https://api.gatsbychat.com'); // Replace with your socket server URL

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

const MainChat = () => {
  const loginUserId = localStorage.getItem("loginUserId");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserDate] = useState([]);
  const fileInputRef = useRef(null);
  const lastMessageRef = useRef(null); // Reference to the last message for auto-scroll

  const {
    selectedReceiverId,
    refreshMsg,
  } = useContext(ChatContext); // Access context values

  useEffect(() => {
    if (!socket || !selectedReceiverId || !loginUserId) return;

    socket.emit('joinChat', {
      senderId: loginUserId,
      receiverId: selectedReceiverId,
    });

    socket.emit('markAsSeen', {
      senderId: loginUserId,
      receiverId: selectedReceiverId,
    });

    return () => {
      socket.off('messageHistory');
      socket.off('receiveMessage');
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
        socket.emit('getAllChats', { senderId: loginUserId });
        socket.emit('markAsSeen', {
          senderId: loginUserId,
          receiverId: selectedReceiverId,
        });
      } else if (msg.senderId === loginUserId) {
        console.log("chla");
        setMessages((prev) => [...prev, msg]);
        socket.emit('getAllChats', { senderId: loginUserId });
        socket.emit('markAsSeen', {
          senderId: loginUserId,
          receiverId: selectedReceiverId,
        });
      }
    };

    // Register socket listeners
    socket.on('messageHistory', handleMessageHistory);
    socket.on('receiveMessage', handleReceiveMessage);

    // Cleanup listeners when dependencies change or component unmounts
    return () => {
      socket.off('messageHistory', handleMessageHistory);
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, selectedReceiverId, refreshMsg]);

  const handleEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const msgData = {
        senderId: loginUserId,
        receiverId: selectedReceiverId,
        fileType: null,
        message,
      };
      socket.emit('sendMessage', msgData);
      setMessage('');
    }
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
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
    const token = localStorage.getItem('token');
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('uploadDocument', selectedFile);
    formData.append('fileType', selectedFile?.type);

    try {
      const response = await axios.post(
        `https://api.gatsbychat.com/v1/auth/uploadFiles`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    checkLastScroll()
  }, [messages,socket, loginUserId, selectedReceiverId, refreshMsg]); // Trigger auto-scroll when messages change
  console.log("messages66", messages)


  const checkLastScroll = () => {
    if (lastMessageRef.current) {
      socket.emit('markAsSeen', {
        senderId: loginUserId,
        receiverId: selectedReceiverId,
      });
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' }); // Auto-scroll to the last message
    }
  }

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
            <Box className='overflow-auto'>
              <div className="flex items-center justify-between shadow p-4 fixed bg-white h-20 w-newW z-50 ">
                <div className="flex items-center gap-2">
                  <Avatar
                    sx={{ width: 24, height: 24, bgcolor: '#dfdfdf', fontWeight: 700, color: '#1E1E1E', fontSize: '10px' }}
                    src={userData?.user?.image}
                  >
                    {(!userData?.user?.image) && `${userData?.user?.firstName?.charAt(0)}${userData?.user?.lastName?.charAt(0)}`}
                  </Avatar>
                  <Typography variant="h6" className="font-medium text-base flex gap-2 capitalize cursor-pointer">
                    {userData?.user?.firstName} {userData?.user?.lastName || ''}
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

              <div className="main_chat overflow-auto pt-20 pb-16">
                <Box className="mt-6 mb-6">
                  <Box className="user_profile flex flex-col items-center">
                    <Avatar sx={{ width: 80, height: 80, bgcolor: '#dfdfdf', fontWeight: 700, color: '#1E1E1E', fontSize: '32px', }} src={userData?.user?.image}>
                      {(!userData?.user?.image) && `${userData?.user?.firstName?.charAt(0)}${userData?.user?.lastName?.charAt(0)}`}
                    </Avatar>
                    <ChatNameModal selectedUser={userData} />
                  </Box>
                </Box>

                <div className="flex-1 p-4 overflow-auto"  ref={lastMessageRef}>
                  {messages.map((msg, index) => { // Added index as a parameter to map
                    const isLastMessage = index === messages.length - 1; // Check if it's the last message
                    return ( // Added return statement for JSX
                      <div
                        key={msg._id}
                        className={`flex ${msg.senderId === loginUserId ? 'justify-end' : 'justify-start'} mb-4 gap-2`}
                      >
                        {msg.senderId !== loginUserId && (
                          <Avatar
                            sx={{ width: 45, height: 45, bgcolor: '#dfdfdf', fontWeight: 800, color: '#1E1E1E' }}
                            src={userData?.user?.image}
                          >
                            {(!userData?.user?.image) && `${userData?.user?.firstName?.charAt(0)}${userData?.user?.lastName?.charAt(0)}`}
                          </Avatar>
                        )}
                        <div
                          className={`${msg.senderId === loginUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-md flex items-end gap-2 relative`}
                        >
                          {msg?.message && msg?.message.includes("https") ? (
                            <img src={msg?.message} alt="Uploaded" height={50} width={50} /> // Use message as the src
                          ) : (
                            <Typography variant="body2" className='max-w-64 break-words'>{msg.message}</Typography>
                          )}
                          <div className='time_seen flex gap-1'>
                            <Typography variant="caption" className='msg_sent time text-xxs'>
                              {formatTime(msg.createdAt)}
                            </Typography>
                            {msg.senderId === loginUserId && isLastMessage && (
                              <Avatar sx={{ width: 16, height: 16 }} src={userData?.user?.image} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Box>

            <div className="flex items-center p-4 py-3 bg-whites shadow-chatWrite fixed bottom-0 bg-white w-newW z-50">
              {showEmojiPicker && (
                <div className="absolute bottom-16 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}

              <IconButton onClick={toggleEmojiPicker}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>

              {message && message.includes("https") ? (
                <img src={message} alt="Uploaded" height={20} width={20} className=" border text-sm border-gray-300 " />
              ) : (
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="flex-1 border text-sm border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              )}

              <Box className='ms-1.5 flex gap-2'>
                <KeyboardVoiceOutlinedIcon />
                <AttachFileOutlinedIcon onClick={handleSelectFile} style={{ cursor: 'pointer' }} />
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleSelectFile}
                  style={{ display: 'none' }}
                />
              </Box>

              <IconButton className="ml-2 text-blue-500" onClick={handleSendMessage}>
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
