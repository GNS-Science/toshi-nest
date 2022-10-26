/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GeoJsonObject, Geometry, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletMapProps } from './LeafletMap.types';
import { Layer } from 'leaflet';

const { BaseLayer } = LayersControl;

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const { geoJsonData, nzCentre, zoom, height, width, setFullscreen, style, minZoom, maxZoom, zoomSnap, zoomDelta, cov } = props;

  const parseGeoJson = (data: string): GeoJsonObject => {
    return JSON.parse(data) as GeoJsonObject;
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const popupContent = `
      <div>
        <p>Location: ${feature.properties?.loc[1]}, ${feature.properties?.loc[0]}</p>
        <p>${cov ? 'CoV' : 'Acceleration'}: ${Number(feature.properties.value).toFixed(2)} ${cov ? '' : '(g)'}</p>
      </div>
    `;
    if (popupContent) {
      layer.bindPopup(popupContent);
    }
  };

  return (
    <>
      <MapContainer
        id={'leaflet-map-container'}
        center={nzCentre}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: height, width: width }}
        minZoom={minZoom || 4}
        maxZoom={maxZoom || 8}
        zoomSnap={zoomSnap || 1}
        zoomDelta={zoomDelta || 1}
      >
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
        {geoJsonData.length &&
          geoJsonData.map((data, index) => {
            return (
              <GeoJSON
                key={`geojson-layer-${index}-${Math.random()}`}
                data={parseGeoJson(data)}
                onEachFeature={onEachFeature}
                style={(feature) => {
                  return style
                    ? style
                    : {
                        stroke: feature?.properties.stroke,
                        color: feature?.properties.fill,
                        weight: feature?.properties['stroke-width'],
                        opacity: feature?.properties['stroke-opacity'],
                        fillOpacity: feature?.properties['fill-opacity'],
                      };
                }}
              />
            );
          })}
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
