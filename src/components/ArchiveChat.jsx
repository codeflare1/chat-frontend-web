import React, { useState, } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupMember from './GroupMember';
import ChatCard from './ChatCard';


const ArchiveChat = ({ handleGroupToggle }) => {
    const [chooseMember, setchooseMember] = useState(false)
    const [hoveredBox, setHoveredBox] = useState(null);
    // Static chat data
    const handleGroup = () => {
        setchooseMember(!chooseMember)
    }
    return (

        <>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '350px',
                    bgcolor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    padding: '0',
                    borderRight: '1px solid #dfdfdf',
                    overflowY: 'scroll'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: '#f9f9f9',
                        display: 'flex',
                        flexDirection: 'column',
                        // height: '100%',
                        padding: '12px'
                    }}
                >
                    <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                        <Box className="flex justify-center relative pb-3">
                            <Box className="flex items-center">
                                <ArrowBackIosIcon className='absolute left-0 w-4 h-4 cursor-pointer' onClick={handleGroupToggle} />
                                <Typography variant="h6" className="p-0 font-semibold leading-none text-base text-center">
                                    Archive Chat
                                </Typography>
                            </Box>
                        </Box>

                    </div>


                    {/* Archive chat */}
                </Box>
                 <Box className='px-3 py-1.5 text-sm bg-Chathover'>No archive chats.</Box>
            </Box>
            
        </>



    );
};

export default ArchiveChat;
