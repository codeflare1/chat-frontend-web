import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import ProfileView from './ProfileView';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getData } from '../api/apiService';
import { Avatar, Typography } from '@mui/material';

const ProfileModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userdata, setUserData] = useState([]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 375,
    // minHeight: 450,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
  };


  const getUserData = async () => {
    try {
      const response = await getData(`/fetchUser`);
      if (response?.success === true) {
        setUserData(response?.user);
      }
    } catch (error) {
      console.log(error?.response?.message);
      setUserData([]);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();

  }, []);
  return (
    <div>
      <Button onClick={handleOpen} className='min-w-unset p-4 text-newgray'>
        {/* <PersonIcon /> */}
        <Avatar
          alt={`${userdata?.firstName} ${userdata?.lastName}`}
          src={userdata?.image || ''}
          sx={{
            width: 24,
            height: 24,
            bgcolor: '#dfdfdf',
            color: '#4A4A4A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!userdata?.image && (
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              {`${userdata?.firstName?.charAt(0)}${userdata?.lastName?.charAt(0)}`.toUpperCase()}
            </Typography>
          )}
        </Avatar>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="flex">
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              aria-label="close"
            >
              <CloseOutlinedIcon className='justify-end' />
            </IconButton>
            <ProfileView />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ProfileModal