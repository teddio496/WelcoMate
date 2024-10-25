import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';

function HeaderNavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyWebsite
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: 'white',
                marginRight: '20px',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              {item}
            </a>
          ))}
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem button key={item} onClick={toggleDrawer(false)}>
              <ListItemText>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {item}
                </a>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default HeaderNavBar;
