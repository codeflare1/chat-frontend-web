import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ff6f61', mb: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
        404: Page Not Found
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'gray', mb: 3 }}>
        Oops! The page you are looking for doesn't exist.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={goToDashboard}
        sx={{ textTransform: 'none' }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
