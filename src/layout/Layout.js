import React, { useState } from 'react';
import MainSidebar from '../components/MainSidebar';
import ChatList from '../components/ChatList';
import { Box } from '@mui/material';
import CallList from '../components/CallList';

const Layout = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
    <Box sx={{ display: 'flex', overflow:'hidden' }}>
        <MainSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* <ChatList isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <CallList isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {props?.children}
    </Box>
    </div>
   
  );
};

export default Layout;
