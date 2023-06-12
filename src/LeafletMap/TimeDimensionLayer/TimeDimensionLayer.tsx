/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { TimeDimensionLayerProps } from './TimeDimensionLayer.types';

import TimeDimensionInfoBox from './TimeDimensionInfoBox';

// const { BaseLayer } = LayersControl;

const TimeDimensionLayer: React.FC<TimeDimensionLayerProps> = ({
  geoJsonData,
  setTimeDimensionNeedsMore,
  setTimeDimensionHasNoMore,
  surfaceProperties,
  timeDimensionTotalLength,
  onNewTimeIndexHandler,
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
    if (onNewTimeIndexHandler !== undefined) {
      // console.log('TimeDimensionLayer -> onNewTimeIndexHandler', timeIndex)
      onNewTimeIndexHandler(timeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeIndex]);

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
      {onNewTimeIndexHandler == null && // only render if we dont have a handler function....
        surfaceProperties[timeIndex] !== null &&
        surfaceProperties[timeIndex] !== undefined && (
          <TimeDimensionInfoBox surfaceId={surfaceId} timeIndex={timeIndex} timeDimensionTotalLength={timeDimensionTotalLength} surfaceProperties={surfaceProperties} />
        )}
    </>
  );
};

export default TimeDimensionLayer;
