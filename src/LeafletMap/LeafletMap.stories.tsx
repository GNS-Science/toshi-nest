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
import surfaceArray2 from '../__tests__/testData/geoJson/kaikoura_rupture_surfaces_above_2e-4.json';
import surfaceBaseLayer2 from '../__tests__/testData/geoJson/CRU_fault_surfaces.json';
import { GeoJsonObject } from 'geojson';
import ruptureArray from '../__tests__/testData/geoJson/wlg_hik_10k.json';
import ruptureProperties from '../__tests__/testData/wlg_hik_10k_surface_properties.json';

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
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);

  const totalRuptures = ruptureArray.length;

  const timeArray = useMemo(() => {
    return (
      totalRuptures &&
      Array(totalRuptures)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalRuptures]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);
  const timeDimensionOptions = {
    currentTime: 1,
    times: timeArray || [],
    timeInterval: 'P1M/2021-01-01T00:00:00Z/P1M',
    period: 'P1D',
  };

  const timeDimensionControlOptions = {
    displayDate: false,
    maxSpeed: 5,
    minSpeed: 1,
    playerOptions: {
      loop: true,
    },
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
      timeDimensionGeoJsonData={ruptureArray as GeoJsonObject[]}
      timeDimensionUnderlay={surfaceBaseLayer as GeoJsonObject}
      setTimeDimensionNeedsMore={setNeedsMore}
      setTimeDimensionHasNoMore={setHasNoMore}
      surfaceProperties={ruptureProperties || []}
      timeDimensionTotalLength={totalRuptures || 0}
    />
  );
};
