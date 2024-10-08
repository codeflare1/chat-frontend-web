import React, { useContext, } from 'react';
import { Link } from 'react-router-dom'; // Add this for linking
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SettingPopup from './SettingPopup';
import ProfileModal from './ProfileModal';
import { LayoutContext } from '../context/LayotContextToggleProvider';

const NAVIGATION = [
  {
    // title: 'Menu',
    icon: <MenuIcon />,
    // link: '/menu',
  },
  {
    // title: 'Chat',
    icon: <ChatIcon />,
    link: '/chat',
  },
  // {
  //   // title: 'Groups',
  //   icon: <GroupIcon />,
  //   link: '/group',
  // },
  {
    // title: 'Calls',
    icon: <CallIcon />,
    link: '/call',
  },
];

const MainSidebar = () => {

  const {isSidebarOpen, toggleSidebar } = useContext(LayoutContext)
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
            component={Link} // Use Link component to navigate
            to={item.link} // Link destination
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
      </List>
    </Box>
  );
};

export default MainSidebar;
