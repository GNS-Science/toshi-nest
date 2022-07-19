export interface HazardUncertaintyChartProps {
  scaleType: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor?: string;
  backgroundColor?: string;
  numTickX?: number;
  numTickY?: number;
  width: number;
  curves: HazardUncertaintyChartData;
  tooltip?: boolean;
  crosshair?: boolean;
  heading?: string;
  subHeading?: string;
  parentRef?: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent?: (state: any) => void;
}

export interface HazardUncertaintyChart {
  strokeSize?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: string;
  data: UncertaintyDatum[];
}

export type HazardUncertaintyChartCurveGroup = Record<string, HazardUncertaintyChart>;

export type HazardUncertaintyChartData = Record<string, HazardUncertaintyChartCurveGroup>;

export type UncertaintyDatum = number[];
