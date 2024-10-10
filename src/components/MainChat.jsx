import React, { useState } from 'react';
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EmojiPicker from 'emoji-picker-react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatNameModal from './ChatNameModal';
import MainChatMore from './MainChatMore';
import ProfileDrawer from './ProfileDrawer';

const MainChat = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    // Static conversation between two users
    const chatMessages = [
        { id: 1, sender: 'me', text: 'Hey! How are you?', time: '7:30 pm' },
        { id: 2, sender: 'other', text: 'I am good, what about you?', time: '7:31 pm' },
        { id: 3, sender: 'me', text: 'I am doing well, thanks!', time: '7:32 pm' },
        { id: 4, sender: 'other', text: 'That’s great to hear!', time: '7:33 pm' },
        { id: 5, sender: 'me', text: 'Are you available for a call later?', time: '7:34 pm' },
        { id: 6, sender: 'other', text: 'Yes, I’ll be free around 9 pm.', time: '7:35 pm' },
        { id: 7, sender: 'me', text: 'Perfect, I’ll give you a call then.', time: '7:36 pm' },
        { id: 8, sender: 'other', text: 'Sure! By the way, did you check the report I sent earlier?', time: '7:37 pm' },
        { id: 9, sender: 'me', text: 'Yes, I did. Everything looks good.', time: '7:38 pm' },
        { id: 10, sender: 'other', text: 'Awesome! I’ll move forward with the next steps then.', time: '7:39 pm' },
        { id: 11, sender: 'me', text: 'Sounds good! Let me know if you need anything else.', time: '7:40 pm' },
        { id: 12, sender: 'other', text: 'Will do! I might need your input for the final presentation.', time: '7:41 pm' },
        { id: 13, sender: 'me', text: 'Of course, just send me the details when you’re ready.', time: '7:42 pm' },
        { id: 14, sender: 'other', text: 'Great! How’s your weekend looking?', time: '7:43 pm' },
        { id: 15, sender: 'me', text: 'Not too busy. Got any plans?', time: '7:44 pm' },
        { id: 16, sender: 'other', text: 'Thinking about a hike on Sunday. Wanna join?', time: '7:45 pm' },
        { id: 17, sender: 'me', text: 'That sounds fun! I’ll check my schedule and let you know.', time: '7:46 pm' },
        { id: 18, sender: 'other', text: 'Cool, just let me know by Saturday.', time: '7:47 pm' },
        { id: 19, sender: 'me', text: 'Will do! Talk to you later.', time: '7:48 pm' },
        { id: 20, sender: 'other', text: 'Talk soon!', time: '7:49 pm' }
    ];

    // Correct handler for emoji click
    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    return (
        <div className="flex flex-col w-full h-screen bg-white">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4">
                <div className="flex items-center">
                    {/* <Avatar className="mr-2 text-Newblack w-6 h-6 text-sm font-semibold">N</Avatar> */}
                    <Avatar alt='' src='' sx={{ width: 24, height: 24, bgcolor: '#dfdfdf', color: '#4A4A4A', marginRight: '8px', fontSize: '14px', fontWeight: 600 }} >J</Avatar>
                    <div>
                        <Typography variant='h6' className="font-medium text-base flex "><ProfileDrawer /> <AccountCircleOutlinedIcon className='w-4 h-6 p-0 text-newgray' /> </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Tooltip>
                        <IconButton className='h-10 w-10'>
                            <VideocamIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip>
                        <IconButton className='h-10 w-10'>
                            <CallIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip>
                        <IconButton className='h-10 w-10'>
                            <MainChatMore />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <div className="main_chat overflow-auto">
                <Box className="mt-6 mb-6">
                    <Box className="user_profile flex flex-col justify-center items-center gap-2">
                        <Avatar alt='' src='' sx={{ width: 80, height: 80, bgcolor: '#dfdfdf', color: '#4A4A4A', marginRight: '8px', fontSize: '36px', fontWeight: 600 }} >J</Avatar>
                        <div className='name_modal chat_name_modal'>
                            {/* Name popup */}
                            <ChatNameModal />
                        </div>
                    </Box>
                </Box>
                {/* Messages */}
                <Box className="date text-center">
                    <Typography variant='body2' className='text-gray-400'>Thu, 3 Oct</Typography>
                </Box>
                <div className="flex-1 p-4 overflow-auto">
                    {chatMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            {/* If message is from 'other', show the avatar */}
                            {message.sender === 'other' && (
                                <Avatar alt='' src='' sx={{ width: 45, height: 45, bgcolor: '#dfdfdf', color: '#4A4A4A', marginRight: '8px', fontSize: '20px', fontWeight: 600 }} >J</Avatar>
                            )}

                            <div className={`${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-xl flex items-end gap-2`}>
                                <Typography variant='body2' className='text-sm'>{message.text}</Typography>
                                <p className="text-right text-xs">{message.time}</p>
                                {message.sender === 'me' && <DoneAllIcon className='w-4 h-4' />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="flex items-center p-4 py-3 bg-white relative">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-16 z-50">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}

                {/* Emoji Icon Button */}
                <IconButton onClick={toggleEmojiPicker}>
                    <EmojiEmotionsOutlinedIcon />
                </IconButton>

                {/* Message Input */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <AttachFileOutlinedIcon />

                {/* Send Button */}
                <IconButton className="ml-2 text-blue-500">
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default MainChat;
