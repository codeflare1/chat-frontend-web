import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import SettingPopup from './SettingPopup';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileModal from './ProfileModal';
import { LayoutContext } from '../context/LayotContextToggleProvider';
import { ListItemText } from '@mui/material';

const NAVIGATION = [
  {
    icon: <MenuIcon />,
  },
  {
    icon: <ChatIcon />,
    link: '/chat',
  },
  {
    icon: <CallIcon />,
    link: '/call',
  },
];

// Full-screen loader component
const FullScreenLoader = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 1300,
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

const MainSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true); // Start loading
    localStorage.clear();
    setTimeout(() => {
      setLoading(false); // Stop loading after redirect
      navigate('/');
    }, 1200);
  };

  return (
    <>
      {loading && <FullScreenLoader />} {/* Show full-screen loader */}
      
      <Box
        sx={{
          display: isSidebarOpen ? 'flex' : 'none',
          flexDirection: 'column',
          height: '100vh',
          width: '60px',
          bgcolor: '#f9f9f9',
          justifyContent: 'space-between',
          borderRight: '1px solid #dfdfdf',
        }}
      >
        <List sx={{ p: 0 }}>
          {NAVIGATION.map((item, index) => (
            <ListItem
              button
              key={index}
              className="py-3 p-4"
              onClick={index === 0 ? toggleSidebar : null}
              component={Link}
              to={item.link}
            >
              <ListItemIcon className="text-newgray">{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>

        <List>
          <ListItem button className="p-0">
            <ListItemIcon>
              <SettingPopup />
            </ListItemIcon>
          </ListItem>
          <ListItem button className="p-0">
            <ListItemIcon>
              <ProfileModal />
            </ListItemIcon>
          </ListItem>
          <ListItem button className="p-0 cursor-pointer" onClick={handleLogout}>
            <ListItemIcon className="justify-center">
              <LogoutIcon className="h-12 flex justify-center items-center text-newgray" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default MainSidebar;
