import React from 'react';
import { Box, Typography, } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArchivePopup from './ArchivePopup'

const ChatList = ({ isSidebarOpen, toggleSidebar }) => {
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
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <div className="flex flex-col border-b">
          <Box className="flex  justify-between p-3 pb-2">
            <Box className="flex items-center">
              {!isSidebarOpen && (
                <MenuOpenIcon
                  onClick={toggleSidebar}
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                />
              )}
              <Typography variant="h6" className="p-0 font-semibold leading-none">
                Chats
              </Typography>
            </Box>
            <ButtonGroup
              disableElevation
              variant="text"
            >
              <Button className='!border-none text-newgray !rounded-md'>
                <PersonAddAltIcon/>
              </Button>
              <Button className="!rounded-md text-newgray">
                <ArchivePopup />
              </Button>
             
            </ButtonGroup>
          </Box>
          <Search className="bg-gray-200 mx-4 mb-2 h-7">
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
      </Box>
    </Box>
  );
};

export default ChatList;
