import React, { useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CallHistroyPopup from './CallHistroyPopup';
import FilterListIcon from '@mui/icons-material/FilterList';
import CallCard from './CallCard';
import { LayoutContext } from '../context/LayotContextToggleProvider';
import NewCall from './NewCall';
import SearchBar from './common/SearchBar';

const CallList = () => {
    const { isSidebarOpen, toggleSidebar } = useContext(LayoutContext);
    const [newCall, setNewCall] = useState(false);

    const handleGroup = () => {
        setNewCall(!newCall); // Toggles the NewCall component
    };

    const CallList = [
        {
            name: 'John Doe',
            status: 'Incoming',
            type: 'video',
            lastMessage: 'Hey, how are you?',
            time: '21m',
            isDelivered: true,
        },
        {
            name: 'Sandy Singh',
            status: 'Outgoing',
            type: 'voice',
            lastMessage: 'Let’s catch up tomorrow!',
            time: '8:16 pm',
            isDelivered: false,
        },
        {
            name: 'Alice Johnson',
            status: 'Incoming',
            type: 'video',
            lastMessage: 'Can you send me the file?',
            time: '50m',
            isDelivered: true,
        },
        {
            name: 'Kinner Mandela',
            status: 'Incoming',
            type: 'voice',
            lastMessage: 'Can you send me the file?',
            time: '10m',
            isDelivered: false,
        },
        {
            name: 'Michael Smith',
            status: 'Incoming',
            type: 'voice',
            lastMessage: 'I need the report ASAP.',
            time: '9:23 am',
            isDelivered: true,
        },
    ];

    return (
        <>
            {newCall ? (
                <NewCall handleGroup={handleGroup} /> // Render the NewCall component
            ) : (
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
                        }}
                    >
                        <div className="flex flex-col sticky bg-bgChat top-0 z-50 pt-3 px-3 pb-0">
                            <Box className="flex justify-between">
                                <Box className="flex items-center">
                                    {!isSidebarOpen && (
                                        <MenuIcon
                                            onClick={toggleSidebar}
                                            style={{ cursor: 'pointer', marginRight: '8px' }}
                                        />
                                    )}
                                    <Typography variant="h6" className="p-0 font-semibold leading-none">
                                        Calls
                                    </Typography>
                                </Box>
                                <ButtonGroup disableElevation variant="text">
                                    <Button className="!border-none text-newgray !rounded-md">
                                        <AddIcCallIcon onClick={handleGroup} /> {/* Clicking this will trigger NewCall */}
                                    </Button>
                                    <Button className="!rounded-md text-newgray">
                                        <CallHistroyPopup />
                                    </Button>
                                </ButtonGroup>
                            </Box>
                            <Box className="flex gap-2 items-center justify-between mb-2">
                                <SearchBar />
                                <Button className="!border-none text-newgray !rounded-full !min-w-5 h-9 pe-3.5">
                                    <FilterListIcon />
                                </Button>
                            </Box>
                        </div>

                        {/* Call List */}
                        {CallList.length > 0 ? (
                            <div className="chat_list flex flex-col gap-1">
                                {CallList.map((calls, index) => (
                                    <CallCard key={index} calls={calls} />
                                ))}
                            </div>
                        ) : (
                            <div className="chat_main flex flex-col items-center justify-center h-screen">
                                <div className="chat_new">
                                    <h4 className="text-center text-base text-newgray font-semibold">
                                        No Chats
                                    </h4>
                                    <p className="text-center text-sm text-newgray font-normal">
                                        Recent Chats will appear here
                                    </p>
                                </div>
                            </div>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CallList;
