import React from 'react';
import { styled } from '@mui/material/styles';
import { Drawer, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { LeafletDrawerProps } from './LeafletDrawer.types';

const MenuOpenButton = styled(Button)({
  position: 'absolute',
  top: '50%',
  left: 10,
  zIndex: 100000,
  transform: 'translateY(-50%)',
  maxWidth: '30px',
  minWidth: '30px',
  maxHeight: '30px',
  lineHeight: '30px',
  backgroundColor: '#fff',
  border: '2px solid #ccc',
  color: 'black',
});

const StyledDrawer = styled(Drawer)({
  flexShrink: 0,
  border: '2px solid #ccc',
});

const LeafletDrawer: React.FC<LeafletDrawerProps> = ({ children, drawerHeight, headerHeight, fullscreen, width }: LeafletDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fullscreenDrawer = (
    <StyledDrawer
      PaperProps={{
        sx: {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Button onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </Button>
      {children}
    </StyledDrawer>
  );

  const drawer = (
    <StyledDrawer
      PaperProps={{
        sx: {
          width: width,
          boxSizing: 'border-box',
          height: drawerHeight,
          marginTop: headerHeight,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Button onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </Button>
      {children}
    </StyledDrawer>
  );

  return (
    <>
      <MenuOpenButton onClick={handleDrawerOpen}>
        <ChevronRightIcon />
      </MenuOpenButton>
      {fullscreen ? fullscreenDrawer : drawer}
    </>
  );
};

export default LeafletDrawer;
