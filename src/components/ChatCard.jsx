import React, { useContext } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import moment from 'moment';
import { ChatContext } from '../context/ChatContext';

const ChatCard = ({ chat, isSendingMessage }) => {
  const { selectedReceiverId } = useContext(ChatContext); 
  const loginUserId = localStorage.getItem('loginUserId');

  const formatChatTimestamp = (date) => {
    const today = moment().startOf('day');
    const messageDate = moment(date);

    if (messageDate.isSame(today, 'day')) {
      return messageDate.format('HH:mm');
    } else if (messageDate.isSame(today.subtract(1, 'days'), 'day')) {
      return 'Yesterday ';
    } else {
      return messageDate.format('MMM DD');
    }
  };

  const renderDeliveryIcon = () => {
    if (chat?.unseenCount > 0) {
      return null;
    }

    // if (isSendingMessage) {
    //   return null;
    // } else if (!chat.isDelivered) {
    //   return <DoneIcon sx={{ color: '#b3b3b3', fontSize: 16, marginTop: '4px' }} />;
    // } else if (chat.isDelivered && !chat.isSeen) {
    //   return <DoneAllIcon sx={{ color: '#b3b3b3', fontSize: 16, marginTop: '4px' }} />;
    // } else if (chat.isSeen) {
    //   return <DoneAllIcon sx={{ color: '#0d6efd', fontSize: 16, marginTop: '4px' }} />;
    // }
  };

  const extractFileName = (message) => {
    const fileUrlParts = message.split('/');
    return fileUrlParts[fileUrlParts.length - 1]; // Extract the last part, which is the filename
  };

  const renderMessagePreview = () => {
    const message = chat?.lastMessage || '';

    if (message.includes('.gif')) {
      return (
        <Box className="flex items-center gap-1">
          <ImageIcon sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="body2" sx={{ color: '#888' }}>
            Gif
          </Typography>
        </Box>
      );
    }

    if (message.includes('.jpg') || message.includes('.jpeg') || message.includes('.png')) {
      return (
        <Box className="flex items-center gap-1">
          <ImageIcon sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="body2" sx={{ color: '#888' }}>Image</Typography>
        </Box>
      );
    }

    if (message.includes('.mp4') || message.includes('.mov') || message.includes('.avi')) {
      return (
        <Box className="flex items-center gap-1">
          <VideoLibraryIcon sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="body2" sx={{ color: '#888' }}>Video</Typography>
        </Box>
      );
    }

    if (message.includes('.pdf') || message.includes('.doc') || message.includes('.docx')) {
      return (
        <Box className="flex items-center gap-1">
          <DescriptionIcon sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="body2" sx={{ color: '#888' }}>Document</Typography>
        </Box>
      );
    }


    return (
      <Typography
        variant="body2"
        sx={{
          color: '#888',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '215px',
        }}
      >
        {message}
      </Typography>
    );
  };

  return (
    <Box
      className="chat_card px-3 py-2 rounded-none hover:bg-Chathover"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
        cursor: 'pointer',
      }}
    >
      <Avatar
        alt={`${chat?.user?.firstName} ${chat?.user?.lastName}`}
        src={chat?.user?.image || ''}
        sx={{
          width: 48,
          height: 48,
          bgcolor: '#dfdfdf',
          color: '#4A4A4A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!chat?.user?.image && (
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            {`${chat?.user?.firstName?.charAt(0)}${chat?.user?.lastName?.charAt(0)}`.toUpperCase()}
          </Typography>
        )}
      </Avatar>

      <Box sx={{ flexGrow: 1, marginLeft: '12px' }}>
        {chat?._id === loginUserId ? (
          <Typography variant="body1" className="text-Newblack text-sm font-semibold">
            {chat?.user?.firstName} {chat?.user?.lastName} (you)
          </Typography>
        ) : (
          <Typography variant="body1" className="text-Newblack text-sm font-semibold">
            {chat?.user?.firstName} {chat?.user?.lastName}
          </Typography>
        )}
        <Box>{renderMessagePreview()}</Box>
      </Box>

      <Box className="flex flex-col justify-end items-end">
        <Typography variant="caption" sx={{ color: '#888' }}>
          {formatChatTimestamp(chat?.createdAt)}
        </Typography>

        {renderDeliveryIcon()}

        {selectedReceiverId !== chat?._id && chat?.unseenCount > 0 && (
          <Typography
            variant="caption"
            sx={{ color: '#fff', fontWeight: 'bold' }}
            className="bg-primary rounded-full max-w-4 h-4 w-full flex justify-center items-center text-xxs"
          >
            {chat?.unseenCount}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatCard;
