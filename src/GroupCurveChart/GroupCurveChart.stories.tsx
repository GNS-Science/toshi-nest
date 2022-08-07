import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import GroupCurveChart from './GroupCurveChart';
import { curveGroup2, curveGroup1 } from '../__tests__/testData/uncertaintyTestData';
import spectralAccelUncertaintyTestData from '../__tests__/testData/spectralAccelUncertaintyTestData';

export default {
  title: 'Charts/GroupCurveChart',
  component: GroupCurveChart,
} as ComponentMeta<typeof GroupCurveChart>;

const Template: ComponentStory<typeof GroupCurveChart> = (args) => <GroupCurveChart {...args} />;

export const Primary = Template.bind({});
export const Tooltip = Template.bind({});
export const Crosshair = Template.bind({});
export const TooltipWithCrosshair = Template.bind({});
export const UncertaintyFalse = Template.bind({});
export const SpectralAccelUncertaintyTrue = Template.bind({});
export const SpectralAccelUncertaintyFalse = Template.bind({});

Primary.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  xLabel: 'Acceleration(g)',
  yLabel: 'Annual Probability of Exceedance',
  gridColor: '#efefef',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: false,
  crosshair: false,
  heading: 'Group Curve Chart for Hazard',
  subHeading: 'WLG 250',
  poe: 0.02,
  uncertainty: true,
};

Tooltip.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  xLabel: 'Acceleration(g)',
  yLabel: 'Annual Probability of Exceedance',
  gridColor: '#efefef',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: true,
  crosshair: false,
  heading: 'Hazard Group Curve Chart with Tooltip',
  subHeading: 'WLG 250',
  poe: 0.02,
  uncertainty: true,
};

Crosshair.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  xLabel: 'Acceleration(g)',
  yLabel: 'Annual Probability of Exceedance',
  gridColor: '#efefef',
  backgroundColor: '#f3f6f4',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: false,
  crosshair: true,
  heading: 'Hazard Group Curve Chart with Crosshair',
  subHeading: 'WLG 250',
  poe: 0.02,
  uncertainty: true,
};

TooltipWithCrosshair.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  xLabel: 'Acceleration(g)',
  yLabel: 'Annual Probability of Exceedance',
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: true,
  crosshair: true,
  heading: 'Hazard Group Curve Chart with Crosshair + Tooltip',
  subHeading: 'WLG 250',
  poe: 0.02,
  uncertainty: true,
};

UncertaintyFalse.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  xLabel: 'Acceleration(g)',
  yLabel: 'Annual Probability of Exceedance',
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: true,
  crosshair: true,
  heading: 'Hazard Group Curve Chart without Uncertainty',
  subHeading: 'WLG 250',
  poe: 0.02,
  uncertainty: false,
};

SpectralAccelUncertaintyTrue.args = {
  scaleType: 'linear',
  yScaleType: 'linear',
  xLabel: 'Period [s]',
  yLabel: 'Shaking Intensity [g]',
  xLimits: [-1, 6],
  yLimits: [0, 4],
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: spectralAccelUncertaintyTestData,
  tooltip: true,
  crosshair: true,
  heading: 'Spectra with Uncertainty',
  subHeading: 'WLG 400m/s',
  poe: undefined,
  uncertainty: true,
};

SpectralAccelUncertaintyFalse.args = {
  scaleType: 'linear',
  yScaleType: 'linear',
  xLabel: 'Period [s]',
  yLabel: 'Shaking Intensity [g]',
  xLimits: [-1, 6],
  yLimits: [0, 4],
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  width: 600,
  curves: spectralAccelUncertaintyTestData,
  tooltip: true,
  crosshair: true,
  heading: 'Sepectra without Uncertainty',
  subHeading: 'WLG 400m/s',
  poe: undefined,
  uncertainty: false,
};
