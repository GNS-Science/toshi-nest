/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GeoJsonObject, Geometry, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import 'leaflet-timedimension';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Pane, LayerGroup, useMap, useMapEvents } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletMapProps, LeafletLayersProps, TimeDimensionLayerProps } from './LeafletMap.types';
import { Layer } from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css';

const TimeDimensionInfoBox = styled(Box)({
  position: 'absolute',
  bottom: '40px',
  padding: '10px',
  margin: '10px',
  zIndex: 100000,
  backgroundColor: '#fff',
  float: 'left',
  lineHeight: '26px',
  borderRadius: '4px',
  borderWidth: '1px',
  border: '2px solid rgba(0,0,0,0.2)',
  backgroundClip: 'padding-box',
  display: 'block',
});

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
    cov,
    zoomLevel,
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
          setFullscreen={setFullscreen}
          cov={cov}
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
    cov,
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
                return (
                  style || {
                    stroke: feature?.properties['stroke'] || feature?.properties['stroke-color'],
                    color: feature?.properties['fill'] || feature?.properties['fill-color'] || feature?.properties['stroke-color'],
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

const TimeDimensionLayer: React.FC<TimeDimensionLayerProps> = (props: TimeDimensionLayerProps) => {
  const { geoJsonData, setTimeDimensionNeedsMore, setTimeDimensionHasNoMore, surfaceProperties, timeDimensionTotalLength } = props;
  const map = useMap();
  const [timeIndex, setTimeIndex] = useState(0);
  const [currentSurface, setCurrentSurface] = useState(geoJsonData[0]);
  (map as any).timeDimension.on('timeloading', (data: any) => {
    if (data.target._currentTimeIndex !== timeIndex) {
      setTimeIndex(data.target._currentTimeIndex);
    }
  });
  (map as any).timeDimension.on('availabletimeschanged', (data: any) => {
    (map as any).timeDimension.setCurrentTime(0);
    setTimeIndex(0);
    (map as any).timeDimensionControl._player.stop();
  });

  useEffect(() => {
    setCurrentSurface(geoJsonData[timeIndex]);
  }, [timeIndex, geoJsonData]);

  useEffect(() => {
    if (geoJsonData.length - timeIndex < 5) {
      setTimeDimensionNeedsMore(true);
    }
  }, [timeIndex, geoJsonData, setTimeDimensionNeedsMore]);

  useEffect(() => {
    if (timeIndex === geoJsonData.length) {
      (map as any).timeDimensionControl._player.pause();
      setTimeDimensionHasNoMore(true);
    } else if (timeIndex > geoJsonData.length) {
      setCurrentSurface(geoJsonData[geoJsonData.length - 1] !== undefined ? geoJsonData[geoJsonData.length - 1] : geoJsonData[timeIndex]);
      if (geoJsonData.length <= timeIndex) {
        setTimeDimensionHasNoMore(true);
        setTimeDimensionNeedsMore(true);
      }
    } else if (timeIndex === timeDimensionTotalLength - 1) {
      setTimeDimensionHasNoMore(false);
      setTimeDimensionNeedsMore(true);
    } else {
      (map as any).timeDimensionControl._player.release();
      setTimeDimensionHasNoMore(false);
    }
  }, [timeIndex, geoJsonData, setTimeDimensionHasNoMore, map, setTimeDimensionNeedsMore, timeDimensionTotalLength]);

  const surfaceId = useMemo(() => (currentSurface as any)?.features[0]?.id, [currentSurface]);

  const timeArray = useMemo(() => {
    return (
      timeDimensionTotalLength &&
      Array(timeDimensionTotalLength)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [timeDimensionTotalLength]);

  useEffect(() => {
    if (timeArray && timeArray.length > 0) {
      (map as any).timeDimension.setAvailableTimes(timeArray, 'replace');
    }
  }, [map, timeArray]);

  return (
    <>
      <GeoJSON key={`geojson-timeline-layer-${Math.random()}`} data={currentSurface} style={{ color: 'red' }} />
      {surfaceProperties[timeIndex] !== null && surfaceProperties[timeIndex] !== undefined && (
        <TimeDimensionInfoBox>
          <Typography variant={'body2'}>Rupture ID: {surfaceId}</Typography>
          <Typography variant={'body2'}>
            Rupture {timeIndex + 1} of {timeDimensionTotalLength}
          </Typography>
          <Typography variant={'body2'}>Mean Rate: {surfaceProperties[timeIndex]?.rate_weighted_mean?.toExponential(2)} per year</Typography>
          <Typography variant={'body2'}>Magnitude: {surfaceProperties[timeIndex]?.magnitude?.toFixed(1)}</Typography>
          <Typography variant={'body2'}>Area: {surfaceProperties[timeIndex]?.area} km²</Typography>
          <Typography variant={'body2'}>Length: {surfaceProperties[timeIndex]?.length} km</Typography>
        </TimeDimensionInfoBox>
      )}
    </>
  );
};

export default LeafletMap;
