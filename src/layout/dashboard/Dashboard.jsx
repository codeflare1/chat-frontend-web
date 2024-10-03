import React, { useState } from 'react';
import { Box } from '@mui/material';
import MainSidebar from '../../components/MainSidebar';
import ChatList from '../../components/ChatList';
import MainContent from '../../components/MainContent';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box sx={{ display: 'flex', overflow:'hidden' }}>
        <MainSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <ChatList isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent />
    </Box>
  );
};

export default Dashboard;
