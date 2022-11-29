import React, { useState, useMemo } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import { LatLngExpression } from 'leaflet';

import SelectControl from '../SelectControl';
import LeafletMap from './LeafletMap';
import LeafletDrawer from '../LeafletDrawer';
import solvisResponse from '../__tests__/testData/leafletMapTestData';
import geojsonTesetDat05 from '../__tests__/testData/geoJson/geojsonTestData0.5';
import geojsonTestDataPGA from '../__tests__/testData/geoJson/geojsonTestDataPGA';
import geojsonTestDataCoV from '../__tests__/testData/geoJson/geojsonTestDataCoV';

export default {
  title: 'Controls/LeafletMap',
  component: LeafletMap,
  subcomponents: { LeafletDrawer, SelectControl },
} as ComponentMeta<typeof LeafletMap>;

export const Primary = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const geoJsonData = [locationsData, rupturesData];
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geoJsonData}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      zoomSnap={0.25}
      zoomDelta={0.25}
      style={{
        stroke: '#f21616',
        color: '#f21616',
        weight: 2,
        opacity: 0.75,
        fillOpacity: 0.6,
      }}
      overlay={false}
    />
  );
};

export const HazardMaps = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return <LeafletMap zoom={zoom} nzCentre={nzCentre as LatLngExpression} geoJsonData={geojsonTesetDat05} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />;
};

export const HazardMapsWithCoV = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return <LeafletMap zoom={zoom} nzCentre={nzCentre as LatLngExpression} geoJsonData={geojsonTestDataCoV} height={'700px'} width={'100%'} setFullscreen={setFullscreen} cov={true} />;
};

export const HazardMapsWithControls = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('option1(PGA)');

  const geoJson = useMemo<string[]>(() => {
    switch (selection) {
      case 'option1(PGA)':
        return geojsonTestDataPGA;

      case 'option2(SA0.5)':
        return geojsonTesetDat05;

      default:
        return [];
    }
  }, [selection]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <>
      <LeafletMap zoom={zoom} geoJsonData={geoJson} nzCentre={nzCentre as LatLngExpression} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />
      <LeafletDrawer drawerHeight={'700px'} headerHeight={'0px'} width={'400px'} fullscreen={fullscreen}>
        <Box sx={{ width: '100%', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <SelectControl options={['option1(PGA)', 'option2(SA0.5)', 'option3(null)']} selection={selection} setSelection={setSelection} name="Options" />
        </Box>
      </LeafletDrawer>
    </>
  );
};
