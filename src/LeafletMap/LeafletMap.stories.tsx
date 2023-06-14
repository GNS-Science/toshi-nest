/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import { LatLngExpression } from 'leaflet';
import { Feature, Geometry, GeoJsonObject } from 'geojson';
import { Layer } from 'leaflet';

import SelectControl from '../SelectControl';
import LeafletMap from './LeafletMap';
import LeafletDrawer from '../LeafletDrawer';
import solvisResponse from '../__tests__/testData/leafletMapTestData';
import geojsonTesetDat05 from '../__tests__/testData/geoJson/geojsonTestData0.5';
import geojsonTestDataPGA from '../__tests__/testData/geoJson/geojsonTestDataPGA';
import geojsonTestDataCoV from '../__tests__/testData/geoJson/geojsonTestDataCoV';
import ruptureArray from '../__tests__/testData/geoJson/wlg_hik_10k.json';
import ruptureProperties from '../__tests__/testData/wlg_hik_10k_surface_properties.json';

export default {
  title: 'Controls/LeafletMap',
  component: LeafletMap,
  subcomponents: { LeafletDrawer, SelectControl },
} as ComponentMeta<typeof LeafletMap>;

export const Primary = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const rupturesData = solvisResponse.ruptures;
  const locationsData = solvisResponse.locations;
  const geoJsonData = [locationsData, rupturesData];
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    if (feature.properties?.['magnitude.min']) {
      const location = feature.properties?.['fault_name'];
      const minMag = feature.properties?.['magnitude.min'];
      const maxMag = feature.properties?.['magnitude.max'];
      const minRuptureRate = feature.properties?.['annual_rate.min'];
      const maxRuptureRate = feature.properties?.['annual_rate.max'];
      const totalRate = feature.properties?.['annual_rate.sum'];
      const popupContent = `
        <div>
          <b>${location}</b>
          <p>Min Magnitude: ${minMag.toFixed(2)}</p>
          <p>Max Magnitude: ${maxMag.toFixed(2)}</p>
          <p>Min Rupture Rate (1/yr): ${minRuptureRate.toExponential(2)}</p>
          <p>Max Rupture Rate (1/yr): ${maxRuptureRate.toExponential(2)}</p>
          <p>Total Rate (1/yr): ${totalRate.toExponential(2)}</p>
        </div>
       `;
      layer.bindPopup(popupContent);
    }
  };

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geoJsonData}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      zoomSnap={0.25}
      zoomDelta={0.25}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      onEachFeature={onEachFeature}
      style={{
        stroke: '#f21616',
        color: '#f21616',
        weight: 2,
        opacity: 0.75,
        fillOpacity: 0.6,
      }}
      overlay={false}
    />
  );
};

export const HazardMaps = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const popupContent = `
    <div>
      <p>Location: ${feature.properties?.loc[1]}, ${feature.properties?.loc[0]}</p>
      <p>Acceleration: ${Number(feature.properties.value).toFixed(2)} (g)</p>
    </div>
  `;
    layer.bindPopup(popupContent);
  };

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geojsonTesetDat05}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      onEachFeature={onEachFeature}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const HazardMapsWithCoV = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const popupContent = `
      <div>
        <p>Location: ${feature.properties?.loc[1]}, ${feature.properties?.loc[0]}</p>
        <p>CoV: ${Number(feature.properties.value).toFixed(2)}</p>
      </div>
    `;
    layer.bindPopup(popupContent);
  };

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={geojsonTestDataCoV}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      onEachFeature={onEachFeature}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const HazardMapsWithControls = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('option1(PGA)');
  const [zoomLevel, setZoomLevel] = useState<number>(5);

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const popupContent = `
      <div>
        <p>Location: ${feature.properties?.loc[1]}, ${feature.properties?.loc[0]}</p>
        <p>Acceleration: ${Number(feature.properties.value).toFixed(2)} (g)</p>
      </div>
    `;
    layer.bindPopup(popupContent);
  };

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

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  return (
    <>
      <LeafletMap
        zoom={zoom}
        geoJsonData={geoJson}
        nzCentre={nzCentre as LatLngExpression}
        onEachFeature={onEachFeature}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />
      <LeafletDrawer drawerHeight={'700px'} headerHeight={'0px'} width={'400px'} fullscreen={fullscreen} openAtRender={true}>
        <Box sx={{ width: '100%', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <SelectControl options={['option1(PGA)', 'option2(SA0.5)', 'option3(null)']} selection={selection} setSelection={setSelection} name="Options" />
        </Box>
      </LeafletDrawer>
    </>
  );
};

export const FaultModelWithTimeDimension = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);

  const totalRuptures = 88;

  const timeArray = useMemo(() => {
    return (
      totalRuptures &&
      Array(totalRuptures)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalRuptures]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);
  const timeDimensionOptions = {
    currentTime: 1,
    times: timeArray || [],
    timeInterval: 'P1M/2021-01-01T00:00:00Z/P1M',
    period: 'P1D',
  };

  const timeDimensionControlOptions = {
    displayDate: false,
    maxSpeed: 5,
    minSpeed: 1,
    playerOptions: {
      loop: true,
    },
  };

  const timeDimensionLayerProps = {
    geoJsonData: ruptureArray as GeoJsonObject[],
    setTimeDimensionNeedsMore: setNeedsMore,
    setTimeDimensionHasNoMore: setHasNoMore,
    surfaceProperties: ruptureProperties || [],
    timeDimensionTotalLength: totalRuptures || 0,
  };

  return (
    <LeafletMap
      zoom={zoom}
      nzCentre={nzCentre as LatLngExpression}
      geoJsonData={[]}
      height={'700px'}
      width={'100%'}
      setFullscreen={setFullscreen}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      timeDimensionOptions={timeDimensionOptions}
      timeDimensionControlOptions={timeDimensionControlOptions}
      timeDimension={true}
      timeDimensionLayerProps={timeDimensionLayerProps}
    />
  );
};

