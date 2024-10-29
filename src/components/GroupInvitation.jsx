import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Typography from '@mui/material/Typography';
import { io } from "socket.io-client";

// const socket = io("https://api.gatsbychat.com"); // Replace with your socket server URL
const socket = io("https://api.gatsbychat.com"); // Replace with your socket server URL

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

const GroupInvitation = ({isButtonDisabled ,imgfile, selectedUsers ,groupName}) => {
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
  const loginUserId = localStorage.getItem("loginUserId");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



const handleSubmit =(imgfile, selectedUsers, groupName)=>{
  let merbers = selectedUsers.map(item => item.id)
    merbers.push(loginUserId)
    const Data = {
      adminId: loginUserId,
      memberIds:merbers,
      groupName: groupName,
      image:imgfile
    }
    socket.emit("createGroup", Data)

     // Redirect to the chat page
  window.location.href = 'https://gatsbychat.com/chat';
}

  return (
    <div>
      <Button onClick={handleOpen}  disabled={isButtonDisabled} className='create_group disabled:bg-gray-300 disabled:text-Newblack disabled:cursor-not-allowed bg-primary text-white font-semibold border-none max-w-24 w-full capitalize'>
        Next
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
          <Box sx={style} className="relative p-6">
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


            <Box className="modal-body mb-10">
              <Typography className="text-base mb-5 relative flex gap-2 before:bg-primary before:w-full before:max-w-1 before:h-10 before:inline-block text-Newblack">
                New can't be automatically added to this group by you.
              </Typography>
              <Typography className="text-base relative flex gap-2 before:bg-primary before:w-full before:max-w-1 before:h-10 before:inline-block text-Newblack">
                They've been invited to join and won't see any group messages until they accept.
              </Typography>
            </Box>

            <Box className="modal-footer mt-4">
              <Button variant="contained" color="primary" className='w-full' onClick={()=>handleSubmit(imgfile, selectedUsers, groupName)}>
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
