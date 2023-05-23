/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import 'leaflet-timedimension';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Pane, LayerGroup, useMap, useMapEvents } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletMapProps, LeafletLayersProps, TimeDimensionLayerProps } from './LeafletMap.types';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css';
import TimeDimensionLayer from './TimeDimensionLayer';

const { BaseLayer } = LayersControl;

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const {
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
    timeDimensionGeoJsonData,
    timeDimensionUnderlay,
    setTimeDimensionNeedsMore,
    setTimeDimensionHasNoMore,
    timeDimensionTotalLength,
    surfaceProperties,
    overlay = true,
  } = props;

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
          timeDimension={timeDimension}
          timeDimensionGeoJsonData={timeDimensionGeoJsonData}
          timeDimensionUnderlay={timeDimensionUnderlay}
          setTimeDimensionNeedsMore={setTimeDimensionNeedsMore}
          setTimeDimensionHasNoMore={setTimeDimensionHasNoMore}
          surfaceProperties={surfaceProperties}
          timeDimensionTotalLength={timeDimensionTotalLength}
        />
      </MapContainer>
    </>
  );
};

const LeafletLayers: React.FC<LeafletLayersProps> = (props: LeafletLayersProps) => {
  const {
    style,
    geoJsonData,
    overlay,
    setFullscreen,
    onEachFeature,
    zoomLevel,
    setZoomLevel,
    timeDimension,
    timeDimensionGeoJsonData,
    timeDimensionUnderlay,
    setTimeDimensionNeedsMore,
    setTimeDimensionHasNoMore,
    surfaceProperties,
    timeDimensionTotalLength,
  } = props;

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  const parseGeoJson = (data: string): GeoJsonObject => {
    return JSON.parse(data) as GeoJsonObject;
  };

  return (
    <>
      <LayersControl>
        <BaseLayer name="CartoDB: VoyagerLabelsUnder" checked={true}>
          <LayerGroup>
            <TileLayer
              url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              maxZoom={20}
            />
          </LayerGroup>
        </BaseLayer>

        <BaseLayer name="Esri: WorldGrayCanvas">
          <TileLayer
            url={'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'}
            attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
            maxZoom={16}
          />
        </BaseLayer>

        <BaseLayer name="Ocean Basemap">
          <LayerGroup>
            <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'} attribution="&copy; Ocean Basemap, image service by ArcGIS" />
            <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}'} />
          </LayerGroup>
        </BaseLayer>

        <BaseLayer name="Esri: WorldImagery">
          <TileLayer
            url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            // maxZoom={13}
          />
        </BaseLayer>

        {overlay && (
          <Pane name="Overlay" style={{ zIndex: 499 }}>
            <LayersControl.Overlay name="Place names">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/text@GoogleMapsCompatible/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Transport">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/transport@g/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Water">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/water@g/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Contours">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/contours@g/{z}/{x}/{y}.png'}
                tms={true}
                attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Urban">
              <TileLayer
                url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/urban@g/{z}/{x}/{y}.png'}
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
                return (
                  style || {
                    stroke: feature?.properties['stroke'] || feature?.properties['stroke-color'],
                    color: feature?.properties['stroke'] || feature?.properties['stroke-color'] || feature?.properties['fill'] || feature?.properties['fill-color'],
                    weight: zoomLevel / 3,
                    opacity: feature?.properties['stroke-opacity'],
                    fillOpacity: feature?.properties['fill-opacity'],
                  }
                );
              }}
            />
          );
        })}
      {timeDimension && timeDimensionGeoJsonData && setTimeDimensionHasNoMore && setTimeDimensionNeedsMore && timeDimensionTotalLength && (
        <TimeDimensionLayer
          geoJsonData={timeDimensionGeoJsonData}
          setTimeDimensionNeedsMore={setTimeDimensionNeedsMore}
          setTimeDimensionHasNoMore={setTimeDimensionHasNoMore}
          surfaceProperties={surfaceProperties || []}
          timeDimensionTotalLength={timeDimensionTotalLength}
        />
      )}
      {timeDimension && timeDimensionUnderlay && <GeoJSON data={timeDimensionUnderlay} style={{ color: 'grey', opacity: 0.2, fillOpacity: 0.2 }} />}
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
