/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import 'leaflet-timedimension';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Pane, LayerGroup, useMap, useMapEvents } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletMapProps, GeoJsonStyle, LeafletLayersProps } from './LeafletMap.types';
import '../../node_modules/leaflet/dist/leaflet.css';

import LeafletLayers from './LeafletLayers';

const LeafletMap = ({
  geoJsonData,
  nzCentre,
  zoom,
  height,
  width,
  setFullscreen,
  style,
  minZoom,
  maxZoom,
  zoomSnap,
  zoomDelta,
  zoomLevel,
  onEachFeature,
  setZoomLevel,
  timeDimension,
  timeDimensionOptions,
  timeDimensionControlOptions,
  timeDimensionLayerProps = null,
  overlay = true,
}: LeafletMapProps) => {
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
        timeDimension={timeDimension}
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControl={timeDimension}
        timeDimensionControlOptions={timeDimensionControlOptions}
      >
        <LeafletLayers
          style={style}
          geoJsonData={geoJsonData}
          onEachFeature={onEachFeature}
          setFullscreen={setFullscreen}
          overlay={overlay}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          timeDimensionLayerProps={timeDimensionLayerProps}
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
