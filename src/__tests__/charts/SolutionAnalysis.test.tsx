import React from 'react';
import SolutionAnalysis from '../../charts/SolutionAnalysis';
import { solvisResponse } from '../testData/solutionAnalysisTestData';
import { render } from '@testing-library/react';
import { LatLngExpression } from 'leaflet';

describe('SolutionAnalysis works as expected', () => {
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const providerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const showLocation = true;
  const zoom = 5;
  const nzCentre: LatLngExpression = [-40.946, 174.167];

  const Wrapper = () => {
    return <SolutionAnalysis zoom={zoom} nzCentre={nzCentre} providerUrl={providerUrl} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} />;
  };

  test('renders without crashing', () => {
    render(<Wrapper />);
  });
});
