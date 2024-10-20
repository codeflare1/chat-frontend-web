import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
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

const MainChat = ({ socket, selectedReceiverId, setChatList, selectedUser }) => {
  console.log(selectedUser, 'dbsdadndnsmdnas')
  const loginUserId = localStorage.getItem("loginUserId")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  console.log("sender", loginUserId, selectedReceiverId)
  useEffect(() => {
    if (!socket || !selectedReceiverId || !loginUserId) return;


    socket.emit('joinChat', {
      senderId: loginUserId,
      receiverId: selectedReceiverId,
    });


    // Listen for message history
    socket.on('messageHistory', (history) => {
      setMessages(history);
    });

    // Listen for real-time incoming messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
      socket.emit('getAllChats', { senderId: loginUserId });
      socket.on('getChats', (chats) => {
        console.log('Received chats:', chats);
        setChatList(chats?.data);
      })
    });

    return () => {
      socket.off('messageHistory');
      socket.off('receiveMessage');
    };
  }, [socket, loginUserId, selectedReceiverId]);

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
        message,
      };
      socket.emit('sendMessage', msgData);
      setMessage('');
    }
  };

  return (
    <>
      {selectedReceiverId ?
        <>

          <div className="flex flex-col justify-between w-full h-screen bg-white">
            <Box className='overflow-auto'>
                {/* Header */}
                <div className="flex items-center justify-between shadow p-4">
                  <div className="flex items-center gap-2">
                    <Avatar 
                      sx={{ width: 24, height: 24, bgcolor: '#dfdfdf', fontWeight: 800, color:'#1E1E1E', fontSize:'12px' }}
                      src={selectedUser?.user?.image}
                    >
                      {(!selectedUser?.user?.image) && `${selectedUser?.user?.firstName?.charAt(0)}${selectedUser?.user?.lastName?.charAt(0)}`}
                    </Avatar>
                    <Typography variant="h6" className="font-medium text-base flex gap-2 capitalize cursor-pointer">
                      {/* <ProfileDrawer /> */}
                      {selectedUser?.user?.firstName} {selectedUser?.user?.lastName || ''}
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

                {/* Messages */}
                <div className="main_chat overflow-auto">
                  <Box className="mt-6 mb-6">
                    <Box className="user_profile flex flex-col items-center">
                      <Avatar sx={{ width: 80, height: 80, bgcolor: '#dfdfdf', fontWeight: 800, color:'#1E1E1E'}} src={selectedUser?.user?.image}>
                      {(!selectedUser?.user?.image) && `${selectedUser?.user?.firstName?.charAt(0)}${selectedUser?.user?.lastName?.charAt(0)}`}
                      </Avatar>
                      <ChatNameModal selectedUser={selectedUser} />
                    </Box>
                  </Box>
                  <Box className="date text-center">
                    <Typography variant="body2" className="text-gray-400">Thu, 3 Oct</Typography>
                  </Box>
                  <div className="flex-1 p-4 overflow-auto">
                    {messages.map((msg) => {
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${msg.senderId === loginUserId ? 'justify-end' : 'justify-start'} mb-4 gap-2`}
                        >
                        {msg.senderId !== loginUserId && (
                            <Avatar 
                              sx={{ width: 45, height: 45, bgcolor: '#dfdfdf', fontWeight: 800, color:'#1E1E1E' }}
                              src={selectedUser?.user?.image}
                            >
                              {(!selectedUser?.user?.image) && `${selectedUser?.user?.firstName?.charAt(0)}${selectedUser?.user?.lastName?.charAt(0)}`}
                            </Avatar>
                          )}
                          <div
                            className={`${msg.senderId === loginUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                              } p-3 rounded-md flex items-end gap-2`}
                          >
                            <Typography variant="body2">{msg.message}</Typography>
                            {msg.senderId === loginUserId &&

                              <>
                                {msg?.isSeen ?
                                  <DoneAllIcon sx={{ color: '#FFF' }} /> :
                                  <DoneAllIcon className="w-4 h-4" />

                                }
                              </>

                            }
                          </div>
                        </div>

                      )
                    })}
                  </div>
                </div>
            </Box>

            {/* Input */}
            <div className="flex items-center p-4 py-3 bg-white relative">
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}

              {/* Emoji Icon Button */}
              <IconButton onClick={toggleEmojiPicker}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>

              {/* Message Input */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevents a new line if Enter is pressed without Shift
                    handleSendMessage();
                  }
                }}
              />
              <AttachFileOutlinedIcon />

              {/* Send Button */}
              <IconButton className="ml-2 text-blue-500" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </> :

        <MainContent />


      }
    </>


  );
};

export default MainChat;
