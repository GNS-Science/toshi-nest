import React from 'react';
import LeafletMap from '../../LeafletMap/LeafletMap';
import { solvisResponse } from '../testData/leafletMapTestData';
import { render } from '@testing-library/react';
import { LatLngExpression } from 'leaflet';

describe('LeafletMap works as expected', () => {
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const providerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const showLocation = true;
  const zoom = 5;
  const nzCentre: LatLngExpression = [-40.946, 174.167];

  test.skip('renders without crashing', () => {
    render(<LeafletMap zoom={zoom} nzCentre={nzCentre} providerUrl={providerUrl} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} />);
  });
});
