import { XY } from './common.types';

export interface HazardCurvesResponsiveProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  heading?: string;
  subHeading?: string;
  gridNumTicks: number;
  poe: number | undefined;
}

export interface HazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  width: number;
  heading?: string;
  subHeading?: string;
  parentRef?: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent?: (state: any) => void;
  gridNumTicks: number;
  poe: number | undefined;
}

export interface HazardViewOptions {
  locations: string[];
  PGA: string[];
  forecastTimes: string[];
  gmpe: string[];
  backgroundSeismicity: string[];
}

export interface ScaleConfig {
  type: 'log' | 'linear' | 'band';
  domain: number[];
}

export interface XYChartScaleConfig {
  x: ScaleConfig;
  y: ScaleConfig;
}

export type HazardCurveColors = Record<string, string>;

export type HazardTableFilteredData = Record<string, XY[]>;

export interface HazardColorScale {
  domain: string[];
  range: string[];
}
