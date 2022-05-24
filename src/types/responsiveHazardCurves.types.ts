import { HazardTableFilteredData, XYChartScaleConfig, HazardCurveColors } from '../HazardCurves/hazardCurves.types';

export interface ResponsiveHazardCurvesProps {
  curves: HazardTableFilteredData;
  scalesConfig: XYChartScaleConfig;
  colors: HazardCurveColors;
  width: number;
  heading?: string;
  subHeading?: string;
  gridNumTicks: number;
  POE: 'None' | '2%' | '10%';
}
