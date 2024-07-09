import * as React from 'react';
import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import IconMenu from './IconMenu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=> {
    const handleClickoutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)){
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickoutside);
    return () => {
      document.removeEventListener('mousedown', handleClickoutside);
    };
  }, [anchorEl]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Countries
          </Typography>
        </Toolbar>
      </AppBar>
      {anchorEl && (
        <IconMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
      )}
    </Box>
  );
}

export default Navbar;
