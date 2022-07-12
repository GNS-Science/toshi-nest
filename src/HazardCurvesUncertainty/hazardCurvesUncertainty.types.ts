export interface HazardCurvesUncertaintyProps {
  scaleType: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor: string;
  backgroundColor: string;
  numTickX: number;
  numTickY: number;
  width: number;
  curves: Record<string, number[][]>;
  area: number[][];
}
