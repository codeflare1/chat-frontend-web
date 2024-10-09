import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Popper, Box } from '@mui/material';

const options = [
  { label: 'Planets', submenu: ['Earth', 'Mars', 'Venus'] },
  { label: 'Moons', submenu: ['Titan', 'Europa', 'Ganymede'] },
  { label: 'Stars', submenu: ['Sirius', 'Betelgeuse', 'Proxima Centauri'] },
  { label: 'None', submenu: [] },
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = React.useState(null);

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(submenuAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleMouseEnter = (event, submenuOptions) => {
    if (submenuOptions.length > 0) {
      setSelectedSubmenu(submenuOptions);
      setSubmenuAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onMouseEnter={(event) => handleMouseEnter(event, option.submenu)}
            onMouseLeave={handleMouseLeave}
            onClick={() => option.submenu.length === 0 && handleClose()}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {option.label}
            {option.submenu.length > 0 && <ArrowRightIcon fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>

      {/* Submenu */}
      <Popper
        open={submenuOpen}
        anchorEl={submenuAnchorEl}
        placement="left-start" // Positioning the submenu to the left
        disablePortal
      >
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          {selectedSubmenu &&
            selectedSubmenu.map((subOption) => (
              <MenuItem key={subOption} onClick={handleClose}>
                {subOption}
              </MenuItem>
            ))}
        </Box>
      </Popper>
    </div>
  );
}
