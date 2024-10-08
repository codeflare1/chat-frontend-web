import React, { useState, } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupIcon from '@mui/icons-material/Group';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TagIcon from '@mui/icons-material/Tag';
import ContactDots from './ContactDots'
import VerifiedIcon from '@mui/icons-material/Verified';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



const NewChat = () => {
    //   const {isSidebarOpen, toggleSidebar } = useContext(LayoutContext)
    const [hoveredBox, setHoveredBox] = useState(null); 

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(0.5, 0.5, 0.5, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    // Static chat data


    return (
        <Box
            sx={{
                width: '350px',
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
                <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                    <Box className="flex justify-center relative pb-3">
                        <Box className="flex items-center">
                            <ArrowBackIosIcon className='absolute left-0 w-4 h-4 cursor-pointer' />
                            <Typography variant="h6" className="p-0 font-semibold leading-none text-base text-center">
                                New Chat
                            </Typography>
                        </Box>
                    </Box>
                    <Search className="bg-search mx-0 mb-2 h-8 rounded-lg">
                        <SearchIconWrapper>
                            <SearchIcon className="h-4 w-4" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            className="w-full"
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>

                {/* NewChat */}
                <Box className='flex flex-col gap-1.5 mb-4'>
                    <Button variant="text" className='w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium' startIcon={<GroupIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full' />}>
                        New Group
                    </Button>
                    <Button variant="text" className='w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium' startIcon={<AlternateEmailIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full' />}>
                        Find by username
                    </Button>
                    <Button variant="text" className='w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium' startIcon={<TagIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full' />}>
                        Find by Phone number
                    </Button>
                </Box>

                {/* Contact */}
                <Box className='mb-4'>
                    <Typography variant='h6' className='text-Newblack text-base font-semibold mb-2'>Contact</Typography>
                    {/* This is showing default */}
                    <Box className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer' 
                     onMouseEnter={() => setHoveredBox(1)} 
                     onMouseLeave={() => setHoveredBox(null)}
                    >
                        <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' >
                            <ListAltIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full me-2' /> Note to self <VerifiedIcon className='w-4 h-6 p-0 text-primary' />
                        </Box>
                        {hoveredBox === 1 && (
                            <ContactDots sx={{ color: '#4A4A4A', }} />
                        )}
                    </Box>
                    {/* when any user in my contact */}
                    <Box className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer' 
                     onMouseEnter={() => setHoveredBox(2)} 
                     onMouseLeave={() => setHoveredBox(null)} 
                    >
                        <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' >
                        <Avatar alt='' src='' sx={{ width: 36, height: 36, bgcolor:'#dfdfdf', color:'#4A4A4A' }} className='me-2' /> John Doe <AccountCircleOutlinedIcon className='w-4 h-6 p-0 text-newgray' />
                        </Box>
                        {hoveredBox === 2 && (
                            <ContactDots sx={{ color: '#4A4A4A', }} />
                        )}
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
                            <Typography variant='body' className='text-xs text-gray-400'>14 members</Typography>
                            </div> 
                        </Box>
                        
                    </Box>
                    
                </Box>
            </Box>
        </Box>

    );
};

export default NewChat;
