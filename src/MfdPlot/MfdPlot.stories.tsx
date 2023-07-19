import React, { useState } from 'react';
import { MfdPlot } from './MfdPlot';
import { Datum } from './MfdPlot.types';
import { ComponentMeta } from '@storybook/react';
import ColorBar from '../ColorBar/ColorBar';
import { LatLngExpression } from 'leaflet';
import LeafletMap from '../LeafletMap';
import geojsonTestDataPGA from '../__tests__/testData/geoJson/geojsonTestDataPGA';
import { Box, Typography } from '@mui/material';

export default {
  title: 'Charts/MFDPlot',
  component: MfdPlot,
} as ComponentMeta<typeof MfdPlot>;

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomTooltip = (tooltipData: any) => {
  const datum = tooltipData?.nearestDatum?.datum as Datum;
  console.log(tooltipData);
  return (
    <>
      <Typography>Rate: {datum?.rate?.toExponential(2)}</Typography>
      <Typography>Cumulative Rate: {datum?.cumulative_rate?.toExponential(2)}/yr</Typography>
      <Typography>Magnitude: {datum?.bin_center.toPrecision(3)}/yr</Typography>
    </>
  );
};

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

export const Primary = () => {
  return (
    <MfdPlot
      data={adjustedData}
      width={width}
      height={height}
      xLabel="mag"
      yLabel="rate"
      yLabelOffset={35}
      xLabelOffset={5}
      header="das telefone"
      xScaleDomain={[6.8, 10]}
      yScaleDomain={[1e-6, 1e-1]}
      lineColours={['blue', 'red']}
      legendDomain={['rate', 'cumulative rate']}
      renderCustomTooltip={renderCustomTooltip}
    />
  );
};

export const HazardMapsLog = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const colorsLog = ['#000004', '#000004', '#07051b', '#1f0c48', '#400a67', '#69166e', '#87216b', '#a32c61', '#c83f4b', '#e05536', '#f1711f', '#fb9d07', '#fac026'];
  const valuesLog = ['1.0e-7', '2.0e-7', '5.0e-7', '1.0e-6', '2.0e-6', '5.0e-6', '1.0e-5', '2.0e-5', '5.0e-5', '1.0e-4', '2.0e-4', '5.0e-4', '1.0e-3'];

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const geoJson = geojsonTestDataPGA;

  return (
    <div style={{ height: '700px' }}>
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={geoJson}
        height={'80vh'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />
      <Box
        style={
          !fullscreen
            ? {
                backgroundColor: '#ffffff',
                position: 'relative',
                zIndex: 119700,
                top: '-435px',
                left: 'calc(100% - 396px)',
                width: '395px',
                borderRadius: '4px',
                borderWidth: '1px',
                border: '2px solid rgba(0,0,0,0.2)',
                backgroundClip: 'padding-box',
              }
            : {
                backgroundColor: '#ffffff',
                position: 'absolute',
                zIndex: 119700,
                bottom: '20px',
                left: 'calc(100% - 396px)',
                width: '395px',
                borderRadius: '4px',
                borderWidth: '1px',
                border: '2px solid rgba(0,0,0,0.2)',
                backgroundClip: 'padding-box',
              }
        }
      >
        <MfdPlot
          data={adjustedData}
          width={width}
          height={height}
          xLabel="mag"
          yLabel="rate"
          yLabelOffset={35}
          xLabelOffset={5}
          header="Magnitude Frequency Distribution"
          xScaleDomain={[6.8, 9.6]}
          yScaleDomain={[1e-7, 1e-1]}
          lineColours={['blue', 'red']}
          legendDomain={['rate', 'cumulative rate']}
          renderCustomTooltip={renderCustomTooltip}
        />
        <ColorBar width={360} height={35} colors={colorsLog} tickValues={valuesLog} heading={'Participation rate'} linear={false} />
      </Box>
    </div>
  );
};
