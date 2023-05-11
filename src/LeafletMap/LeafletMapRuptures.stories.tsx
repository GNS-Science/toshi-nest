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
// import geojsonTesetDat05 from '../__tests__/testData/geoJson/geojsonTestData0.5';
// import geojsonTestDataPGA from '../__tests__/testData/geoJson/geojsonTestDataPGA';
// import geojsonTestDataCoV from '../__tests__/testData/geoJson/geojsonTestDataCoV';
import geojsonTestDataStyled from '../__tests__/testData/geoJson/geojsonTestDataStyled';
import geojsonTestDataStyledLine from '../__tests__/testData/geoJson/geojsonTestDataStyledLine';
import surfaceBaseLayer from '../__tests__/testData/geoJson/surfaces_puysegur.json';
import ruptureArray from '../__tests__/testData/geoJson/wlg_hik_10k.json';
import ruptureProperties from '../__tests__/testData/wlg_hik_10k_surface_properties.json';
import crustalFaultSurfacesList from '../__tests__/testData/geoJson/crustal_fault_surfaces_list_sample.json';

export default {
  title: 'Controls/LeafletMap/Crustal Ruptures',
  component: LeafletMap,
  subcomponents: { LeafletDrawer, SelectControl },
} as ComponentMeta<typeof LeafletMap>;

export const FaultSurfaces = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
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
      geoJsonData={geojsonTestDataStyled}
      height={'700px'}
      width={'100%'}
      onEachFeature={onEachFeature}
      setFullscreen={setFullscreen}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const FaultTracesColoredByParticipation = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
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
      geoJsonData={geojsonTestDataStyledLine}
      height={'700px'}
      width={'100%'}
      onEachFeature={onEachFeature}
      setFullscreen={setFullscreen}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const FaultSurfacesAndTraces = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const zoom = 5;
  const nzCentre = [-40.946, 174.167];

  const testData = [...geojsonTestDataStyled, geojsonTestDataStyledLine];

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
      geoJsonData={testData}
      height={'700px'}
      width={'100%'}
      onEachFeature={onEachFeature}
      setFullscreen={setFullscreen}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
    />
  );
};

export const FaultSurfacesTracesAndAnimation = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [needsMore, setNeedsMore] = useState<boolean>(false);
  const [hasNoMore, setHasNoMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [totalRuptures, setTotalRuptures] = useState<number>(10);

  const testData = [...geojsonTestDataStyled, geojsonTestDataStyledLine];

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

  return (
    <>
      <LeafletMap
        zoom={zoom}
        nzCentre={nzCentre as LatLngExpression}
        geoJsonData={testData}
        height={'700px'}
        width={'100%'}
        setFullscreen={setFullscreen}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControlOptions={timeDimensionControlOptions}
        timeDimension={true}
        timeDimensionGeoJsonData={crustalFaultSurfacesList as GeoJsonObject[]}
        // timeDimensionUnderlay={surfaceBaseLayer as GeoJsonObject}
        setTimeDimensionNeedsMore={setNeedsMore}
        setTimeDimensionHasNoMore={setHasNoMore}
        surfaceProperties={ruptureProperties || []}
        timeDimensionTotalLength={totalRuptures || 0}
      />
      <button onClick={() => setTotalRuptures(totalRuptures + 1)}>Add</button>
    </>
  );
};
