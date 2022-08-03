import { ParentSize } from '@visx/responsive';
import React from 'react';
import GroupCurveChart from '../GroupCurveChart/GroupCurveChart';
import { GroupCurveChartData } from '../GroupCurveChart/groupCurveChart.types';

export interface GroupCurveChartResponsiveProps {
  scaleType: 'log' | 'linear';
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

const GroupCurveChartResponsive: React.FC<GroupCurveChartResponsiveProps> = ({
  scaleType,
  xLimits,
  yLimits,
  gridColor,
  backgroundColor,
  numTickX,
  numTickY,
  curves,
  tooltip,
  crosshair,
  heading,
  subHeading,
  poe,
  uncertainty,
}: GroupCurveChartResponsiveProps) => {
  return (
    <>
      <ParentSize>
        {(parent) => (
          <GroupCurveChart
            scaleType={scaleType}
            xLimits={xLimits}
            yLimits={yLimits}
            gridColor={gridColor}
            backgroundColor={backgroundColor}
            numTickX={numTickX}
            numTickY={numTickY}
            curves={curves}
            tooltip={tooltip}
            crosshair={crosshair}
            heading={heading}
            subHeading={subHeading}
            width={parent.width}
            parentRef={parent.ref}
            resizeParent={parent.resize}
            poe={poe}
            uncertainty={uncertainty}
          />
        )}
      </ParentSize>
    </>
  );
};

export default GroupCurveChartResponsive;
