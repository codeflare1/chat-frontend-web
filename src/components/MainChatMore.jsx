import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Popper, Box } from '@mui/material';

const options = [
  { label: 'Disappearing messages', submenu: ['✓ Off', '4 weeks', '1 week', '1 day', '8 hours', '1 hour', '5 minutes', '30 seconds'] },
  { label: 'Mute notifications', submenu: ['Mute for one hour', 'Mute for eight hours', 'Mute for one day', 'Mute for one week', 'Mute always'] },
  { label: 'Chat settings', submenu: [] },
  { label: 'All media', submenu: [] },
  { label: 'Select messages', submenu: [] },
  { label: 'Mark as unread', submenu: [] },
  { label: 'Pin chat', submenu: [] },
  { label: 'Archive', submenu: [] },
  { label: 'Block', submenu: [] },
  { label: 'Delete messages', submenu: [] },
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
   
        <MoreVertIcon  id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick} />
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
            width: '230px',
            borderRadius:'6px'
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
        placement="left-start" 
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
