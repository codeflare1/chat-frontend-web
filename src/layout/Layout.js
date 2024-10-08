import React from 'react';
import MainSidebar from '../components/MainSidebar';
import { Box } from '@mui/material';

const Layout = (props) => {
 
  return (
    <div>
    <Box sx={{ display: 'flex', overflow:'hidden' }}>
        <MainSidebar />
        {props?.children}
    </Box>
    </div>
   
  );
};

export default Layout;
