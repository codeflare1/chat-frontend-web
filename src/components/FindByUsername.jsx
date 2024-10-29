import React, { useState } from 'react';
import { Box, Button, Typography, Modal, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';

// Modal styles
const modalStyle = {
    position: 'absolute',
    padding: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 375,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
};

const FindByUsername = ({ handleBack }) => {
    const [username, setUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loader state

    // Sample data for demonstration
    const users = [
        { id: 1, username: 'john.doe123' },
        { id: 2, username: 'jane.smith456' },
        { id: 3, username: 'alice.jones789' },
    ];

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true); // Start loader
        setTimeout(() => {
            // Check if the user exists
            const result = users.find(user => user.username.toLowerCase() == username.toLowerCase());
        
            if (result) {
                // User found
                setSearchResults([result]);
                setModalMessage('');
            } else {
                setModalMessage(`${username} is not a user. Make sure you have entered the complete username.`);
            }
        
            setOpenModal(true);
            setLoading(false); // Stop loader
        }, 3000); // 3-second delay
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setUsername(''); // Clear input after closing modal
        setSearchResults([]); // Clear search results
    };

    return (
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
                    justifyContent: 'space-between',
                    height: '100vh',
                    padding: '12px'
                }}
            >
                <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                    <Box className="flex justify-center relative pb-3">
                        <Box className="flex items-center">
                            <ArrowBackIosIcon
                                onClick={handleBack}
                                className='absolute left-0 w-4 h-4 cursor-pointer'
                            />
                            <Typography
                                variant="h6"
                                className="p-0 font-semibold leading-none text-base text-center"
                            >
                                Find by username
                            </Typography>
                        </Box>
                    </Box>

                    <div className='w-full mb-2'>
                        <input
                            type="search"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            fullWidth
                            className='form-control w-100 py-1 px-2 text-sm w-full rounded-lg border border-gray-300 border-solid focus:border-primary focus:outline-none'
                        />
                    </div>
                    <Typography variant='body2' className='text-xs text-gray-400 tracking-wide'>
                        Enter a username followed by a dot and its set of numbers.
                    </Typography>
                </div>

                <Box className="mb-2 flex justify-end">
                    <Button
                        variant="outlined"
                        onClick={handleSearch}
                        disabled={username.trim() === '' || loading}
                        className={`transition-opacity duration-300 ${loading ? 'opacity-50' : ''} disabled:bg-gray-300 disabled:text-Newblack disabled:cursor-not-allowed bg-primary text-white font-semibold border-none max-w-24 w-full capitalize`}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                    </Button>
                </Box>

                {/* Display search results */}
                {searchResults.length > 0 && (
                    <Box>
                        <Typography variant="body1" className='text-Newblack'>
                            User Found: {searchResults[0].username}
                        </Typography>
                    </Box>
                )}

                {/* Modal for displaying messages */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={modalStyle} className='relative'>
                        <Typography id="modal-title" variant="h6" component="h2" className={` ${ modalMessage ? 'text-red-500' : 'text-newblack' } text-center font-semibold`}>
                            {modalMessage ? 'Error' : 'User Found'}
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {modalMessage || `Username: ${searchResults[0]?.username}`}
                        </Typography>
                        <IconButton onClick={handleCloseModal} className='absolute top-1 right-2'>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default FindByUsername;