export const FaultModelWithTimeDimensionTest = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [totalRuptures, setTotalRuptures] = useState<number>(88);

  const timeArray = useMemo(() => {
    return (
      totalRuptures &&
      Array(totalRuptures)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalRuptures]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);
  const timeDimensionOptions = {
    currentTime: 1,
    times: timeArray || [],
    timeInterval: 'P1M/2021-01-01T00:00:00Z/P1M',
    period: 'P1D',
  };

  const timeDimensionControlOptions = {
    position: 'bottomright',
    displayDate: false,
    maxSpeed: 5,
    minSpeed: 1,
    playerOptions: {
      loop: true,
    },
  };

  const timeDimensionLayerProps = {
    geoJsonData: ruptureArray as GeoJsonObject[],
    setTimeDimensionNeedsMore: setNeedsMore,
    setTimeDimensionHasNoMore: setHasNoMore,
    surfaceProperties: ruptureProperties || [],
    timeDimensionTotalLength: totalRuptures || 0,
  };

  return (
    <>
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={[]}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControlOptions={timeDimensionControlOptions}
        timeDimension={true}
        timeDimensionLayerProps={timeDimensionLayerProps}
      />
      <button onClick={() => setTotalRuptures(totalRuptures + 1)}>Add</button>
    </>
  );
};

export const FaultModelWithTimeDimensionTest2 = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [totalRuptures, setTotalRuptures] = useState<number>(88);
  const [ruptureDataArray, setRuptureDataArray] = useState<GeoJsonObject[]>(ruptureArray as GeoJsonObject[]);

  const timeArray = useMemo(() => {
    return (
      totalRuptures &&
      Array(totalRuptures)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalRuptures]);

  const zoom = 5;
  const nzCentre = [-40.946, 174.167];
  const currentTime = new Date();
  currentTime.setUTCDate(1);
  const timeDimensionOptions = {
    currentTime: 1,
    times: timeArray || [],
    timeInterval: 'P1M/2021-01-01T00:00:00Z/P1M',
    period: 'P1D',
  };

  const timeDimensionControlOptions = {
    displayDate: false,
    maxSpeed: 5,
    minSpeed: 1,
    playerOptions: {
      loop: true,
    },
  };

  const reverseRuptureDataArray = () => {
    const reversedArray = [];
    for (let i = ruptureDataArray.length - 1; i >= 0; i--) {
      reversedArray.push(ruptureDataArray[i]);
    }
    setRuptureDataArray(reversedArray);
  };

  const timeDimensionLayerProps = {
    geoJsonData: ruptureDataArray,
    setTimeDimensionNeedsMore: setNeedsMore,
    setTimeDimensionHasNoMore: setHasNoMore,
    surfaceProperties: ruptureProperties || [],
    timeDimensionTotalLength: totalRuptures || 0,
  };

  return (
    <>
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={[]}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControlOptions={timeDimensionControlOptions}
        timeDimension={true}
        timeDimensionLayerProps={timeDimensionLayerProps}
      />
      <button onClick={() => reverseRuptureDataArray()}>reverse order</button>
    </>
  );
};
