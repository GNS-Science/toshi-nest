import React, { useState, useMemo } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '@mui/material';

import ColorBar from './ColorBar';
import { LatLngExpression } from 'leaflet';
import LeafletMap from '../LeafletMap';
import geojsonTesetDat05 from '../__tests__/testData/geoJson/geojsonTestData0.5';
import LeafletDrawer from '../LeafletDrawer';
import SelectControl from '../SelectControl';
import geojsonTestDataPGA from '../__tests__/testData/geoJson/geojsonTestDataPGA';

export default {
  title: 'Utils/ColorBar',
  component: ColorBar,
  subcomponents: { LeafletMap, LeafletDrawer, SelectControl },
} as ComponentMeta<typeof ColorBar>;

const Template: ComponentStory<typeof ColorBar> = (args) => <ColorBar {...args} />;

export const Primary = Template.bind({});

const colors = ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'];
const values = [0, 0.5, 1.0, 1.5];

Primary.args = {
  width: 600,
  height: 100,
  colors: colors,
  tickValues: values,
};

export const HazardMaps = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('option1(PGA)');

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const geoJson = useMemo<string[]>(() => {
    switch (selection) {
      case 'option1(PGA)':
        return geojsonTestDataPGA;

      case 'option2(SA0.5)':
        return geojsonTesetDat05;

      default:
        return [];
    }
  }, [selection]);

  return (
    <div style={{ height: '700px' }}>
      <LeafletMap zoom={zoom} nzCentre={nzCentre as LatLngExpression} geoJsonData={geoJson} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />
      <ColorBar
        width={269}
        height={35}
        colors={colors}
        tickValues={values}
        heading={'Vs30 = 400m/s, PGA 10% in 50 years'}
        style={{
          position: 'relative',
          zIndex: 1199,
          left: 'calc(100% - 312px)',
          top: '-115px',
        }}
      />
      <LeafletDrawer drawerHeight={'700px'} headerHeight={'0px'} width={'400px'} fullscreen={fullscreen}>
        <Box sx={{ width: '100%', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <SelectControl options={['option1(PGA)', 'option2(SA0.5)', 'option3(null)']} selection={selection} setSelection={setSelection} name="Options" />
        </Box>
      </LeafletDrawer>
    </div>
  );
};
