import { Box, Grid, Input, Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface RangeSliderWithInputsProps {
  label: string;
  inputProps: InputProps;
  valuesRange: number[];
  setValues: (values: number[]) => void;
  valueLabelFormat?: (value: number) => string;
}

interface InputProps {
  step: number;
  min: number;
  max: number;
  type: string;
}

const SmallInput = styled(Input)({
  width: 42,
});

const RangeSliderWithInputs: React.FC<RangeSliderWithInputsProps> = ({ label, inputProps, valuesRange, setValues, valueLabelFormat }: RangeSliderWithInputsProps) => {
  return (
    <Box sx={{ width: 300, marginRight: 5 }}>
      <Typography gutterBottom>{label}</Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <SmallInput value={valuesRange[0]} size="small" onChange={(event) => setValues([Number(event.target.value), valuesRange[1]])} inputProps={inputProps} />
        </Grid>
        <Grid item xs>
          <Slider
            value={valuesRange}
            onChange={(event: Event, newValue: number | number[]) => setValues(newValue as number[])}
            valueLabelDisplay="auto"
            min={inputProps.min}
            max={inputProps.max}
            step={inputProps.step}
            valueLabelFormat={valueLabelFormat}
          />
        </Grid>
        <Grid item>
          <SmallInput value={valuesRange[1]} size="small" onChange={(event) => setValues([valuesRange[0], Number(event.target.value)])} inputProps={inputProps} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RangeSliderWithInputs;
