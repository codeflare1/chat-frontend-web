import React from 'react'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import { Box, Typography } from '@mui/material';

const MainCall = () => {
  return (
    <div className='w-full'>
      <Box className='h-screen w-full flex flex-col gap-3 justify-center items-center'>
            <CallOutlinedIcon className='text-gray-500 text-4xl' />
            <Box>
                <Typography variant='body' className='text-gray-500 text-sm' >Click <AddIcCallOutlinedIcon/> to start a new voice or video call</Typography>
            </Box>
      </Box>
    </div>
  )
}

export default MainCall
