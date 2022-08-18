import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import LeafletMap from './LeafletMap';
import { solvisResponse } from './LeafletMapTestData';
import { LatLngExpression } from 'leaflet';
import hazardMapsGeojsonTestData from '../__tests__/testData/hazardMapsGeojsonTestData';

export default {
  title: 'Controls/LeafletMap',
  component: LeafletMap,
} as ComponentMeta<typeof LeafletMap>;

export const Primary = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const geoJsonData = [rupturesData, locationsData];
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
      style={{
        stroke: '#f21616',
        color: '#f21616',
        weight: 1,
        opacity: 0.75,
        fillOpacity: 0.6,
      }}
    />
  );
};

export const HazardMaps = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return <LeafletMap zoom={zoom} nzCentre={nzCentre as LatLngExpression} geoJsonData={hazardMapsGeojsonTestData} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />;
};
