import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


const LanguagePicker = () => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(0.5, 0.5, 0.5, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    return (
        <div className='w-full'>
            <Box className="sticky top-0 bg-white z-50 pt-4 pb-1.5 border-b px-4">
                <div className="profile_header mb-3">
                    <h2 className=''>Language</h2>
                </div>
                <Search className="bg-search mx-0 h-8 rounded-lg">
                    <SearchIconWrapper>
                        <SearchIcon className="h-4 w-4" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        className="w-full"
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <Box className='px-4'>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-labelledby="language-radio-buttons-group-label"
                        defaultValue="English"
                        name="language-radio-buttons-group"
                    >
                        {/* Example of some languages */}
                        <FormControlLabel value="English" control={<Radio />} label="English" />
                        <FormControlLabel value="Spanish" control={<Radio />} label="Spanish" />
                        <FormControlLabel value="French" control={<Radio />} label="French" />
                        <FormControlLabel value="German" control={<Radio />} label="German" />
                        <FormControlLabel value="Chinese" control={<Radio />} label="Chinese" />
                        <FormControlLabel value="Japanese" control={<Radio />} label="Japanese" />
                        <FormControlLabel value="Hindi" control={<Radio />} label="Hindi" />
                        <FormControlLabel value="Russian" control={<Radio />} label="Russian" />
                        <FormControlLabel value="Arabic" control={<Radio />} label="Arabic" />
                        <FormControlLabel value="Portuguese" control={<Radio />} label="Portuguese" />
                        <FormControlLabel value="Korean" control={<Radio />} label="Korean" />
                        <FormControlLabel value="Italian" control={<Radio />} label="Italian" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box className="p-4 sticky bg-white -bottom-0.5 flex justify-end gap-4">
             <Button variant="outlined" >
                Cancel
                </Button>
                <Button variant="contained">
                Set
                </Button>
            </Box>
        </div>
    )
}

export default LanguagePicker
