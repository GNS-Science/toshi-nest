export type Datum = {
  bin_center: number;
  rate: number;
  cumulative_rate: number;
};

export interface MfdPlotProps {
  data: Datum[];
  width: number;
  height: number;
  xLabel: string;
  yLabel: string;
  yScaleDomain: number[];
  xScaleDomain: number[];
  legendDomain: string[];
  lineColours: string[];
  xLabelOffset?: number;
  yLabelOffset?: number;
  labelProps?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
    fill?: string;
  };
  header?: string;
  defaultLinesVisible?: string;
}
