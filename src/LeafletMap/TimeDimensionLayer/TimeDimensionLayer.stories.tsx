/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useContext } from 'react';
import { ComponentMeta } from '@storybook/react-webpack5';
import { Box, Typography } from '@mui/material';
import { LatLngExpression } from 'leaflet';

import SelectControl from '../../SelectControl';
import LeafletMap from '../../LeafletMap';
import LeafletDrawer from '../../LeafletDrawer';

import geojsonTestDataStyled from '../../__tests__/testData/geoJson/geojsonTestDataStyled';
import geojsonTestDataStyledLine from '../../__tests__/testData/geoJson/geojsonTestDataStyledLine';
import ruptureProperties from '../../__tests__/testData/wlg_hik_10k_surface_properties.json';
import crustalFaultSurfacesList from '../../__tests__/testData/geoJson/crustal_fault_surfaces_list_sample.json';

import TimeDimensionLayerContext, { TimeDimensionLayerState } from './store';

export default {
  title: 'Controls/LeafletMap/TimeDimensionLayer',
  component: LeafletMap,
  subcomponents: { LeafletDrawer, SelectControl },
} as ComponentMeta<typeof LeafletMap>;

const InfoBox = () => {
  const context = useContext(TimeDimensionLayerContext);
  return (
    <Box>
      <Typography variant={'body2'}>Rupture ID: {context.timeIndex}</Typography>
    </Box>
  );
};

export const AnimationWithCallback = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [totalRuptures, setTotalRuptures] = useState<number>(10);

  const testData = [...geojsonTestDataStyled, geojsonTestDataStyledLine];
  const [timeDimensionLayerState, timeDimensionLayerStateSet] = useState<TimeDimensionLayerState>({ timeIndex: 20 });

  const onNewTimeIndexHandler = (e: number) => {
    timeDimensionLayerStateSet({ timeIndex: e });
  };

  const timeArray = useMemo(() => {
    return (
      totalRuptures &&
      Array(totalRuptures)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalRuptures]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);

  const timeDimensionOptions = {
    currentTime: 1,
    times: timeArray || [],
    timeInterval: 'P1M/2021-01-01T00:00:00Z/P1M',
    period: 'P1D',
  };

  const timeDimensionControlOptions = {
    position: 'bottomright',
    displayDate: false,
    maxSpeed: 5,
    minSpeed: 1,
    playerOptions: {
      loop: true,
    },
  };

  const timeDimensionLayerProps = {
    geoJsonData: crustalFaultSurfacesList as GeoJsonObject[],
    setTimeDimensionNeedsMore: setNeedsMore,
    setTimeDimensionHasNoMore: setHasNoMore,
    surfaceProperties: ruptureProperties || [],
    timeDimensionTotalLength: totalRuptures || 0,
    onNewTimeIndexHandler: onNewTimeIndexHandler,
  };

  return (
    <TimeDimensionLayerContext.Provider value={timeDimensionLayerState}>
      <InfoBox />
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={testData}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControlOptions={timeDimensionControlOptions}
        timeDimension={true}
        timeDimensionLayerProps={timeDimensionLayerProps}
      />
    </TimeDimensionLayerContext.Provider>
  );
};
