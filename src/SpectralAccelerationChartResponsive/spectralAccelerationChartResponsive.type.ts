import { XY } from '../types/common.types';

export type SpectralAccelerationChartResponsiveProps = {
  data: Record<string, XY[]>;
  colors: Record<string, string>;
  heading?: string;
  subHeading?: string;
};
