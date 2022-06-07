import React from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MultiSelect from '../MultiSelect';
import RangeSliderWithInputs from '../RangeSliderWithInputs/RangeSliderWithInputs';
import ControlsBar from '../common/ControlsBar';
import { LeafletRuptureSetControlsProps } from './LeafletRuptureSetControls.types';

const StyledCard = styled(Card)({
  margin: '50px',
  padding: 'px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  border: 'none',
  boxShadow: 'none',
});

const LeafletRuptureSetControls: React.FC<LeafletRuptureSetControlsProps> = ({
  name,
  options,
  selection,
  setSelection,
  magnitude,
  setMagnitude,
  ruptureRate,
  setRuptureRate,
  magnitudeInputProps,
  ruptureRateInputProps,
}: LeafletRuptureSetControlsProps) => {
  function valuetext(value: number) {
    return `1e${value}/yr`;
  }

  return (
    <StyledCard raised={false}>
      <ControlsBar>
        <MultiSelect options={options} selection={selection} setSelection={setSelection} name={name} />
        <RangeSliderWithInputs label={'Magnitude'} inputProps={magnitudeInputProps} valuesRange={magnitude} setValues={setMagnitude} />
        <RangeSliderWithInputs label={'Rupture Rate'} inputProps={ruptureRateInputProps} valuesRange={ruptureRate} setValues={setRuptureRate} valueLabelFormat={valuetext} />
      </ControlsBar>
    </StyledCard>
  );
};

export default LeafletRuptureSetControls;
