import { XY } from './common';

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
