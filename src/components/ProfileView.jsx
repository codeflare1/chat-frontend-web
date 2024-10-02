import React from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';


const ProfileView = () => {
  return (
    <div className='p-5 w-full'>
      <div className="profile_header mb-3">
        <h2>Profile</h2>
      </div>
      <div className="profile_img">
        <div className="img flex flex-col items-center justify-center w-full gap-4 mb-5 font-medium -tracking-wide">
          <div className="first_last_name p-8 rounded-full bg-gray-200 max-w-20 h-20 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
            JS
          </div>
          <Button variant='contained' className='font-semibold text-xs tracking-tight  capitalize bg-[#DDD] text-Newblack rounded-full leading-4 hover:bg-gray-400 shadow-none hover:shadow-none'>Edit photo</Button>
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
                // backgroundColor:'#f4f4f4',
                color:'#1E1E1E'
              },
            },
          }}
        />
        <div className="about_btn mb-3">
          <Button variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<CreateOutlinedIcon className='me-2 text-gray-500' />}>
            About
          </Button>
        </div>
        <div className="stat-content pb-4 border-b mb-3">
          <p className='text-sm text-newgray'>Your profile and changes to it will be visible to people you message, contacts and groups.</p>
        </div>
        <div className="user_name mb-3">
          <Button variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<AlternateEmailOutlinedIcon className='me-2 text-gray-500' />}>
            Username
          </Button>
        </div>
        <div className="stat-content pb-4 border-b mb-3">
          <p className='text-sm text-newgray'>People can now message you using your optional username so you don’t have to give out your phone number.</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileView
