// components/MainContent.js
import React from 'react';
import { Box, Link, Typography } from '@mui/material';

const MainContent = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: '#ffffff',
      }}
    >
      <Typography variant="h6" className='text-Newblack font-semibold flex flex-col justify-center items-center'>
        <img src="./loader.png" alt="" />
        Welcome to Gatsbychat
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }} className='text-newgray'>
        See <Link href="" className='no-underline text-primary'>what's new</Link> in this update
      </Typography>
    </Box>
  );
};

export default MainContent;
