import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography, Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GroupIcon from '@mui/icons-material/Group';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TagIcon from '@mui/icons-material/Tag';
import ContactDots from './ContactDots';
import VerifiedIcon from '@mui/icons-material/Verified';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchBar from './common/SearchBar';
import GroupMember from './GroupMember';
import { ChatContext } from '../context/ChatContext';
import { getData } from '../api/apiService';
import FindByUsername from './FindByUsername';
import FindByNumber from './FindByNumber';

const NewChat = ({ handleGroupToggle, socket }) => {
    const loginUserId = localStorage.getItem('loginUserId');
    const [searchValue, setSearchValue] = useState("");
    const [chooseMember, setchooseMember] = useState(false);
    const [hoveredBox, setHoveredBox] = useState(null);
    const [Contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const skeletonCount = Contacts.length > 0 ? Contacts.length : 4;

    const { setSelectedReceiverId } = useContext(ChatContext); // Access context values
    const [findUsername, setFindUsername] = useState(false);
    const [findNumber, setFindNumber] = useState(false);

    const handleFindUsername = () => {
        setFindUsername(true); 
    };
    const handleFindNumber = () => {
        setFindNumber(true); 
    };

    const handleBack = () => {
        setFindUsername(false); 
    };

    const handleNumberBack = () => {
        setFindNumber(false); 
    };

    const handleGroup = () => {
        setchooseMember(!chooseMember);
    };

    const addToContact = (receiverId) => {    
        socket.emit('joinChat', {
            senderId: loginUserId,
            receiverId: receiverId,
        });
        
  
        setSelectedReceiverId({id:receiverId,type:"individual"});
        handleGroupToggle();
    };

    const handleSearchResult = (query) => {
        setSearchValue(query);
    };

    useEffect(() => {
        getUserData();
    }, [searchValue]);

    const getUserData = async () => {
        setLoading(true);  
        try {
            const response = await getData(`/getAllUsers?search=${searchValue}`);
            if (response?.status === true) {
                setContacts(response?.data?.users);
            }
        } catch (error) {
            console.log(error?.response?.message);
            setContacts([]);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <>
             {chooseMember ? (
                <GroupMember handleGroup={handleGroup} Contacts={Contacts} />
            ) : findUsername ? ( 
                <FindByUsername handleBack={handleBack} />
            ) : findNumber ? ( 
                <FindByNumber handleBack={handleNumberBack} />
             ) : (
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
                                    <ArrowBackIosIcon
                                        className="absolute left-0 w-4 h-4 cursor-pointer"
                                        onClick={handleGroupToggle}
                                    />
                                    <Typography
                                        variant="h6"
                                        className="p-0 font-semibold leading-none text-base text-center"
                                    >
                                        New Chat
                                    </Typography>
                                </Box>
                            </Box>

                            <SearchBar
                                marginClass="mb-2"
                                setSearchValue={handleSearchResult}
                                type="findFriend"
                            />
                        </div>

                        {/* NewChat */}
                        <Box className="flex flex-col gap-1.5 mb-4">
                            <Button
                                variant="text"
                                className="w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium"
                                startIcon={
                                    <GroupIcon
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: '#dfdfdf',
                                            color: '#4A4A4A'
                                        }}
                                        className=" p-2 rounded-full"
                                    />
                                }
                                onClick={handleGroup}
                            >
                                New Group
                            </Button>
                            <Button
                                variant="text"
                                className="w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium"
                                onClick={handleFindUsername}
                                startIcon={
                                    <AlternateEmailIcon
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: '#dfdfdf',
                                            color: '#4A4A4A'
                                        }}
                                        className=" p-2 rounded-full"
                                    />
                                }
                            >
                                Find by username
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleFindNumber}
                                className="w-full h-12 rounded-xl hover:bg-sidebar justify-start p-3 text-Newblack capitalize text-sm font-medium"
                                startIcon={
                                    <TagIcon
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: '#dfdfdf',
                                            color: '#4A4A4A'
                                        }}
                                        className=" p-2 rounded-full"
                                    />
                                }
                            >
                                Find by Phone number
                            </Button>
                        </Box>

                        {/* Contact */}
                        <Box className="mb-4">
                            <Typography
                                variant="h6"
                                className="text-Newblack text-base font-semibold mb-2"
                            >
                                Contact
                            </Typography>

                            {/* Note to self */}
                            <Box
                                className="w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer"
                                onMouseEnter={() => setHoveredBox('self')}
                                onMouseLeave={() => setHoveredBox(null)}
                            >
                                <Box
                                    variant="text"
                                    className=" text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1"
                                    onClick={() => {
                                        addToContact(loginUserId);
                                    }}
                                >
                                    <ListAltIcon
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: '#dfdfdf',
                                            color: '#4A4A4A'
                                        }}
                                        className=" p-2 rounded-full me-2"
                                    />
                                    Note to self{' '}
                                    <VerifiedIcon className="w-4 h-6 p-0 text-primary" />
                                </Box>
                                {hoveredBox === 'self' && (
                                    <ContactDots sx={{ color: '#4A4A4A' }} />
                                )}
                            </Box>

                            {/* Users list */}
                            {loading ? (
                                // Show skeleton while loading
                                // <>
                                    Array.from({ length: skeletonCount }).map((_, index) =>  (
                                        <Box
                                            key={index}
                                            className="w-full h-12 rounded-xl justify-between flex items-center p-3"
                                        >
                                            <Skeleton
                                                variant="circular"
                                                width={36}
                                                height={36}
                                                className="me-2"
                                            />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Skeleton
                                                    variant="text"
                                                    width="60%"
                                                    height={24}
                                                />
                                            </Box>
                                        </Box>
                                    ))
                                // </>
                            ) : (
                                Contacts &&
                                Contacts.length > 0 &&
                                Contacts.filter((ele) => ele.id !== loginUserId).map((ele) => {
                                    return (
                                        <Box
                                            className="users_list w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer"
                                            onMouseEnter={() => setHoveredBox(ele.id)}
                                            onMouseLeave={() => setHoveredBox(null)}
                                            key={ele?.id}
                                            onClick={() => {
                                                addToContact(ele.id);
                                            }}
                                        >
                                            <Box
                                                variant="text"
                                                className=" text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1"
                                            >
                                                <Avatar
                                                    alt=""
                                                    src={ele?.image}
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        bgcolor: '#dfdfdf',
                                                        color: '#4A4A4A'
                                                    }}
                                                    className="me-2"
                                                />
                                                {ele?.firstName} {ele?.lastName}
                                                <AccountCircleOutlinedIcon className="w-4 h-6 p-0 text-newgray" />
                                            </Box>
                                            {hoveredBox === ele.id && (
                                                <ContactDots sx={{ color: '#4A4A4A' }} />
                                            )}
                                        </Box>
                                    );
                                })
                            )}
                        </Box>

                        {/* Group */}
                        <Box>
                            <Typography
                                variant="h6"
                                className="text-Newblack text-base font-semibold mb-2"
                            >
                                Group
                            </Typography>

                            <Box
                                className="w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer"
                                onMouseEnter={() => setHoveredBox('team')}
                                onMouseLeave={() => setHoveredBox(null)}
                            >
                                <Box
                                    variant="text"
                                    className=" text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1"
                                >
                                    <GroupIcon
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: '#dfdfdf',
                                            color: '#4A4A4A'
                                        }}
                                        className=" p-2 rounded-full me-2"
                                    />
                                    Team chat
                                </Box>
                                {hoveredBox === 'team' && (
                                    <ContactDots sx={{ color: '#4A4A4A' }} />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default NewChat;
