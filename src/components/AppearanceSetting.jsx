import React from 'react'
import { Box } from '@mui/material';
import LanguagePopup from './LanguagePopup';

const AppearanceSetting = () => {
  return (
    <div>
    <Box className="setting-item">
      <Box className="tab_title border-b !p-4 flex justify-center items-center" >
        <h2 className='font-semibold text-Newblack'>General</h2>
      </Box>
      
      <Box className="personal_detail">
        <Box
          className="rounded-lg bg-white"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // gap: '20px',
          }}
        >
          {/* General Section */}
          <Box className=" !py-5">
            <Box className="flex flex-col gap-3">
               <LanguagePopup />
            </Box>
          </Box>
        
        </Box>
      </Box>
    </Box>
  </div>
  )
}

export default AppearanceSetting
