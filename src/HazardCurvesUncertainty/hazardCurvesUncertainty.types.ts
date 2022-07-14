export interface HazardCurvesUncertaintyProps {
  scaleType: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor: string;
  backgroundColor: string;
  numTickX: number;
  numTickY: number;
  width: number;
  curves: HazardCurvesUncertaintyData;
  tooltip: boolean;
  crosshair: boolean;
}

export interface HazardCurveUncertaintyCurve {
  strokeSize?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: string;
  data: UncertaintyDatum[];
}

export type HazardCurveUncertaintyGroup = Record<string, HazardCurveUncertaintyCurve>;

export type HazardCurvesUncertaintyData = HazardCurveUncertaintyGroup[];

export type UncertaintyDatum = number[];
