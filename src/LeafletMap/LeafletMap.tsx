/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { LeafletMapProps } from './LeafletMap.types';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

const mapStyle = {
  color: '#f21616',
  weight: 1,
  opacity: 0.65,
};

const { BaseLayer } = LayersControl;

const LeafletMap: React.FC<LeafletMapProps> = ({ rupturesData, locationsData, nzCentre, zoom, showLocation, height, width, setFullscreen }: LeafletMapProps) => {
  const ruptures = JSON.parse(rupturesData) as GeoJsonObject;
  const locations = JSON.parse(locationsData) as GeoJsonObject;

  return (
    <>
      <MapContainer id={'leaflet-map-container'} center={nzCentre} zoom={zoom} scrollWheelZoom={true} style={{ height: height, width: width }}>
        <LayersControl>
          <BaseLayer name="Ocean Basemap" checked={true}>
            <TileLayer url={'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'} attribution="&copy; Ocean Basemap, image service by ArcGIS" />
          </BaseLayer>
          <BaseLayer name="Nasa Blue Marble">
            <TileLayer
              url={'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg'}
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>
          <BaseLayer name="Google Maps Hybrid">
            <TileLayer url={'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'} attribution="&copy; Google Maps, image service by TerraMetrics" maxNativeZoom={20} />
          </BaseLayer>
        </LayersControl>
        {ruptures && <GeoJSON key={Math.random()} data={ruptures} style={mapStyle} />}
        {showLocation && locations && <GeoJSON key={Math.random()} data={locations} style={mapStyle} />}
        <Fullscreen
          eventHandlers={{
            enterFullscreen: () => setFullscreen(true),
            exitFullscreen: () => setFullscreen(false),
          }}
          forcePseudoFullscreen={true}
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
