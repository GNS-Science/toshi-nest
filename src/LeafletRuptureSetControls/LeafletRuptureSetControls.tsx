import React, { useState } from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectControl from '../common/SelectControl';
import RangeSliderWithInputs from '../common/RangeSliderWithInputs';
import ControlsBar from '../common/ControlsBar';

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

const LeafletRuptureSetControls: React.FC = () => {
  const [sampleSelection, setSampleSelection] = useState('Wellington');
  const [magnitude, setMagnitude] = useState<number[]>([5, 10]);
  const [ruptureRate, setRuptureRate] = useState<number[]>([-20, 1]);

  const magInputProps = {
    step: 0.1,
    min: 5,
    max: 9,
    type: 'number',
  };

  const ruptureRateInputProps = {
    step: 1,
    min: -20,
    max: 0,
    type: 'number',
  };

  function valuetext(value: number) {
    return `1e${value}/yr`;
  }

  return (
    <StyledCard raised={false}>
      <ControlsBar>
        <SelectControl options={['Wellington', 'Auckland', 'Christchurch']} selection={sampleSelection} setSelection={setSampleSelection} name={'Cities'} />
        <Typography gutterBottom>Magnitude</Typography>
        <RangeSliderWithInputs label={'Magnitude'} inputProps={magInputProps} valuesRange={magnitude} setValues={setMagnitude} />
        <Typography gutterBottom>Rupture Rate</Typography>
        <RangeSliderWithInputs label={'Rupture Rate'} inputProps={ruptureRateInputProps} valuesRange={ruptureRate} setValues={setRuptureRate} valueLabelFormat={valuetext} />
      </ControlsBar>
    </StyledCard>
  );
};

export default LeafletRuptureSetControls;
