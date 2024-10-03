import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SettingPopup from './SettingPopup'
import ProfileModal from './ProfileModal'
const NAVIGATION = [
  {
    icon: <MenuIcon />,
  },
  {
    icon: <ChatIcon />,
  },
  {
    icon: <GroupIcon />,
  },
  {
    icon: <CallIcon />,
  },
];

const MainSidebar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <Box
      sx={{
        display: isSidebarOpen ? 'flex' : 'none', 
        flexDirection: 'column',
        height: '100vh',
        width: '60px',
        bgcolor: '#f0f0f0',
        justifyContent: 'space-between',
        borderRight:'1px solid #b5b5b5',
      }}
    >
      <List sx={{ p: 0 }}>
        {NAVIGATION.map((item, index) => (
          <ListItem
            button
            key={index}
            className="py-3 p-4"
            onClick={index === 0 ? toggleSidebar : null}
          >
            <ListItemIcon className='text-newgray'>{item.icon}</ListItemIcon>
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
      </List>
    </Box>
  );
};

export default MainSidebar;
