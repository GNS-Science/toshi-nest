import React, { useState } from 'react';
import { solvisResponse } from '../constants/geojsonData';
import { LeafletMap, LeafletDrawer, LeafletRuptureSetControls } from '../component-lib';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E97826',
    },
  },
  zIndex: { modal: 120000, drawer: 110000 },
});

const LeafletMapPage: React.FC = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false)

  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const showLocation = true;
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const [sampleSelection, setSampleSelection] = useState(['Wellington']);
  const [magnitude, setMagnitude] = useState<number[]>([5, 10]);
  const [ruptureRate, setRuptureRate] = useState<number[]>([-20, 1]);
  const cities = ['Wellington', 'Auckland', 'Christchurch', 'Hamilton', 'Dunedin', 'Palmerston North', 'Napier'];
  const ruptureSetControlSelectName = 'Cities';

  const magInputProps = {
    step: 0.1,
    min: 5,
    max: 9,
    type: 'number',
  };

  const ruptureRateInputProps = {
    step: 1,
    min: -20,
    max: 0,
    type: 'number',
  };

  const drawer = (
      <LeafletDrawer drawerHeight={'700px'} headerHeight={'10vh'} width={'400px'} fullscreen={fullscreen}>
        <LeafletRuptureSetControls
          selection={sampleSelection}
          setSelection={setSampleSelection}
          magnitude={magnitude}
          setMagnitude={setMagnitude}
          ruptureRate={ruptureRate}
          setRuptureRate={setRuptureRate}
          options={cities}
          name={ruptureSetControlSelectName}
          magnitudeInputProps={magInputProps}
          ruptureRateInputProps={ruptureRateInputProps}
        />
      </LeafletDrawer>
  )

  return (
    <ThemeProvider theme={theme}>
      <LeafletMap zoom={zoom} nzCentre={nzCentre} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />
      {drawer}
    </ThemeProvider>
  );
};

export default LeafletMapPage;
