import React, { useContext, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SettingPopup from './SettingPopup';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileModal from './ProfileModal';
import { LayoutContext } from '../context/LayotContextToggleProvider';
import { getData } from '../api/apiService';


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




const MainSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
  

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

 
  

  return (
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
          <ListItemIcon className='justify-center'>
            <LogoutIcon className='h-12 flex justify-center items-center text-newgray' />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
};

export default MainSidebar;
