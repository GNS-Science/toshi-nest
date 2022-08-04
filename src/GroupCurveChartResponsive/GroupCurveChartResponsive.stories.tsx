import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import GroupCurveChartResponsive from '.';
import { curveGroup2, curveGroup1 } from '../__tests__/testData/uncertaintyTestData';
import spectralAccelUncertaintyTestData from '../__tests__/testData/spectralAccelUncertaintyTestData';

export default {
  title: 'Charts/GroupCurveChartResponsive',
  component: GroupCurveChartResponsive,
} as ComponentMeta<typeof GroupCurveChartResponsive>;

const Template: ComponentStory<typeof GroupCurveChartResponsive> = (args) => <GroupCurveChartResponsive {...args} />;

export const Primary = Template.bind({});
export const SpectralAccelUncertaintyTrue = Template.bind({});
export const SpectralAccelUncertaintyFalse = Template.bind({});

Primary.args = {
  scaleType: 'log',
  xLimits: [1e-2, 10],
  yLimits: [1e-6, 1],
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  curves: { curveGroup1: curveGroup1, curveGroup2: curveGroup2 },
  tooltip: true,
  crosshair: true,
  heading: 'Hazard Chart with Uncertainty',
  subHeading: 'WLG 250',
  poe: 0.02,
};

SpectralAccelUncertaintyTrue.args = {
  scaleType: 'linear',
  yScaleType: 'linear',
  xLimits: [-1, 6],
  yLimits: [0, 4],
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
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
  xLimits: [-1, 6],
  yLimits: [0, 4],
  gridColor: '#efefef',
  backgroundColor: '#ffffff',
  numTickX: 5,
  numTickY: 5,
  curves: spectralAccelUncertaintyTestData,
  tooltip: true,
  crosshair: true,
  heading: 'Sepectra without Uncertainty',
  subHeading: 'WLG 400m/s',
  poe: undefined,
  uncertainty: false,
};
