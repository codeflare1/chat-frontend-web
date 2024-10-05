import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';

const CallCard = ({ calls }) => {
  return (
    <Box
      className="call_card px-2.5 py-2 rounded-none hover:bg-Chathover"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        cursor: 'pointer',
      }}
    >
      {/* User Avatar */}
      <Avatar
        alt={calls.name}
        sx={{ width: 48, height: 48, bgcolor:'#dfdfdf', color:'#4A4A4A' }}
        className="text-newgray"
      >
        <GroupIcon />
      </Avatar>

      {/* calls Details */}
      <Box sx={{ flexGrow: 1, marginLeft: '12px' }}>
        <Typography
          variant="body1"
          className="text-Newblack text-sm font-semibold mb-0.5"
        >
          {calls.name}
        </Typography>
        <Box className='flex items-center gap-1.5'>
            <Typography variant="body2" className='text-xs text-grayn'>
            {calls.status}
            </Typography>
            <span className='w-0.5 h-0.5 rounded-full bg-grayn'></span>
            <Typography variant="body2" className='text-xs text-grayn'>
            {calls.time}
            </Typography>

        </Box>
      </Box>

      {/* Call Icon */}
      <Box className="flex flex-col items-end justify-center">
        <Typography variant="caption" sx={{ color: '#888', marginBottom: '4px' }}>
        </Typography>
        <IconButton size="small" className="text-newgray">
        {calls.type === 'video' ? <VideocamIcon /> : <PhoneIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CallCard;
