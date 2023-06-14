import React from 'react';

export interface LeafletDrawerProps {
  children: React.ReactNode;
  drawerHeight: string;
  headerHeight: string;
  width: string;
  fullscreen: boolean;
  openAtRender?: boolean;
}
