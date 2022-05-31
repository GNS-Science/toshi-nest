/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { LeafletMapProps } from './LeafletMap.types';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};

const LeafletMap: React.FC<LeafletMapProps> = ({ rupturesData, locationsData, nzCentre, zoom, providerUrl, showLocation }: LeafletMapProps) => {
  const ruptures = JSON.parse(rupturesData) as GeoJsonObject;
  const locations = JSON.parse(locationsData) as GeoJsonObject;
  return (
    <>
      <MapContainer id={'leaflet-map-container'} center={nzCentre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer id={'leaflet-tile-layer'} url={providerUrl} />
        {ruptures && <GeoJSON key={Math.random()} data={ruptures} style={myStyle} />}
        {showLocation && locations && <GeoJSON key={Math.random()} data={locations} style={myStyle} />}
        <Fullscreen />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
