// components/MainContent.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const MainContent = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" color="primary">
        Welcome to Signal
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        See what's new in this update
      </Typography>
    </Box>
  );
};

export default MainContent;
