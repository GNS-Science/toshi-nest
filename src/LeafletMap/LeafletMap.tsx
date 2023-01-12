/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { GeoJsonObject, Geometry, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Pane, LayerGroup } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletMapProps, LeafletLayersProps } from './LeafletMap.types';
import { Layer } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

const { BaseLayer } = LayersControl;

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const { geoJsonData, nzCentre, zoom, height, width, setFullscreen, style, minZoom, maxZoom, zoomSnap, zoomDelta, cov, zoomLevel, setZoomLevel, overlay = true } = props;

  return (
    <>
      <MapContainer
        id={'leaflet-map-container'}
        center={nzCentre}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: height, width: width }}
        minZoom={minZoom || 4}
        maxZoom={maxZoom || 12}
        zoomSnap={zoomSnap || 1}
        zoomDelta={zoomDelta || 1}
      >
        <LeafletLayers style={style} geoJsonData={geoJsonData} setFullscreen={setFullscreen} cov={cov} overlay={overlay} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      </MapContainer>
    </>
  );
};

const LeafletLayers: React.FC<LeafletLayersProps> = (props: LeafletLayersProps) => {
  const { style, geoJsonData, overlay, setFullscreen, cov, zoomLevel, setZoomLevel } = props;

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  const parseGeoJson = (data: string): GeoJsonObject => {
    return JSON.parse(data) as GeoJsonObject;
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    let popupContent = '';
    if (feature.properties?.loc) {
      popupContent = `
        <div>
          <p>Location: ${feature.properties?.loc[1]}, ${feature.properties?.loc[0]}</p>
          <p>${cov ? 'CoV' : 'Acceleration'}: ${Number(feature.properties.value).toFixed(2)} ${cov ? '' : '(g)'}</p>
        </div>
      `;
    } else if (feature.properties['magnitude.min']) {
      const location = feature.properties?.['fault_name'];
      const minMag = feature.properties?.['magnitude.min'];
      const maxMag = feature.properties?.['magnitude.max'];
      const minRuptureRate = feature.properties?.['annual_rate.min'];
      const maxRuptureRate = feature.properties?.['annual_rate.max'];
      const totalRate = feature.properties?.['annual_rate.sum'];
      popupContent = `
      <div>
        <b>${location}</b>
        <p>Min Magnitude: ${minMag.toFixed(2)}</p>
        <p>Max Magnitude: ${maxMag.toFixed(2)}</p>
        <p>Min Rupture Rate (1/yr): ${minRuptureRate.toExponential(2)}</p>
        <p>Max Rupture Rate (1/yr): ${maxRuptureRate.toExponential(2)}</p>
        <p>Total Rate (1/yr): ${totalRate.toExponential(2)}</p>
      </div>
     `;
    }
    if (popupContent) {
      layer.bindPopup(popupContent);
    }
  };

  return (
    <>
      <LayersControl>
        <BaseLayer name="Ocean Basemap" checked={true}>
          <LayerGroup>
            <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'} attribution="&copy; Ocean Basemap, image service by ArcGIS" />
            <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}'} />
          </LayerGroup>
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
        {overlay && (
          <Pane name="Overlay" style={{ zIndex: 499 }}>
            <LayersControl.Overlay name="Cities">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/text@GoogleMapsCompatible/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Roads">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/transport@g/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
          </Pane>
        )}
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
                  ? { ...style, weight: zoomLevel / 3 }
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
    </>
  );
};

export default LeafletMap;
