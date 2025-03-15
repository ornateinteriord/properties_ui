import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SideBarMenuItemType } from "../../../types";
import { AdminSideBarMenuItems } from "./SidebarUtils";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import CloseIcon from '@mui/icons-material/Close';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true, 
      }}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >

<List>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <img
              className="nav-img"
              src={logo}
              style={{
                width: "150px",
                height: "80px",
                objectFit: "contain",
              }}
            />
          <IconButton onClick={onClose} sx={{ ml:"-10px",color:'#150b83c1' }}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider/>
      <List sx={{ml : 3}}>
        {AdminSideBarMenuItems.map((item:SideBarMenuItemType) => (
          <ListItem 
            key={item.name}
            component={Link} 
            to={item.path}
            onClick={onClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText sx={{ml:-2}} primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;