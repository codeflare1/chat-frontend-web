import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import ProfileView from './ProfileView';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ProfileModal = () => {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} className='min-w-unset p-4 text-newgray'>
        <PersonIcon />
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
            <ProfileView/>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ProfileModal