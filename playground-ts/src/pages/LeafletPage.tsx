import React from 'react';
import { solvisResponse } from '../constants/geojsonData';
import { LeafletMap, LeafletDrawer } from '../component-lib';

const LeafletMapPage: React.FC = () => {
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const showLocation = true;
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <>
      <LeafletMap zoom={zoom} nzCentre={nzCentre} rupturesData={rupturesData} locationsData={locationsData} showLocation={showLocation} />
      <LeafletDrawer />
    </>
  );
};

export default LeafletMapPage;
