import { XY } from '../types/common.types';

export type SpectralAccelerationChartProps = {
  data: XY[];
  width: number;
  heading?: string;
  subHeading?: string;
  parentRef?: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent?: (state: any) => void;
};
