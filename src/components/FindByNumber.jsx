import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, IconButton, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Modal styles
const modalStyle = {
    position: 'absolute',
    padding: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 375,
    height: 500,
    overflowY: 'auto',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
};

const FindByNumber = ({ handleBack }) => {
    const [countryCode, setCountryCode] = useState('');
    const [countryName, setCountryName] = useState(''); // New state to hold country name
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [countryCodes, setCountryCodes] = useState([]);

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();

                console.log(data, 'cpooooo' ); 

                const codes = data
                    .map(country => ({
                        code: country.cca2,
                        name: country.name.common,
                        dialCode: country.idd.root + (country.idd.suffixes && country.idd.suffixes.length > 0 ? country.idd.suffixes[0] : '')
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCountryCodes(codes);
            } catch (error) {
                console.error("Error fetching country codes:", error);
            }
        };

        fetchCountryCodes();
    }, []);


    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            const result = phoneNumber === '1234567890' ? { id: 1, number: phoneNumber } : null;

            if (result) {
                setSearchResults([result]);
                setModalMessage('');
            } else {
                setModalMessage(`${countryCode} ${phoneNumber} is not a registered number.`);
            }

            setOpenModal(true);
            setLoading(false);
        }, 3000);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setPhoneNumber('');
        setSearchResults([]);
        setModalMessage('');
    };

    const handleOpenCountryCodeModal = () => {
        setOpenModal(true);
    };

    const handleCountryCodeSelect = (dialCode, name) => {
        setCountryCode(dialCode);
        setCountryName(name);
        setOpenModal(false);
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
                                Find by Number
                            </Typography>
                        </Box>
                    </Box>

                    <div className='w-full mb-2 flex flex-col gap-4 '>
                        <Box className='form-control w-100 py-1 cursor-pointer px-2 text-sm w-full rounded-lg border border-gray-300 border-solid focus:border-primary focus:outline-none bg-white' onClick={handleOpenCountryCodeModal} >
                            {countryName ? (
                                <Box className='flex justify-between items-center'>
                                    <span>{countryName}</span>
                                    <span> {countryCode}  <KeyboardArrowDownIcon /> </span>
                                </Box>
                            ) : (
                                <Box className='font-semibold'>Select Country Code</Box>
                            )}
                        </Box>

                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className='form-control w-100 py-1 px-2 text-sm w-full rounded-lg border border-gray-300 border-solid focus:border-primary focus:outline-none'
                        />
                    </div>
                    <Typography variant='body2' className='text-xs text-gray-400 tracking-wide'>
                        Enter a phone number after selecting the country code.
                    </Typography>
                </div>

                <Box className="mb-2 flex justify-end">
                    <Button
                        variant="outlined"
                        onClick={handleSearch}
                        disabled={phoneNumber.trim() === '' || loading || countryCode === ''}
                        className={`transition-opacity duration-300 ${loading ? 'opacity-50' : ''} disabled:bg-gray-300 disabled:text-Newblack disabled:cursor-not-allowed bg-primary text-white font-semibold border-none max-w-24 w-full capitalize`}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                    </Button>
                </Box>

                {/* Display search results */}
                {searchResults.length > 0 && (
                    <Box>
                        <Typography variant="body1" className='text-Newblack'>
                            User Found: {searchResults[0].number}
                        </Typography>
                    </Box>
                )}

                {/* Modal for selecting country code */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                            Select Country Code
                        </Typography>

                        <List>
                            {countryCodes
                                .filter(country => country && country.name && country.dialCode) // Ensure the country is defined and has valid name and dialCode
                                .map((country, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={() => handleCountryCodeSelect(country.dialCode, country.name)}
                                        className='flex justify-between rounded-lg'
                                    >
                                        <ListItemText>
                                            {`${country.name}`}
                                        </ListItemText>
                                        <ListItemText className='flex justify-end text-gray-400'>
                                            {`${country.dialCode}`}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                        </List>

                        <IconButton onClick={handleCloseModal} className='absolute top-1 right-2'>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default FindByNumber;
