/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { LatLngExpression } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};

interface SolutionAnalysisProps {
  rupturesData: string;
  locationsData: string;
  nzCentre: LatLngExpression;
  zoom: number;
  providerUrl: string;
  showLocation: boolean;
}

const SolutionAnalysis: React.FC<SolutionAnalysisProps> = ({
  rupturesData,
  locationsData,
  nzCentre,
  zoom,
  providerUrl,
  showLocation
}: SolutionAnalysisProps) => {

  const ruptures = JSON.parse(rupturesData) as GeoJsonObject;
  const locations = JSON.parse(locationsData) as GeoJsonObject;
  return (
    <>
      <MapContainer center={nzCentre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer url={providerUrl} />
        {ruptures && <GeoJSON key={Math.random()} data={ruptures} style={myStyle} />}
        {showLocation && locations && <GeoJSON key={Math.random()} data={locations} style={myStyle} />}
      </MapContainer>
    </>
  );
};

export default SolutionAnalysis;
