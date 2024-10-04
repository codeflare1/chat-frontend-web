import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CallHistroyPopup from './CallHistroyPopup';
import FilterListIcon from '@mui/icons-material/FilterList';
import CallCard from './CallCard';
import { LayoutContext } from '../context/LayotContextToggleProvider';

const CallList = () => {

    
  const {isSidebarOpen, toggleSidebar } = useContext(LayoutContext)
    const CallList = [
        {
          name: 'John Doe',
          // userImage: '../assets/img/user-2.png', 
          status:'Incoming',
          type:'video',
          lastMessage: 'Hey, how are you?',
          time: '21m',
          isDelivered: true,
        },
        {
          name: 'Sandy Singh',
          status:'Outgoing',
          type:'voice',
          // userImage: '../assets/img/user-2.png', 
          lastMessage: 'Let’s catch up tomorrow!',
          time: '8:16 pm',
          isDelivered: false,
        },
        {
          name: 'Alice Johnson',
          // userImage: '../assets/img/user-2.png', 
          status:'Incoming',
          type:'video',
          lastMessage: 'Can you send me the file?',
          time: '50m',
          isDelivered: true,
        },
        {
          name: 'Kinner Mandela',
          status:'Incoming',
          type:'voice',
          // userImage: '../assets/img/user-2.png',
          lastMessage: 'Can you send me the file?',
          time: '10m',
          isDelivered: false,
        },
        {
          name: 'Michael Smith',
          // userImage: '../assets/img/user-3.png',
          status:'Incoming',
          type:'voice',
          lastMessage: 'I need the report ASAP.',
          time: '9:23 am',
          isDelivered: true,
        },
        
      ];
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

    return (
        <Box
            sx={{
                width: '350px',
                bgcolor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                padding: '0 12px',
                borderRight: '1px solid #b5b5b5',
                overflowY: 'scroll'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    bgcolor: '#f0f0f0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                <div className="flex flex-col sticky bg-bgChat top-0 z-50">
                    <Box className="flex justify-between pt-3 pb-2">
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
                                <AddIcCallIcon />
                            </Button>
                            <Button className="!rounded-md text-newgray">
                                <CallHistroyPopup />
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Box className='flex gap-4 items-center justify-between mb-2'>
                        <Search className="bg-search mx-0 h-8 rounded-lg w-full">
                            <SearchIconWrapper>
                                <SearchIcon className="h-4 w-4" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                className="w-full"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Button className="!border-none text-newgray !rounded-full !min-w-5 h-9 pe-3.5">
                            <FilterListIcon />
                        </Button>
                    </Box>
                </div>

                 {/* ChatCard */}
                    {CallList.length > 0 ? (
                    <div className="chat_list flex flex-col gap-1">
                        {CallList.map((calls, index) => (
                        <CallCard key={index} calls={calls} />
                        ))}
                    </div>
                    ) : (
                    <div className="chat_main flex flex-col items-center justify-center h-screen ">
                        <div className="chat_new">
                        <h4 className="text-center text-base text-newgray font-semibold">No Chats</h4>
                        <p className="text-center text-sm text-newgray font-normal">Recent Chats will appear here</p>
                        </div>
                    </div>
                    )}
            </Box>
        </Box>
    );
};

export default CallList;
