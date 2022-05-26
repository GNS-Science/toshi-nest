import React from 'react';
import { Drawer, Button } from '@mui/material';

const LeafletDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 400;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleDrawerOpen}>open</Button>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Button onClick={handleDrawerClose}>close</Button>
      </Drawer>
    </>
  );
};

export default LeafletDrawer;
