import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatCard = ({ chat }) => {
  return (
    <Box
      className="chat_card px-3 py-2 rounded-none hover:bg-Chathover"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        // backgroundColor: '#fff',
        cursor: 'pointer',
      }}
    >
      {/* User Avatar */}
      <Avatar alt={chat.name} src={chat.name} sx={{ width: 48, height: 48, bgcolor:'#dfdfdf', color:'#4A4A4A' }} />

      {/* Chat Details */}
      <Box sx={{ flexGrow: 1, marginLeft: '12px' }}>
        <Typography variant="body1" className='text-Newblack text-sm font-semibold'>
          {chat.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888' }}>
          {chat.lastMessage}
        </Typography>
      </Box>

      {/* Time and Delivered Icon */}
      <Box className='flex flex-col justify-end items-end'>
        <Typography variant="caption" sx={{ color: '#888' }}>
          {chat.time}
        </Typography>
        <DoneAllIcon sx={{ color: chat.isDelivered ? '#0d6efd' : '#b3b3b3', fontSize: 16, marginTop: '4px' }} />
      </Box>
    </Box>
  );
};

export default ChatCard;
