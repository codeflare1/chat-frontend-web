import React from 'react';
import { Box, Typography, Switch, Select, MenuItem, Button, FormControl } from '@mui/material';

const ChatSetting = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box className="setting-item">
      <Box className="tab_title border-b !p-4 flex justify-center items-center" >
        <h2 className='font-semibold text-Newblack'>Chats</h2>
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
          {/* language Section */}
          <Box className="">
            <Box className="flex flex-col">
              {/* System Section */}
              <Box className="border-b !p-5">
                <Typography variant="h6" className="font-semibold mb-1 text-sm">
                  Chats
                </Typography>
                {/* Spell check */}
                <Box className="flex justify-between items-center my-4">
                  <Typography>Spell check text entered in message composition box</Typography>
                  <Switch defaultChecked />
                </Box>

                {/* Text formatting popover */}
                <Box className="flex justify-between items-center my-4">
                  <Typography>Show text formatting popover when text is selected</Typography>
                  <Switch defaultChecked />
                </Box>

                {/* Generate link previews */}
                {/* <Box className="flex justify-between items-center my-4">
                  <Typography>Generate link previews</Typography>
                  <Switch disabled />
                </Box> */}

                {/* Convert typed emoticons */}
                {/* <Box className="flex justify-between items-center my-4">
                  <Typography>Convert typed emoticons to emoji</Typography>
                  <Switch defaultChecked />
                </Box> */}

                {/* Sent media quality */}
                <Box className="flex justify-between items-center my-4">
                  <Typography>Sent media quality</Typography>
                  <FormControl sx={{ minWidth: 140 }}  >
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      className='h-12 text-left capitalize'
                    >
                      <MenuItem value="">Standard</MenuItem>
                      <MenuItem value={20}>High</MenuItem>
                      <MenuItem value={30}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

              </Box>

                {/* Import contacts */}
                <Box className="!p-5">
                  <Box className="flex items-center gap-82">
                    <Box>
                      <Typography className="mb-0">Import contacts</Typography>
                      <Typography className="text-xs text-gray-500 mb-2">
                        Import all Gatsbychat groups and contacts from your mobile device. Last import at 10/3/2024 6:58:05 PM
                      </Typography>
                    </Box>
                    <Button variant="outlined" className='max-w-135 w-full'>Import now</Button>
                  </Box>
                </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default ChatSetting;
