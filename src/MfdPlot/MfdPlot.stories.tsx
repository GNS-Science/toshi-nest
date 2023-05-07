import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { MfdPlot } from './MfdPlot';
import { Datum } from './MfdPlot.types';

export default {
  title: 'Charts/MFDPlot',
  component: MfdPlot,
} as ComponentMeta<typeof MfdPlot>;

export const Primary = () => {
  const data = [
    {
      bin_center: 6.85,
      rate: 0,
      cumulative_rate: 0.02597738616168499,
    },
    {
      bin_center: 6.95,
      rate: 0.0023748434614390135,
      cumulative_rate: 0.02597738616168499,
    },
    {
      bin_center: 7.05,
      rate: 0.0020230324007570744,
      cumulative_rate: 0.023602543398737907,
    },
    {
      bin_center: 7.15,
      rate: 0.0021713431924581528,
      cumulative_rate: 0.02157951146364212,
    },
    {
      bin_center: 7.25,
      rate: 0.003718152642250061,
      cumulative_rate: 0.019408168271183968,
    },
    {
      bin_center: 7.35,
      rate: 0.003084330353885889,
      cumulative_rate: 0.015690015628933907,
    },
    {
      bin_center: 7.45,
      rate: 0.0021439502015709877,
      cumulative_rate: 0.01260568480938673,
    },
    {
      bin_center: 7.55,
      rate: 0.0023531417828053236,
      cumulative_rate: 0.010461734607815742,
    },
    {
      bin_center: 7.65,
      rate: 0.001901379437185824,
      cumulative_rate: 0.008108592592179775,
    },
    {
      bin_center: 7.75,
      rate: 0.0013599272351711988,
      cumulative_rate: 0.006207212805747986,
    },
    {
      bin_center: 7.85,
      rate: 0.0014451482566073537,
      cumulative_rate: 0.004847285803407431,
    },
    {
      bin_center: 7.95,
      rate: 0.0010486601386219263,
      cumulative_rate: 0.003402137663215399,
    },
    {
      bin_center: 8.05,
      rate: 0.0007615142385475338,
      cumulative_rate: 0.0023534775245934725,
    },
    {
      bin_center: 8.149999999999999,
      rate: 0.0008378892671316862,
      cumulative_rate: 0.0015919632278382778,
    },
    {
      bin_center: 8.25,
      rate: 0.0004928703419864178,
      cumulative_rate: 0.0007540739024989307,
    },
    {
      bin_center: 8.350000000000001,
      rate: 0.00021865592862013727,
      cumulative_rate: 0.0002612035605125129,
    },
    {
      bin_center: 8.45,
      rate: 0.00004254763916833326,
      cumulative_rate: 0.00004254763916833326,
    },
    {
      bin_center: 8.55,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 8.649999999999999,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 8.75,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 8.850000000000001,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 8.95,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 9.05,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 9.149999999999999,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 9.25,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 9.350000000000001,
      rate: 0,
      cumulative_rate: 0,
    },
    {
      bin_center: 9.45,
      rate: 0,
      cumulative_rate: 0,
    },
  ];

  const adjustedData: Datum[] = data.map((d) => {
    if (d.rate === 0) {
      return {
        ...d,
        rate: 1e-20,
      };
    }
    if (d.cumulative_rate === 0) {
      return {
        ...d,
        cumulative_rate: 1e-20,
      };
    }
    return d;
  });

  const width = 430;
  const height = 300;
  return <MfdPlot data={adjustedData} width={width} height={height} xLabel="mag" yLabel="rate" yLabelOffset={35} xLabelOffset={5} header="das telefone" />;
};
