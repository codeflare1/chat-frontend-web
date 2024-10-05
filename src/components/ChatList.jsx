import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArchivePopup from './ChatArchivePopup';
import ChatCard from './ChatCard';
import { LayoutContext } from '../context/LayotContextToggleProvider';

const ChatList = () => {
  const {isSidebarOpen, toggleSidebar } = useContext(LayoutContext)

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.5, 0.5, 0.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  // Static chat data
  const chatList = [
    {
      name: 'John Doe',
      // userImage: '../assets/img/user-2.png', 
      lastMessage: 'Hey, how are you?',
      time: '12:45 PM',
      isDelivered: true,
    },
    {
      name: 'Sandy Singh',
      // userImage: '../assets/img/user-2.png', 
      lastMessage: 'Let’s catch up tomorrow!',
      time: '11:30 AM',
      isDelivered: false,
    },
    {
      name: 'Alice Johnson',
      // userImage: '../assets/img/user-2.png', 
      lastMessage: 'Can you send me the file?',
      time: '10:15 AM',
      isDelivered: true,
    },
    {
      name: 'Kinner Mandela',
      // userImage: '../assets/img/user-2.png',
      lastMessage: 'Can you send me the file?',
      time: '10:15 AM',
      isDelivered: false,
    },
    {
      name: 'Michael Smith',
      // userImage: '../assets/img/user-3.png',
      lastMessage: 'I need the report ASAP.',
      time: '9:30 AM',
      isDelivered: true,
    },
    {
      name: 'Jessica Lee',
      // userImage: '../assets/img/user-4.png',
      lastMessage: 'Let’s catch up later.',
      time: '11:45 AM',
      isDelivered: false,
    },
    {
      name: 'David Miller',
      // userImage: '../assets/img/user-5.png',
      lastMessage: 'Meeting at 3 PM, right?',
      time: '8:50 AM',
      isDelivered: false,
    },
    {
      name: 'Emily Brown',
      // userImage: '../assets/img/user-6.png',
      lastMessage: 'Got it, thanks!',
      time: '7:30 AM',
      isDelivered: false,
    },
    {
      name: 'Chris Wilson',
      // userImage: '../assets/img/user-7.png',
      lastMessage: 'Please review the document.',
      time: '6:10 PM',
      isDelivered: true,
    },
    {
      name: 'Sophia Davis',
      // userImage: '../assets/img/user-8.png',
      lastMessage: 'Can we reschedule the call?',
      time: '3:00 PM',
      isDelivered: true,
    }
  ];

  return (
    <Box
      sx={{
        width: '350px',
        bgcolor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding:'0',
        borderRight: '1px solid #dfdfdf',
        overflowY:'scroll'
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
        <div className="flex flex-col sticky bg-bgChat top-0 z-50 pt-2 px-2.5 pb-0">
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
              <Button className="!border-none text-newgray !rounded-md">
                <PersonAddAltIcon />
              </Button>
              <Button className="!rounded-md text-newgray">
                <ArchivePopup />
              </Button>
            </ButtonGroup>
          </Box>
          <Search className="bg-search mx-0 mb-2 h-8 rounded-lg">
            <SearchIconWrapper>
              <SearchIcon className="h-4 w-4" />
            </SearchIconWrapper>
            <StyledInputBase
              className="w-full"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
              <h4 className="text-center text-base text-newgray font-semibold">No Chats</h4>
              <p className="text-center text-sm text-newgray font-normal">Recent Chats will appear here</p>
            </div>
          </div>
        )}
      </Box>
    </Box>

  );
};

export default ChatList;
