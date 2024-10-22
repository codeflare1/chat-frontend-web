import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Avatar, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const ChatNameModal = ({ selectedUser }) => {
    console.log(selectedUser, 'this is chatname');
    
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
            <Typography onClick={handleOpen} className=' p-4 text-Newblack cursor-pointer font-medium text-2xl flex gap-2 items-center'>
            {selectedUser?.user?.firstName} {selectedUser?.user?.lastName || ''}
            <ArrowForwardIosIcon className='text-sm font-bold' />
            </Typography>
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
                    <Box sx={style} className="flex flex-col gap-6 p-6">
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            aria-label="close"
                        ><CloseOutlinedIcon className='justify-end' />
                        </IconButton>
                        <Box className='flex justify-center w-full'>
                            <Avatar src={selectedUser?.user?.image} className="first_last_name rounded-full bg-gray-200 max-w-24 h-24 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
                            {(!selectedUser?.user?.image) && `${selectedUser?.user?.firstName?.charAt(0)}${selectedUser?.user?.lastName?.charAt(0)}`}
                            </Avatar>
                        </Box>
                        <Box className='flex flex-col gap-6'>
                            <Typography variant='h5' className='font-semibold'>About</Typography>
                            <Box className='flex flex-col gap-4'>
                                <Box className='flex gap-2'>
                                    <PersonOutlineOutlinedIcon className='text-newgray text-lg' />
                                    <Typography className='name text-sm' variant='body'>{selectedUser?.user?.firstName} {selectedUser?.user?.lastName || ''}</Typography>
                                </Box>
                                <Box className='flex gap-2'>
                                    <AccountCircleOutlinedIcon className='text-newgray text-lg' />
                                    <Typography className='name text-sm' variant='body'>{selectedUser?.user?.firstName} {selectedUser?.user?.lastName || ''} is in your system contacts</Typography>
                                </Box>
                                <Box className='flex gap-2'>
                                    <CallOutlinedIcon className='text-newgray text-lg' />
                                    <Typography className='name text-sm' variant='body'>
                                       {selectedUser?.user?.phoneNumber} 
                                    </Typography>
                                </Box>
                                <Box className='flex gap-2'>
                                    <GroupOutlinedIcon className='text-newgray text-lg' />
                                    <Typography className='name text-sm' variant='body'>No common group</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ChatNameModal