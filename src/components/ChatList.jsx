import React, { useContext, useState } from 'react';
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

const ChatList = ({socket,setSelectedReceiverId}) => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
  const loginUserId = localStorage.getItem("loginUserId")
  const [makeGroup, setMakeGroup] = useState(false);
  // Static chat data
  const chatList = [
    {
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '12:45 PM',
      isDelivered: true,
      senderId:"6655b54710effd288d44f56d"
    },
    {
      name: 'Sandy Singh',
      lastMessage: 'Let’s catch up tomorrow!',
      time: '11:30 AM',
      isDelivered: false,
      senderId:"66a774bf285c4f6663e61ba9"
    },
 
  ];
  const handleGroupToggle = () => {
    setMakeGroup(!makeGroup);
  };



const JoinChat = (receiverId,)=>{
  socket.emit('joinChat', { senderId:loginUserId , receiverId });
  setSelectedReceiverId(receiverId)
}

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
            padding: '0',
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

              <SearchBar />
            </div>

            {/* ChatCard */}
            {chatList.length > 0 ? (
              <div className="chat_list flex flex-col gap-1">
                {chatList.map((chat, index) => (
                  <div onClick={()=>JoinChat(chat?.senderId)} key={index} >
                    <ChatCard chat={chat} />
                    </div>
                ))}
              </div>
            ) : (
              <div className="chat_main flex flex-col items-center justify-center h-screen ">
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
