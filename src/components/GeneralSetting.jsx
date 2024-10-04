import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React from 'react'

const GeneralSetting = () => {
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
            <Box className="border-b !p-5">
              <Box className="flex flex-col gap-3">
                <Box className="flex justify-between ">
                  <Typography variant="body1" className="text-gray-700">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" className='text-gray-400'>+91 76568 45563</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography variant="body1" className="text-gray-700">
                    Email
                  </Typography>
                  <Typography variant="body1" className='text-gray-400'>junuju@yopmail.com</Typography>
                </Box>
              </Box>
            </Box>

            {/* System Section */}
            <Box className="border-b !p-5">
              <Typography variant="h6" className="font-semibold mb-1 text-sm">
                 System
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Open at computer login"
                className="text-sm text-gray-700"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Hide menu bar"
                className="text-sm text-gray-700"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Minimize to system tray"
                className="text-sm text-gray-700"
              />
            </Box>

            {/* Permissions Section */}
            <Box className="border-b !p-5">
            <Typography variant="h6" className="font-semibold mb-1 text-sm">
                 Permissions
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Allow access to the microphone"
                className="text-sm text-gray-700"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Allow access to the camera"
                className="text-sm text-gray-700"
              />
            </Box>

            {/* Updates Section */}
            <Box className="!p-5">
            <Typography variant="h6" className="font-semibold mb-1 text-sm">
                 Updates
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Automatically download updates"
                className="text-sm text-gray-700"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default GeneralSetting
