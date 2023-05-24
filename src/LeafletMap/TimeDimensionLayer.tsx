/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Pane, LayerGroup, useMap, useMapEvents } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css';

export interface TimeDimensionLayerProps {
  geoJsonData: GeoJsonObject[];
  setTimeDimensionHasNoMore: (setTimeDimensionHasNoMore: boolean) => void;
  setTimeDimensionNeedsMore: (setTimeDimensionNeedsMore: boolean) => void;
  surfaceProperties: SurfaceProperties[];
  timeDimensionTotalLength: number;
}

const TimeDimensionInfoBox = styled(Box)({
  position: 'absolute',
  bottom: '55px',
  right: '0px',
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
  width: '430px',
});

const { BaseLayer } = LayersControl;

const TimeDimensionLayer: React.FC<TimeDimensionLayerProps> = ({
  geoJsonData,
  setTimeDimensionNeedsMore,
  setTimeDimensionHasNoMore,
  surfaceProperties,
  timeDimensionTotalLength,
}: TimeDimensionLayerProps) => {
  const map = useMap();
  const [timeIndex, setTimeIndex] = useState(0);
  const [currentSurface, setCurrentSurface] = useState(geoJsonData[0]);
  (map as any).timeDimension.on('timeloading', (data: any) => {
    if (data.target._currentTimeIndex !== timeIndex) {
      setTimeIndex(data.target._currentTimeIndex);
    }
  });
  (map as any).timeDimension.on('availabletimeschanged', () => {
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
  const firstId = useMemo(() => (geoJsonData[0] as any)?.features[0]?.id, [geoJsonData]);

  const timeArray = useMemo(() => {
    return (
      timeDimensionTotalLength &&
      firstId &&
      Array(timeDimensionTotalLength)
        .fill(0)
        .map((_, i) => i + 1 + Math.random() / 10)
    );
  }, [timeDimensionTotalLength, firstId]);

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

export default TimeDimensionLayer;
