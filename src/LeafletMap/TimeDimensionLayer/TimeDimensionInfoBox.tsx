import React, { useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { SurfaceProperties } from './TimeDimensionLayer.types';
// import 'leaflet/dist/leaflet.css';

export interface TimeDimensionInfoBoxProps {
  surfaceId: string;
  timeIndex: number;
  timeDimensionTotalLength: number;
  surfaceProperties: SurfaceProperties[];
}

const style = {
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
};

const InfoBox = ({ surfaceId, timeIndex, timeDimensionTotalLength, surfaceProperties }: TimeDimensionInfoBoxProps) => {
  console.log('InfoBox');
  return (
    <Box>
      <Typography variant={'body2'}>Rupture ID: {surfaceId}</Typography>
      <Typography variant={'body2'}>
        Rupture {timeIndex + 1} of {timeDimensionTotalLength}
      </Typography>
      <Typography variant={'body2'}>Mean Rate: {surfaceProperties[timeIndex]?.rate_weighted_mean?.toExponential(2)} per year</Typography>
      <Typography variant={'body2'}>Magnitude: {surfaceProperties[timeIndex]?.magnitude?.toFixed(1)}</Typography>
      <Typography variant={'body2'}>Area: {surfaceProperties[timeIndex]?.area} km²</Typography>
      <Typography variant={'body2'}>Length: {surfaceProperties[timeIndex]?.length} km</Typography>
    </Box>
  );
};

export const TimeDimensionInfoBox = styled(InfoBox)({
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

export default TimeDimensionInfoBox;
