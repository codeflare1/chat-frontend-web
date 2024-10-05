import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import { Typography } from '@mui/material';
import LanguagePicker from './LanguagePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
const LanguagePopup = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 375,
        height: 450,
        overflowY: 'scroll',
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

            <Box className='flex flex-col gap-2'>
                <Box>
                    <Button onClick={handleOpen} variant="text" className='w-full h-12 hover:bg-sidebar justify-between items-center ps-14d px-3.5 rounded-none' >
                        <Typography variant="h6" className="text-Newblack capitalize text-base flex items-center gap-3">
                            <LanguageIcon className=' text-gray-500 w-6 h-6' />  Language
                        </Typography>
                        <Typography variant="h6" className="text-gray-400 capitalize text-base">
                            System language
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    <Box className='flex w-full h-12 hover:bg-transparent justify-between items-center !ps-14d !px-3.5 rounded-none' >
                        <Typography variant="h6" className="text-Newblack capitalize text-base flex items-center gap-3">
                        <PaletteOutlinedIcon className=' text-gray-500 w-6 h-6' />  Theme
                        </Typography>
                        
                        <FormControl sx={{ minWidth: 140 }}  >
                            <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            className='h-12 text-left capitalize'
                            >
                            <MenuItem value="">System</MenuItem>
                            <MenuItem value={20}>Light</MenuItem>
                            <MenuItem value={30}>Dark</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            {/* Modal */}
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
                        <LanguagePicker />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default LanguagePopup
