import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArchivePopup from './ChatArchivePopup';
import ChatCard from './ChatCard';
import SearchBar from './common/SearchBar';
import { LayoutContext } from '../context/LayotContextToggleProvider';
import NewChat from './NewChat';

const ChatList = ({ socket, setSelectedReceiverId }) => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
  const loginUserId = localStorage.getItem('loginUserId');
  const [makeGroup, setMakeGroup] = useState(false);
  // const [chatList, setChatList] = useState([  {
  //   id: "6710097c2923560263c31a76",
  //   name: "User 1"
  // },
  // {
  //   id: "671008bf2923560263c31a72",
  //   name: "User 2"
  // }]);

  const [chatList, setChatList] = useState([]);

  // Fetch chat list from the server when the component mounts
  useEffect(() => {
    if (socket) {
      // Emit event to get all chats
      socket.emit('getAllChats', { senderId: loginUserId });
      // Listen for 'getChats' event from the server
      socket.on('getChats', (chats) => {
        console.log('Received chats:', chats);
        setChatList(chats?.data);
      });

      // Cleanup the socket listener on component unmount
      return () => {
        socket.off('getChats');
      };
    }
  }, [socket, loginUserId]);

  const handleGroupToggle = () => setMakeGroup(!makeGroup);

  const joinChat = (receiverId) => {
    socket.emit('joinChat', { senderId: loginUserId, receiverId });
    setSelectedReceiverId(receiverId);
  };

  return (
    <>
      {makeGroup ? (
        <NewChat handleGroupToggle={handleGroupToggle} />
      ) : (
        <Box
          sx={{
            width: '450px',
            bgcolor: '#f9f9f9',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            padding: 0,
            borderRight: '1px solid #dfdfdf',
            overflowY: 'scroll',
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <div className="flex flex-col sticky bg-bgChat top-0 z-50 pt-3 px-3 pb-0">
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  {!isSidebarOpen && (
                    <MenuIcon
                      onClick={toggleSidebar}
                      style={{ cursor: 'pointer', marginRight: '8px' }}
                    />
                  )}
                  <Typography variant="h6" className="p-0 font-semibold leading-none">
                    Chats
                  </Typography>
                </Box>
                <ButtonGroup disableElevation variant="text">
                  <Button
                    className="!border-none text-newgray !rounded-md"
                    onClick={handleGroupToggle}
                  >
                    <PersonAddAltIcon />
                  </Button>
                  <Button className="!rounded-md text-newgray">
                    <ArchivePopup />
                  </Button>
                </ButtonGroup>
              </Box>

              <SearchBar marginClass="mb-2"  />
            </div>

            {chatList.length > 0 ? (
              <div className="chat_list flex flex-col gap-1">
                {chatList.filter(ele=>ele.id !== loginUserId).map((chat, index) => (
                  <div key={chat?._id || index} onClick={() => joinChat(chat?._id)}>
                    <ChatCard chat={chat} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="chat_main flex flex-col items-center justify-center h-screen">
                <div className="chat_new">
                  <h4 className="text-center text-base text-newgray font-semibold">
                    No Chats
                  </h4>
                  <p className="text-center text-sm text-newgray font-normal">
                    Recent Chats will appear here
                  </p>
                </div>
              </div>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatList;
