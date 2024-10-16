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

const ChatList = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
  const [makeGroup, setMakeGroup] = useState(false);
  // Static chat data
  const chatList = [
    {
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '12:45 PM',
      isDelivered: true,
    },
    {
      name: 'Sandy Singh',
      lastMessage: 'Let’s catch up tomorrow!',
      time: '11:30 AM',
      isDelivered: false,
    },
    {
      name: 'Alice Johnson',
      lastMessage: 'Can you send me the file?',
      time: '10:15 AM',
      isDelivered: true,
    },
    {
      name: 'Kinner Mandela',
      lastMessage: 'Can you send me the file?',
      time: '10:15 AM',
      isDelivered: false,
    },
    {
      name: 'Michael Smith',
      lastMessage: 'I need the report ASAP.',
      time: '9:30 AM',
      isDelivered: true,
    },
    {
      name: 'Jessica Lee',
      lastMessage: 'Let’s catch up later.',
      time: '11:45 AM',
      isDelivered: false,
    },
    {
      name: 'David Miller',
      lastMessage: 'Meeting at 3 PM, right?',
      time: '8:50 AM',
      isDelivered: false,
    },
    {
      name: 'Emily Brown',
      lastMessage: 'Got it, thanks!',
      time: '7:30 AM',
      isDelivered: false,
    },
    {
      name: 'Chris Wilson',
      lastMessage: 'Please review the document.',
      time: '6:10 PM',
      isDelivered: true,
    },
    {
      name: 'Sophia Davis',
      lastMessage: 'Can we reschedule the call?',
      time: '3:00 PM',
      isDelivered: true,
    },
  ];
  const handleGroupToggle = () => {
    setMakeGroup(!makeGroup);
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

              <SearchBar marginClass="mb-2"  />
            </div>

            {/* ChatCard */}
            {chatList.length > 0 ? (
              <div className="chat_list flex flex-col gap-1">
                {chatList.map((chat, index) => (
                  <ChatCard key={index} chat={chat} />
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
