import { ParentSize } from '@visx/responsive';
import React from 'react';
import HazardUncertaintyChart from '../HazardUncertaintyChart/HazardUncertaintyChart';
import { HazardUncertaintyChartData } from '../HazardUncertaintyChart/hazardUncertaintyChart.types';

export interface HazardUncertaintyChartResponsiveProps {
  scaleType: 'log' | 'linear';
  xLimits: number[];
  yLimits: number[];
  gridColor?: string;
  backgroundColor?: string;
  numTickX?: number;
  numTickY?: number;
  curves: HazardUncertaintyChartData;
  tooltip?: boolean;
  crosshair?: boolean;
  heading?: string;
  subHeading?: string;
  poe: number | undefined;
  uncertainty: boolean;
}

const HazardUncertaintyChartResponsive: React.FC<HazardUncertaintyChartResponsiveProps> = ({
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
}: HazardUncertaintyChartResponsiveProps) => {
  return (
    <>
      <ParentSize>
        {(parent) => (
          <HazardUncertaintyChart
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

export default HazardUncertaintyChartResponsive;
