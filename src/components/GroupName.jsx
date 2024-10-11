import React, { useState } from 'react';
import { Avatar, Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const GroupName = ({handleNameGroup}) => {
    const [imagePreview] = useState(''); // Default to no image
    const [age, setAge] = useState('');
    const [groupName, setGroupName] = useState(''); // State for group name
    const [members] = useState(['John Doe']); // Example initial member

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Check if the button should be enabled
    const isButtonDisabled = groupName.trim() === '' || members.length === 0;

    return (
        <Box
            sx={{
                width: '450px',
                bgcolor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                padding: '0',
                borderRight: '1px solid #dfdfdf',
                overflowY: 'scroll',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    bgcolor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    padding: '12px',
                }}
            >
                <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                    <Box className="flex justify-center relative pb-6">
                        <Box className="flex items-center">
                            <ArrowBackIosIcon className='absolute left-0 w-4 h-4 cursor-pointer' onClick={handleNameGroup} />
                            <Typography variant="h6" className="p-0 font-semibold leading-none text-base text-center">
                                Name this group
                            </Typography>
                        </Box>
                    </Box>
                </div>

                <Box className='flex flex-col justify-between h-full'>
                    <Box>
                        <div className="upload_img relative flex justify-center items-center mb-6">
                            <div className='relative'>
                                {/* Image preview or icon if no image is available */}
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className='w-20 h-20 rounded-full object-cover' />
                                ) : (
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: '#dfdfdf',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <GroupOutlinedIcon sx={{ fontSize: 48, color: '#525252' }} />
                                    </Box>
                                )}
                                <span className='bg-white w-6 p-1 h-6 rounded-full inline-block absolute bottom-0 right-0'>
                                    <img src="../assets/img/cam.svg" alt="" />
                                </span>
                            </div>
                            <input
                                type="file"
                                className='w-20 h-20 absolute opacity-0 cursor-pointer'
                            />
                        </div>

                        <Box className='flex flex-col gap-6'>
                            <Box>
                                <TextField
                                    type="text"
                                    placeholder='Group name (required)'
                                    className='w-full h-12 rounded-2xl border focus:outline-primary focus:outline-1'
                                    InputProps={{
                                        className: 'bg-white rounded-md',
                                        sx: {
                                            '& input': {
                                                paddingTop: '6px',
                                                paddingBottom: '6px',
                                                height: '36px',
                                                backgroundColor: 'white',
                                            },
                                        },
                                    }}
                                    value={groupName} // Bind the value to state
                                    onChange={(e) => setGroupName(e.target.value)} // Update state on change
                                />
                            </Box>
                            <Box className='flex items-center gap-20'>
                                <Typography variant='body2'>Disappearing message</Typography>
                                <FormControl sx={{ minWidth: 140 }}>
                                    <Select
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className='h-12 text-left capitalize bg-white'
                                    >
                                        <MenuItem value="">Off</MenuItem>
                                        <MenuItem value={10}>4 weeks</MenuItem>
                                        <MenuItem value={20}>1 week</MenuItem>
                                        <MenuItem value={30}>1 day</MenuItem>
                                        <MenuItem value={40}>8 hours</MenuItem>
                                        <MenuItem value={50}>1 hour</MenuItem>
                                        <MenuItem value={60}>5 minutes</MenuItem>
                                        <MenuItem value={70}>30 seconds</MenuItem>
                                        <MenuItem value={80}>Always</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* members */}
                            <Box className='members'>
                                <Typography variant='h6' className='text-Newblack capitalize text-base font-semibold mb-2'>members</Typography>
                                {members.map((member, index) => (
                                    <Box key={index} className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer'>
                                        <Box variant="text" className='text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1'>
                                            <Avatar alt={member} src='' sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className='me-2' />
                                            {member} <AccountCircleOutlinedIcon className='w-4 h-6 p-0 text-newgray' />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box className='mb-2 flex justify-end'>
                        <Button 
                            disabled={isButtonDisabled} // Update button's disabled state
                            variant="outlined" 
                            className='disabled:bg-gray-300 disabled:text-Newblack disabled:cursor-not-allowed bg-primary text-white font-semibold border-none max-w-24 w-full capitalize'>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default GroupName;
