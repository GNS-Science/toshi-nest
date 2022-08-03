import { ParentSize } from '@visx/responsive';
import React from 'react';
import GroupCurveChart from '../GroupCurveChart/GroupCurveChart';
import { GroupCurveChartData } from '../GroupCurveChart/groupCurveChart.types';

export interface GroupCurveChartResponsiveProps {
  scaleType: 'log' | 'linear';
  yScaleType?: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor?: string;
  backgroundColor?: string;
  numTickX?: number;
  numTickY?: number;
  curves: GroupCurveChartData;
  tooltip?: boolean;
  crosshair?: boolean;
  heading?: string;
  subHeading?: string;
  poe: number | undefined;
  uncertainty: boolean;
}

const GroupCurveChartResponsive: React.FC<GroupCurveChartResponsiveProps> = (props: GroupCurveChartResponsiveProps) => {
  return (
    <>
      <ParentSize>{(parent) => <GroupCurveChart {...props} width={parent.width} parentRef={parent.ref} resizeParent={parent.resize} />}</ParentSize>
    </>
  );
};

export default GroupCurveChartResponsive;
