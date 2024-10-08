import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const GroupInvitation = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 375,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    padding: '16px',
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className='min-w-unset p-4 text-newgray'>
        Open Modal
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
          <Box sx={style} className="relative">
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              aria-label="close"
            >
              <CloseOutlinedIcon />
            </IconButton>

            {/* Modal Content */}
            <Typography id="transition-modal-title" variant="h6" component="h2" className="font-semibold text-center mb-6">
              Invitation sent
            </Typography>

            {/* <Divider className="my-2" /> */}

            <Box className="modal-body">
              <Typography className="text-sm mb-2">
                - New can’t be automatically added to this group by you.
              </Typography>
              <Typography className="text-sm mb-4">
                - They’ve been invited to join and won’t see any group messages until they accept.
              </Typography>
            </Box>

            <Box className="modal-footer flex justify-end space-x-2 mt-4">
              <Button variant="outlined" onClick={handleClose}>
                Learn more
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Okay
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default GroupInvitation;
