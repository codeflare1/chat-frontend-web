import React, { useState, } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchBar from './common/SearchBar';
import GroupMember from './GroupMember';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';


const NewCall = ({ handleGroupToggle }) => {
    const [chooseMember, setchooseMember] = useState(false)
    const [hoveredBox, setHoveredBox] = useState(null);
    // Static chat data
    const handleGroup = () => {
        setchooseMember(!chooseMember)
    }
    return (

        <>
            {chooseMember ?
                <GroupMember handleGroup={handleGroup} /> :
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
                            height: '100vh',
                            padding: '12px'
                        }}
                    >
                        <div className="flex flex-col sticky bg-bgChat top-0 z-50 mb-4">
                            <Box className="flex justify-center relative pb-3">
                                <Box className="flex items-center">
                                    <ArrowBackIosIcon className='absolute left-0 w-4 h-4 cursor-pointer' onClick={handleGroupToggle} />
                                    <Typography variant="h6" className="p-0 font-semibold leading-none text-base text-center">
                                        New Call
                                    </Typography>
                                </Box>
                            </Box>
                            <SearchBar />

                        </div>



                        {/* Contact */}
                        <Box className='mb-4'>
                            <Typography variant='h6' className='text-Newblack text-base font-semibold mb-2'>Contact</Typography>
                            {/* when any user in my contact */}
                            <Box className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer'
                                onMouseEnter={() => setHoveredBox(2)}
                                onMouseLeave={() => setHoveredBox(null)}
                            >
                                <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' >
                                    <Avatar alt='' src='' sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className='me-2' /> John Doe <AccountCircleOutlinedIcon className='w-4 h-6 p-0 text-newgray' />
                                </Box>
                                <Box className='flex gap-1'>
                                    <IconButton size="small" className="text-newgray">
                                        <CallOutlinedIcon className='w-6 h-6' />
                                    </IconButton>
                                    <IconButton size="small" className="text-newgray">
                                        <VideocamIcon className='w-6 h-6' />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>

                        {/* Group */}
                        <Box>
                            <Typography variant='h6' className='text-Newblack text-base font-semibold mb-2'>Group</Typography>
                            {/* This is showing default */}
                            <Box className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer'
                                onMouseEnter={() => setHoveredBox(3)}
                                onMouseLeave={() => setHoveredBox(null)}
                            >
                                <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' >
                                    <GroupIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full me-2' />
                                    <div className='flex flex-col gap-0.5'>
                                        The Chat Group
                                    </div>
                                </Box>

                                <Box className='flex gap-1'>
                                    <IconButton size="small" className="text-newgray">
                                        <CallOutlinedIcon className='w-6 h-6' />
                                    </IconButton>
                                    <IconButton size="small" className="text-newgray">
                                        <VideocamIcon className='w-6 h-6' />
                                    </IconButton>
                                </Box>

                            </Box>

                        </Box>
                    </Box>
                </Box>
            }
        </>



    );
};

export default NewCall;
