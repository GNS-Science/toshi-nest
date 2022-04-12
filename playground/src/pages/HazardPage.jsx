import React from 'react';
import { HazardCurves, ResponsiveHazardCurves } from '../component-lib';

import { hazardChartsData } from '../constants/hazardChartsData';

export const getHazardTableOptions = (hazardChartsData) => {
  const rows = hazardChartsData.node.rows;

  const forecastTimes = new Set();
  const bgSeismicity = new Set();
  const pga = new Set();
  const gmpe = new Set();
  const locations = new Set();

  rows?.map((row) => {
    if (row) {
      row[0] !== null && forecastTimes.add(row[0]);
      row[1] !== null && bgSeismicity.add(row[1]);
      row[2] !== null && pga.add(row[2] === '0.0' ? 'PGA' : row[2]);
      row[3] !== null && gmpe.add(row[3]);
      row[4] !== null && locations.add(row[4]);
    }
  });

  const pgaArray = Array.from(pga);
  const pgaWithSeconds = [];
  pgaArray.map((value) => {
    value === 'PGA' ? pgaWithSeconds.push('PGA') : pgaWithSeconds.push(`${value}s`);
  });

  return {
    forecastTimes: Array.from(forecastTimes),
    backgroundSeismicity: Array.from(bgSeismicity),
    PGA: pgaWithSeconds,
    gmpe: Array.from(gmpe),
    locations: Array.from(locations),
  };
};

export const filterMultipleCurves = (pgaValues, data, location, forecastTime, gmpe, backgroundSeismicity) => {
  const filteredCurves = {};

  pgaValues.map((pgaValue) => {
    const pga = pgaValue === 'PGA' ? '0.0' : pgaValue;
    const curve = filterData(data, location, pga, forecastTime, gmpe, backgroundSeismicity);
    filteredCurves[pgaValue] = curve;
  });

  return filteredCurves;
};

export const filterData = (data, location, pgaValue, forecastTime, gmpe, backgroundSeismisity) => {
  const xy = [];
  const rows = data?.node?.rows;
  const pga = pgaValue.replace('s', '');

  const filtered = rows?.filter((item) => {
    if (item && item[0] === forecastTime && item[1] === backgroundSeismisity && item[2] === pga && item[3] === gmpe && item[4] === location) return true;
  });

  filtered?.map((item) => {
    if (item) {
      const slicedArray = item.slice(7, 9);
      const object = {
        x: parseFloat(slicedArray[0]),
        y: parseFloat(slicedArray[1]),
      };
      xy.push(object);
    }
  });

  return xy;
};

const HazardPage = () => {
  const hazardPageOption = getHazardTableOptions(hazardChartsData);
  const colorsArray = ['#000000', '#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];

  const curves = filterMultipleCurves(
    ['PGA', '0.1'],
    hazardChartsData,
    hazardPageOption.locations[0],
    hazardPageOption.forecastTimes[0],
    hazardPageOption.gmpe[0],
    hazardPageOption.backgroundSeismicity[0],
  );

  const scalesConfig = {
    x: { type: 'log', domain: [1e-3, 10] },
    y: { type: 'log', domain: [1e-5, 1] },
  };

  const colors = {
    PGA: '#000000',
    0.1: '#FE1100',
  };

  return (
    <>
      <p>Hazard Page</p>
      <div style={{ border: 'solid black 1px', width: '100vw' }}>
        <HazardCurves curves={curves} width={500} scalesConfig={scalesConfig} colors={colors} heading={'Static Hazard Curves'} subHeading={'subHeading'} gridNumTicks={5} />
      </div>
      <div style={{ border: 'solid black 1px', width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50vw', display: 'flex', justifyContent: 'center' }}>
          <ResponsiveHazardCurves curves={curves} scalesConfig={scalesConfig} colors={colors} heading={'Responsive Hazard Curves'} subHeading={'subHeading'} gridNumTicks={5} />
        </div>
      </div>
    </>
  );
};

export default HazardPage;
