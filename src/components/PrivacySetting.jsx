
import React from 'react';
import { Box, FormControl } from '@mui/material';
import { Checkbox, FormControlLabel, Button, Select, MenuItem, FormGroup, Typography } from '@mui/material';


const PrivacySetting = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box className="setting-item">
      <Box className="tab_title border-b !p-4 flex justify-center items-center" >
        <h2 className='font-semibold text-Newblack'>Privacy</h2>
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
          {/* privacy Section */}
          <Box className="h-500 overflow-y-scroll">
            <Box className="flex flex-col">

              {/* Phone Number Section */}
              <Box className='flex !p-5 gap-82 items-center border-b' >
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Phone Number
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Choose who can see your phone number and who can contact you on Gatsbychat with it.
                  </Typography>

                </Box>
                <Button variant="outlined" className='bg-gray-300 text-newgray font-semibold border-none max-w-24 w-full capitalize'>Change...</Button>
              </Box>

              {/* Blocked Contacts Section */}
              <Box className='flex items-center justify-between border-b !p-5'>
                <Typography variant="subtitle1" fontWeight="medium">
                  Blocked
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  0 contacts
                </Typography>
              </Box>

              {/* Messaging Section */}
              <Box className="border-b !p-5">
                <Typography variant="subtitle1" fontWeight="bold">
                  Messaging
                </Typography>
                <FormGroup>
                  {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Read receipts" /> */}
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Typing indicators" />
                </FormGroup>
                {/* <Typography variant="body2" color="textSecondary">
                  To change these settings, open the Gatsbychat app on your mobile device and navigate to Settings &gt; Privacy.
                </Typography> */}
              </Box>

              {/* Disappearing Messages Section */}
              <Box className="flex justify-between items-center !p-5 gap-82 border-b">
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Disappearing messages</Typography>
                  <Typography variant="subtitle1" fontWeight="medium">Default timer for new chat</Typography>
                  <Typography className='text-xs' variant="body2" color="textSecondary">Set a default disappearing message timer for all new chats started by you.</Typography>
                </Box>
                <FormControl sx={{ minWidth: 140 }}  >
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className='h-12 text-left capitalize'
                  >
                    <MenuItem value="">Off</MenuItem>
                    <MenuItem value={10}>4 weeks</MenuItem>
                    <MenuItem value={20}>1 week</MenuItem>
                    <MenuItem value={30}>1 day</MenuItem>
                    <MenuItem value={40}>8 hours</MenuItem>
                    <MenuItem value={50}>1 hour</MenuItem>
                    <MenuItem value={60}>5 minutes</MenuItem>
                    <MenuItem value={70}>30 seconds</MenuItem>
                    <MenuItem value={80}>Always</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Phone Number Section */}
              <Box className='flex !p-5 gap-82 items-center' >
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Delete application data
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className='text-xs'>
                    This will be delete all data in the application, removing all messages and saved account informations.
                  </Typography>

                </Box>
                <Button variant="outlined" className='bg-gray-300 text-red-500 font-semibold border-none max-w-fit w-full capitalize'>Delete data</Button>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default PrivacySetting;

