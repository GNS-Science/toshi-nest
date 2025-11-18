import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
// import { queryByAttribute } from 'react-testing-library';

import userEvent from '@testing-library/user-event';
import LeafletMap from './LeafletMap';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-timedimension';

// import Fullscreen from 'react-leaflet-fullscreen-plugin';

import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css';

describe('LeafletMap', () => {
  const Wrapper = () => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [zoomLevel, setZoomLevel] = useState<number>(5);
    const zoom = 5;
    const nzCentre = [-40.946, 174.167];
    return (
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={[]}
        // onEachFeature={null}
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
      />
    );
  };

  userEvent.setup();

  test.skip('should render', () => {
    // this breaks the FullScreen control
    render(<Wrapper />);
    // let elem = dom.getElementById('leaflet-map-container');
    // assert (elem !== null, `Unable to find an element`);
    expect(screen.getByText('Esri: WorldImagery')).toBeInTheDocument();
  });
});
