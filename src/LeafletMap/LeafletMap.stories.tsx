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
import geojsonTestDataStyled from '../__tests__/testData/geoJson/geojsonTestDataStyled';
import surfaceArray from '../__tests__/testData/geoJson/puysegur_rupture_surfaces_above_2e-4.json';
import surfaceBaseLayer from '../__tests__/testData/geoJson/surfaces_puysegur.json';
import { GeoJsonObject } from 'geojson';

export default {
  title: 'Controls/LeafletMap',
  component: LeafletMap,
  subcomponents: { LeafletDrawer, SelectControl },
} as ComponentMeta<typeof LeafletMap>;

export const Primary = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
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
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
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
  const [zoomLevel, setZoomLevel] = useState(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geojsonTesetDat05}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const HazardMapsWithCoV = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geojsonTestDataCoV}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      cov={true}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const HazardMapsWithControls = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('option1(PGA)');
  const [zoomLevel, setZoomLevel] = useState<number>(5);

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
      <LeafletMap
        zoom={zoom}
        geoJsonData={geoJson}
        nzCentre={nzCentre as LatLngExpression}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />
      <LeafletDrawer drawerHeight={'700px'} headerHeight={'0px'} width={'400px'} fullscreen={fullscreen}>
        <Box sx={{ width: '100%', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <SelectControl options={['option1(PGA)', 'option2(SA0.5)', 'option3(null)']} selection={selection} setSelection={setSelection} name="Options" />
        </Box>
      </LeafletDrawer>
    </>
  );
};

export const FaultModelWithStyles = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geojsonTestDataStyled}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      cov={true}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const FaultModelWithTimeDimension = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);
  const timeDimensionOptions = {
    timeInterval: '2021-07-01/' + currentTime.toISOString(),
    period: 'P1M',
    currentTime: 3,
    times: [
      3, 4, 5, 6, 7, 8, 12, 14, 21, 23, 251, 412, 413, 414, 419, 420, 530, 531, 533, 2714, 3832, 3842, 4582, 4585, 5624, 5727, 6890, 8772, 9323, 9436, 9943, 9975, 10018, 10031, 10078, 10080, 10081,
      10655, 10708, 11286, 11299, 11300, 11850, 11861, 11865, 11870, 12233, 12381, 12389, 12390, 12779, 13153, 13832, 13834, 14130, 14372, 14806, 14980, 15131, 15134, 15259, 15371, 15375, 15395,
      15470, 15528, 15548, 15556, 15615, 15622, 15668, 15685, 15711, 15719, 15735, 15746, 15758, 15766, 15767, 15779, 15785, 15790,
    ],
  };
  const timeDimensionControlOptions = {
    loopButton: true,
    displayDate: false,
  };

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={[]}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      cov={true}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      timeDimensionOptions={timeDimensionOptions}
      timeDimensionControlOptions={timeDimensionControlOptions}
      timeDimension={true}
      timeDimensionGeoJsonData={surfaceArray as GeoJsonObject[]}
      timeDimensionUnderlay={surfaceBaseLayer as GeoJsonObject}
    />
  );
};
