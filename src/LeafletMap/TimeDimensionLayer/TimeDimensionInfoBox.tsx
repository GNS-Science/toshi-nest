import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { SurfaceProperties } from './TimeDimensionLayer.types';
// import 'leaflet/dist/leaflet.css';

export interface TimeDimensionInfoBoxProps {
  surfaceId: string;
  timeIndex: number;
  timeDimensionTotalLength: number;
  surfaceProperties: SurfaceProperties[];
}

const InfoBox = ({ surfaceId, timeIndex, timeDimensionTotalLength, surfaceProperties }: TimeDimensionInfoBoxProps) => {
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

const TimeDimensionInfoBox = styled(InfoBox)({
  position: 'absolute',
  zIndex: 100000,
  top: '-605px',
  left: 'calc(100% - 435px)',
  width: '429px',
  bottom: '55px',
  padding: '10px',
  margin: '10px',
  backgroundColor: '#fff',
  float: 'left',
  lineHeight: '26px',
  borderRadius: '4px',
  borderWidth: '1px',
  border: '2px solid rgba(0,0,0,0.2)',
  backgroundClip: 'padding-box',
});

export default TimeDimensionInfoBox;
