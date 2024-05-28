export interface GroupCurveChartProps {
  spectral?: boolean;
  scaleType: 'log' | 'linear';
  yScaleType?: 'log' | 'linear';
  xLabel?: string;
  yLabel?: string;
  xLimits: number[];
  yLimits: number[];
  gridColor?: string;
  backgroundColor?: string;
  numTickX?: number;
  numTickY?: number;
  width: number;
  curves: GroupCurveChartData;
  tooltip?: boolean;
  crosshair?: boolean;
  heading?: string;
  subHeading?: string;
  parentRef?: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent?: (state: any) => void;
  poe: number | undefined;
  uncertainty: boolean;
  timePeriod: number;
}

export interface Curve {
  strokeDashArray?: string;
  strokeSize?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: string;
  data: Datum[];
}

export type CurveGroup = Record<string, Curve>;

export type GroupCurveChartData = Record<string, CurveGroup>;

export type Datum = number[];
