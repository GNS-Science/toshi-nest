import React from 'react';
import { solvisResponse } from '../constants/geojsonData';
import { LeafletMap } from '../component-lib';

const LeafletMapPage = () => {
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const showLocation = true;
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return <LeafletMap zoom={zoom} nzCentre={nzCentre} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} />;
};

export default LeafletMapPage;