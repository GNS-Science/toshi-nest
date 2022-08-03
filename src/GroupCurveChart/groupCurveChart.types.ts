export interface GroupCurveChartProps {
  scaleType: 'log' | 'linear';
  yScaleType?: 'log' | 'linear';
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
}

export interface Curve {
  strokeSize?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: string;
  data: Datum[];
}

export type CurveGroup = Record<string, Curve>;

export type GroupCurveChartData = Record<string, CurveGroup>;

export type Datum = number[];
