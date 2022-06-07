export interface LeafletRuptureSetControlsProps {
  name: string;
  options: string[];
  selection: string[];
  setSelection: (selection: string[]) => void;
  magnitude: number[];
  setMagnitude: (magnitude: number[]) => void;
  ruptureRate: number[];
  setRuptureRate: (ruptureRate: number[]) => void;
  magnitudeInputProps: InputProps;
  ruptureRateInputProps: InputProps;
}

export interface InputProps {
  step: number;
  min: number;
  max: number;
  type: string;
}
