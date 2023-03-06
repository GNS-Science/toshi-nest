import { Bins } from '@visx/mock-data/lib/generators/genBins';

export type HeatmapProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
  background?: string;
  binData: Bins[];
  colours: string[];
  xAxisLabel: string;
  yAxisLabel: string;
  colourScaleLabel: string;
  colourScaleValues: string[];
  colourScaleTicks: number[];
};
