import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ColorBar from './ColorBar';
import { LatLngExpression } from 'leaflet';
import LeafletMap from '../LeafletMap';
import geojsonTesetDat05 from '../__tests__/testData/geoJson/geojsonTestData0.5';

export default {
  title: 'Utils/ColorBar',
  component: ColorBar,
  subcomponents: { LeafletMap },
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

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <div style={{ height: '700px' }}>
      <LeafletMap zoom={zoom} nzCentre={nzCentre as LatLngExpression} geoJsonData={geojsonTesetDat05} height={'700px'} width={'100%'} setFullscreen={setFullscreen} />
      <ColorBar
        width={300}
        height={35}
        colors={colors}
        tickValues={values}
        style={{
          position: 'relative',
          zIndex: 10000000,
          left: 'calc(100% - 360px)',
          top: '-125px',
        }}
      />
    </div>
  );
};
