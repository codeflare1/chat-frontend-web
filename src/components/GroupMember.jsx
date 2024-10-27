import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './common/SearchBar';
import GroupName from './GroupName';

const GroupMember = ({ handleGroup, Contacts }) => {
    const loginUserId = localStorage.getItem('loginUserId');
    const [groupNameScreen, setGroupNameScreen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleChange = (user) => {
        // Check if user is already in selectedUsers
        const isSelected = selectedUsers.some((u) => u.id === user.id);

        if (isSelected) {
            // If user is already selected, remove them
            setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
        } else {
            // If user is not selected, add them
            setSelectedUsers((prev) => {
                // Check for duplicates based on user.id before adding
                const alreadyExists = prev.some((u) => u.id === user.id);
                if (!alreadyExists) {
                    return [...prev, user];
                }
                return prev; // Return unchanged state if user already exists
            });
        }
    };

    const handleRemoveUser = (user) => {
        // Remove user from selectedUsers
        setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
    };

    const handleNameGroup = () => {
        setGroupNameScreen(!groupNameScreen);
    };

    return (
        <>
            {groupNameScreen ? (
                <GroupName handleNameGroup={handleNameGroup}  selectedUsers={selectedUsers} />
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
                            <Box className="flex justify-center relative pb-3">
                                <Box className="flex items-center">
                                    <ArrowBackIosIcon
                                        className="absolute left-0 w-4 h-4 cursor-pointer"
                                        onClick={handleGroup}
                                    />
                                    <Typography
                                        variant="h6"
                                        className="p-0 font-semibold leading-none text-base text-center"
                                    >
                                        Choose members
                                    </Typography>
                                </Box>
                            </Box>
                            <SearchBar marginClass="mb-2" />
                        </div>

                        {/* Display selected users */}
                        <Box className="selected-users mb-4">
                            {selectedUsers.length > 0 && (
                                <Box className="flex flex-wrap items-center gap-2">
                                    {selectedUsers.map((user) => (
                                        <Box
                                            key={user.id}
                                            className="selected-user flex items-center bg-gray-200 px-2 py-1 rounded-lg"
                                        >
                                            <Avatar
                                                alt={user.firstName}
                                                src={user.image}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    bgcolor: '#dfdfdf',
                                                    color: '#4A4A4A',
                                                    padding: '6px',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                className="ml-1.5 text-xs font-medium"
                                            >
                                                {user.firstName} {user.lastName}
                                            </Typography>
                                            <CloseIcon
                                                className="ml-1 cursor-pointer"
                                                onClick={() => handleRemoveUser(user)}
                                                sx={{ fontSize: '16px' }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        {/* Contact list */}
                        <Box className="mb-4 h-full">
                            <Typography
                                variant="h6"
                                className="text-Newblack text-base font-semibold mb-2"
                            >
                                Contact
                            </Typography>
                            <Box className="flex flex-col justify-between h-full">
                                <div>
                                    {Contacts.length > 0 &&
                                     Contacts.filter((ele) => ele.id !== loginUserId).map((user) => (
                                        <Box
                                            key={user.id}
                                            className="user_select w-full h-12 rounded-xl justify-between flex items-center p-3 hover:bg-sidebar cursor-pointer mb-0.5"
                                            onClick={() => handleChange(user)} // Pass user object to handleChange
                                        >
                                            <Box
                                                variant="text"
                                                className="text-Newblack capitalize text-sm font-medium p-0 flex items-center gap-1"
                                            >
                                                <Avatar
                                                    alt={user.firstName}
                                                    src={user.image}
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        bgcolor: '#dfdfdf',
                                                        color: '#4A4A4A',
                                                    }}
                                                    className="me-2"
                                                />
                                                {user.firstName} {user.lastName}
                                            </Box>
                                            <Checkbox
                                                checked={selectedUsers.some((u) => u.id === user.id)} // Check if user is selected
                                                onChange={() => handleChange(user)} // Update the checkbox handler
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                            />
                                        </Box>
                                    ))}
                                </div>
                                <Box className="mb-2 flex justify-end">
                                    <Button
                                        variant="outlined"
                                        className="bg-primary text-white font-semibold border-none max-w-24 w-full capitalize"
                                        onClick={handleNameGroup}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default GroupMember;
