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

const drawerWidth = 400;
const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
  border: '2px solid #ccc',
});

const LeafletDrawer: React.FC<LeafletDrawerProps> = ({ drawerContent }: LeafletDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuOpenButton onClick={handleDrawerOpen}>
        <ChevronRightIcon />
      </MenuOpenButton>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <Button onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </Button>
        {drawerContent}
      </StyledDrawer>
    </>
  );
};

export default LeafletDrawer;
