import React, { useContext, useEffect, useState, } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupIcon from '@mui/icons-material/Group';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TagIcon from '@mui/icons-material/Tag';
import ContactDots from './ContactDots'
import VerifiedIcon from '@mui/icons-material/Verified';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchBar from './common/SearchBar';
import GroupMember from './GroupMember';
import { ChatContext } from '../context/ChatContext';
import { getData } from '../api/apiService';


const NewChat = ({ handleGroupToggle, socket }) => {
    const loginUserId = localStorage.getItem('loginUserId');
    const [searchValue, setSearchValue] = useState("");
    const [chooseMember, setchooseMember] = useState(false)
    const [hoveredBox, setHoveredBox] = useState(null);
    const [Contacts, setContacts] = useState([]);

    const {
        setSelectedReceiverId,
    } = useContext(ChatContext);  // Access context values
    // Static chat data
    const handleGroup = () => {
        setchooseMember(!chooseMember)
    }

    const addToContact = (receiverId) => {
        socket.emit('joinChat', { senderId: loginUserId, receiverId });
        setSelectedReceiverId(receiverId)
        handleGroupToggle()
    }


    const handleSearchResult = (query) => {
        setSearchValue(query);

    };


    useEffect(() => {
        getUserData()
    }, [searchValue])

    const getUserData = async () => {
        try {
            const response = await getData(`/getAllUsers?search=${searchValue}`);
            if (response?.status === true) {
                setContacts(response?.data?.users);
            }
        } catch (error) {
            console.log(error?.response?.message);
            setContacts([]);
        } finally {
        }
    };

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
                        <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                            <Box className="flex justify-center relative pb-3">
                                <Box className="flex items-center">
                                    <ArrowBackIosIcon className='absolute left-0 w-4 h-4 cursor-pointer' onClick={handleGroupToggle} />
                                    <Typography variant="h6" className="p-0 font-semibold leading-none text-base text-center">
                                        New Chat
                                    </Typography>
                                </Box>
                            </Box>

                            <SearchBar marginClass="mb-2" setSearchValue={handleSearchResult} type="findFriend" />

                        </div>

                        {/* NewChat */}
                        <Box className='flex flex-col gap-1.5 mb-4'>
                            <Button variant="text" className='w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium' startIcon={<GroupIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full' />} onClick={handleGroup}>
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
                                <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' onClick={() => { addToContact(loginUserId) }} >
                                    <ListAltIcon sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className=' p-2 rounded-full me-2' /> Note to self <VerifiedIcon className='w-4 h-6 p-0 text-primary' />
                                </Box>
                                {hoveredBox === 1 && (
                                    <ContactDots sx={{ color: '#4A4A4A', }} />
                                )}
                            </Box>
                            {/* when any user in my contact */}

                            {Contacts && Contacts.length > 0 && Contacts.map((ele) => {
                                return (
                                    <Box className='w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer'
                                        onMouseEnter={() => setHoveredBox(2)}
                                        onMouseLeave={() => setHoveredBox(null)}
                                        key={ele?.id}
                                        onClick={() => { addToContact(ele.id) }}
                                    >
                                        <Box variant="text" className=' text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1' >
                                            <Avatar alt='' src={ele?.image} sx={{ width: 36, height: 36, bgcolor: '#dfdfdf', color: '#4A4A4A' }} className='me-2' />
                                            {ele?.firstName}
                                            <AccountCircleOutlinedIcon className='w-4 h-6 p-0 text-newgray' />
                                        </Box>
                                        {hoveredBox === 2 && (
                                            <ContactDots sx={{ color: '#4A4A4A', }} />
                                        )}
                                    </Box>
                                )
                            })}



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
            }
        </>
    );
};

export default NewChat;
