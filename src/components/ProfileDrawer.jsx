import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, Button, Divider, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChatAboutPopup from './ChatAboutPopup';

const ProfileDrawer = () => {
  const [state, setState] = React.useState({
    right: false, // Change drawer position to left
  });

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ right: open });
  };

  const list = () => (
    <Box
      sx={{ width: 982, padding: '20px 100px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className='absolute left-5 top-3'>
        <ArrowBackIosIcon className='text-Newblack text-xl cursor-pointer' />
      </div>
      <Box className="user_profile flex flex-col justify-center items-center gap-2 mb-4">
        <Avatar alt='' src='' sx={{ width: 80, height: 80, bgcolor: '#dfdfdf', color: '#4A4A4A', marginRight: '8px', fontSize: '36px', fontWeight: 600 }} >J</Avatar>
        <Typography variant='h5' className='font-semibold'>John Doe <AccountCircleOutlined className='w-5 h-5 font-medium' /></Typography>
      </Box>

      <Box className='flex justify-center items-center gap-6 mb-4'>
        <Button className='flex flex-col gap-1 capitalize text-Newblack bg-profile max-w-16 w-full text-xs rounded-lg p-2 items-center justify-center'><VideocamOutlinedIcon className='w-5 h-5' /> Video</Button>
        <Button className='flex flex-col gap-1 capitalize text-Newblack bg-profile max-w-16 w-full text-xs rounded-lg p-2 items-center justify-center'><CallOutlinedIcon className='w-5 h-5' /> Audio</Button>
        <Button className='flex flex-col gap-1 capitalize text-Newblack bg-profile max-w-16 w-full text-xs rounded-lg p-2 items-center justify-center'><NotificationsNoneOutlinedIcon className='w-5 h-5' /> Mute</Button>
        <Button className='flex flex-col gap-1 capitalize text-Newblack bg-profile max-w-16 w-full text-xs rounded-lg p-2 items-center justify-center' > <SearchOutlinedIcon className='w-5 h-5' /> Search</Button>
      </Box>

      <Divider />

      <Box className='chat_setting'>
        <Box className='disappearing_container flex flex-col gap-4'>
          <Box className='disappearing flex gap-6 px-8'>
            <div className='flex items-center gap-4'>
              <TimerOffOutlinedIcon className='text-gray-500 w-6 h-6' />
              <div className='dissapear_msg'>
                <Typography variant='h6' className='text-sm text-Newblack font-medium mb-1'>Disappearing Messages</Typography>
                <Typography variant='body2' className='text-gray-500 text-xs'>When this feature is enabled, messages sent and received in this one-on-one chat will automatically disappear after they have been viewed by the recipient.</Typography>
              </div>
            </div>
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
              </Select>
            </FormControl>
          </Box>
          <Box className='flex justify-between items-center w-full h-12 hover:bg-sidebar text-Newblack capitalize text-xs rounded-md px-8 cursor-pointer'>
            <div variant="text" className='hover:bg-none flex gap-6 items-center text-sm text-Newblack'>
              <CreateOutlinedIcon className=' text-gray-500 w-6 h-6' />
              <ChatAboutPopup />
            </div>
            <KeyboardArrowDownOutlinedIcon />
          </Box>
          <Box className='flex justify-between items-center w-full h-12 hover:bg-sidebar text-Newblack capitalize text-xs rounded-md px-8 cursor-pointer'>
            <div variant="text" className='hover:bg-none flex gap-6 items-center text-sm text-Newblack'>
              <ColorLensOutlinedIcon className=' text-gray-500 w-6 h-6' />
              Chat color
            </div>
            <div className="chat_color w-5 h-5 rounded-full bg-primary"></div>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box className='common_group'>
        <Typography variant='h6' className='font-semibold px-6 text-sm mb-3'>No common group</Typography>
        <Box className='flex justify-between items-center w-full h-12 hover:bg-sidebar text-Newblack capitalize text-xs rounded-md px-8 cursor-pointer'>
          <div variant="text" className='hover:bg-none flex gap-6 items-center text-sm text-Newblack'>
            <AddOutlinedIcon className='bg-profile rounded-full text-Newblack p-1 w-6 h-6' />
            Add to a group
          </div>
        </Box>
      </Box>

      <Divider />

      <Box className='block_user'>
        <Box className='flex justify-between items-center w-full h-12 hover:bg-sidebar text-Newblack capitalize text-xs rounded-md px-8 cursor-pointer'>
          <div variant="text" className='hover:bg-none flex gap-6 items-center text-sm text-red-500'>
            <BlockOutlinedIcon className='text-red-500 p-1 w-6 h-6' />
            Block
          </div>
        </Box>
      </Box>

    </Box>
  );

  return (
    <div>
      <Typography onClick={toggleDrawer(true)}>John Doe</Typography>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default ProfileDrawer;
