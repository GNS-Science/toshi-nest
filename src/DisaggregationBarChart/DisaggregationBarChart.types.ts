export interface BarData {
  x: number[];
  y1: number[];
  y2: number[];
}

export type DisaggregationBarChartProps = {
  barData: BarData;
  colourArray: string[];
  width: number;
  height: number;
  events?: boolean;
  verticalMargin: number;
  xLabel: string;
  yLabel: string;
  xNumTicks?: number;
  yNumTicks?: number;
};
