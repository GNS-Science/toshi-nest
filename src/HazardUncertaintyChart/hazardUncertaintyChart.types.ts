export interface HazardUncertaintyChartProps {
  scaleType: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor: string;
  backgroundColor: string;
  numTickX: number;
  numTickY: number;
  width: number;
  curves: HazardUncertaintyChartData;
  tooltip: boolean;
  crosshair: boolean;
}

export interface HazardUncertaintyChart {
  strokeSize?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: string;
  data: UncertaintyDatum[];
}

export type HazardUncertaintyChartCurveGroup = Record<string, HazardUncertaintyChart>;

export type HazardUncertaintyChartData = HazardUncertaintyChartCurveGroup[];

export type UncertaintyDatum = number[];
