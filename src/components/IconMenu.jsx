import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';


const IconMenu = ({ anchorEl, handleClose }) => {
  return (
    <Paper 
    sx={{ 
        width: 320, 
        maxWidth: '100%', 
        position: 'absolute',
        top: anchorEl?.getBoundingClientRect().bottom,
        left: anchorEl?.getBoundingClientRect().left,
        rIndex: 1300
        }}>
            
      <MenuList>
        <MenuItem onClick={handleClose}>
          <ListItemText>Sort Countries by Population</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText>Sort Countries by Language</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemText>View all Countries</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default IconMenu;