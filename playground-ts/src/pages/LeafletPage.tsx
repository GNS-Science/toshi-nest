import React from 'react';
import { solvisResponse } from '../constants/geojsonData';
import { LeafletMap, LeafletDrawer, LeafletRuptureSetControls } from '../component-lib';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B70500',
    },
  },
  zIndex: { modal: 120000, drawer: 110000 },
});

const LeafletMapPage: React.FC = () => {
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const showLocation = true;
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <ThemeProvider theme={theme}>
      <LeafletMap zoom={zoom} nzCentre={nzCentre} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} />
      <LeafletDrawer drawerContent={<LeafletRuptureSetControls />} />
    </ThemeProvider>
  );
};

export default LeafletMapPage;
