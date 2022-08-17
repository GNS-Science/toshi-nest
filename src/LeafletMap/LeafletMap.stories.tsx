import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import LeafletMap from './LeafletMap';
import { solvisResponse } from './LeafletMapTestData';
import { LatLngExpression } from 'leaflet';

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
      // rupturesData={rupturesData}
      // locationsData={locationsData}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
    />
  );
};
