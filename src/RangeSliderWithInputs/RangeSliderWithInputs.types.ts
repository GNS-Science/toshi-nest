export interface RangeSliderWithInputsProps {
  label: string;
  inputProps: InputProps;
  valuesRange: number[];
  setValues: (values: number[]) => void;
  valueLabelFormat?: (value: number) => string;
}

export interface InputProps {
  step: number;
  min: number;
  max: number;
  type: string;
}
