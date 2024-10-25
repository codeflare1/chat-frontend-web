import React, { useState } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const ProfileView = () => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Function to handle avatar edit
  const handleEditAvatar = () => {
    setIsEditingAvatar(true); // Show the avatar selection
  };

  // Function to handle going back to profile view
  const handleCancelAvatarEdit = () => {
    setIsEditingAvatar(false); // Go back to the profile content
  };

  return (
    <div className='p-5 w-full'>
      {!isEditingAvatar ? (
        // Profile Content
        <>
          <div className="profile_header mb-3">
            <h2>Profile</h2>
          </div>
          <div className="profile_img">
            <div className="img flex flex-col items-center justify-center w-full gap-4 mb-5 font-medium -tracking-wide">
              <Avatar className="first_last_name p-8 rounded-full bg-gray-200 max-w-20 h-20 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
                JS
              </Avatar>
              <Button 
                variant='contained' 
                className='font-semibold text-xs tracking-tight  capitalize bg-[#DDD] text-Newblack rounded-full leading-4 hover:bg-gray-400 shadow-none hover:shadow-none'
                onClick={handleEditAvatar}
              >
                Edit photo
              </Button>
            </div>
          </div>

          <div className="name_field">
            <TextField
              className="w-full mb-1 hover:bg-sidebar rounded-md p-0"
              variant="outlined"
              placeholder="Enter your name"
              value={'John Smith'}
              InputProps={{
                sx: {
                  '& input': {
                    padding: '6px 0', 
                    height:'36px',
                    fontSize:'12px'
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Person2OutlinedIcon className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                    color:'#1E1E1E'
                  },
                },
              }}
            />
            <div className="about_btn mb-3">
              <Button variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<CreateOutlinedIcon className=' text-gray-500 w-6 h-6' />}>
                About
              </Button>
            </div>
            <div className="stat-content pb-4 border-b mb-3">
              <p className='text-sm text-newgray'>Your profile and changes to it will be visible to people you message, contacts and groups.</p>
            </div>
            <div className="user_name mb-3">
              <Button variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<AlternateEmailOutlinedIcon className='text-gray-500 w-6 h-6' />}>
                Username
              </Button>
            </div>
            <div className="stat-content pb-4">
              <p className='text-sm text-newgray'>People can now message you using your optional username so you don’t have to give out your phone number.</p>
            </div>
          </div>
        </>
      ) : (
        // Avatar Selection Content
        <>
        <Box>
            <div className="profile_header">
            <h2>Your avatar</h2>
            </div>
            <Box className='flex flex-col gap-4 items-center py-5 border-b border-gray-300'>
                <Avatar className="first_last_name p-8 rounded-full bg-gray-200 max-w-20 h-20 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
                  JS
                </Avatar>
                <Button 
                variant='contained' 
                className='font-semibold text-xxs tracking-tight  capitalize bg-[#DDD] text-Newblack rounded-md leading-4 hover:bg-gray-400 shadow-none hover:shadow-none flex gap-1'
                onClick={handleEditAvatar}
                >
                  <InsertPhotoOutlinedIcon className='w-5 h-5'/>
                  photo
                </Button>
            </Box>
        </Box>
        <Box className='pt-5'>
            <div className="avatar_selection_header mb-3">
              <h2>Select an Avatar</h2>
            </div>
            <div className="avatar_selection grid grid-cols-4 gap-4 mb-5 items py-2">
              {/* Placeholder avatar images/icons */}
              <Avatar alt="Avatar 1" className="cursor-pointer" src="../assets/img/avatar-1.png" />
              <Avatar alt="Avatar 2" className="cursor-pointer" src="../assets/img/avatar-2.png" />
              <Avatar alt="Avatar 3" className="cursor-pointer" src="../assets/img/avatar-3.png" />
              <Avatar alt="Avatar 4" className="cursor-pointer" src="../assets/img/avatar-4.png" />
              <Avatar alt="Avatar 5" className="cursor-pointer" src="../assets/img/avatar-5.png" />
              <Avatar alt="Avatar 6" className="cursor-pointer" src="../assets/img/avatar-6.png" />
              <Avatar alt="Avatar 7" className="cursor-pointer" src="../assets/img/avatar-7.png" />
              <Avatar alt="Avatar 8" className="cursor-pointer" src="../assets/img/avatar-8.png" />
              <Avatar alt="Avatar 9" className="cursor-pointer" src="../assets/img/avatar-9.png" />
            </div>
            <div className="avatar_actions flex justify-end gap-3">
              <Button 
                variant="outlined" 
                onClick={handleCancelAvatarEdit}
                className='font-semibold text-xs tracking-tight capitalize'
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleCancelAvatarEdit} 
                className='font-semibold text-xs tracking-tight capitalize bg-[#DDD] text-Newblack'
              >
                Save
              </Button>
            </div>
        </Box>
        </>
      )}
    </div>
  );
};

export default ProfileView;
