
import React from 'react';
import { Checkbox, FormControlLabel, Select, MenuItem, FormGroup, InputLabel, FormControl, Box, Typography, FormHelperText, FormLabel } from '@mui/material';

const CallSetting = () => {
  return (
    <div>
      <Box className="setting-item">
        <Box className="tab_title border-b !p-4 flex justify-center items-center" >
          <h2 className='font-semibold text-Newblack'>Calls</h2>
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
            {/* call Section */}
            <Box className="">
              <Box className="flex flex-col h-500 overflow-y-scroll">
                {/* Calling Section */}
                <Box className="border-b !p-5">
                  <Typography variant="h6" className="font-semibold mb-1 text-sm">
                    Calling
                  </Typography>
                  <FormGroup>
                     <FormControlLabel
                      control={<Checkbox defaultChecked color="primary" />}
                      label="Enable incoming calls"
                      className="text-sm text-gray-700"
                    />
                     <FormControlLabel
                      control={<Checkbox defaultChecked color="primary" />}
                      label="Play calling sounds"
                      className="text-sm text-gray-700"
                    />
                  </FormGroup>
                </Box>

                {/* Device section */}
                <Box className="!p-5 border-b">
                  <Typography variant="h6" className="font-semibold mb-1 text-sm">
                    Device
                  </Typography>

                  <FormControl fullWidth margin="none" className='mb-2'>
                    <Typography className='my-1.5 text-sm'>Video</Typography>
                    <Select defaultValue="HP HD Camera">
                      <MenuItem value="HP HD Camera">HP HD Camera (04f2:b6c0)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="none" className='mb-2'>
                    <Typography className='my-1.5 text-sm'>Microphone</Typography>
                    <Select defaultValue="Microphone Array">
                      <MenuItem value="Microphone Array">Communication - Microphone Array (Intel® Smart Sound)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="none" className='mb-2'>
                    <Typography className='my-1.5 text-sm'>Speakers</Typography>
                    <Select defaultValue="Speakers">
                      <MenuItem value="Speakers">Communication - Speakers (Realtek(R) Audio)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Advanced section */}
                <Box className="!p-5">
                  <Typography variant="h6" className="font-semibold mb-1 text-sm">
                    Advanced
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked color="primary" />}
                      label="Allow access to the microphone"
                      className="text-sm text-gray-700"
                    />
                    <FormHelperText className='m-0 ps-8'>Relay all calls through the Gatsbychat server to avoid revealing your IP address to your contact. Enabling will reduce call quality.</FormHelperText>
                  </FormGroup>

                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CallSetting;

