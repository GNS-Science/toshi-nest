import React from 'react';

import { HazardCurves, HazardCurvesResponsive, SpectralAccelerationChart, SpectralAccelerationChartResponsive } from '../component-lib';
import { hazardChartsData } from '../constants/hazardChartsData';
import { filterMultipleCurves, getHazardTableOptions, getSpectralAccelerationData } from '../service/hazardPage.service';

const HazardPage: React.FC = () => {
  const hazardPageOption = getHazardTableOptions(hazardChartsData);
  const colorsArray = ['#000000', '#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];

  const allCurves = filterMultipleCurves(
    hazardPageOption.PGA,
    hazardChartsData,
    hazardPageOption.locations[0],
    hazardPageOption.forecastTimes[0],
    hazardPageOption.gmpe[0],
    hazardPageOption.backgroundSeismicity[0],
  );

  const SAdata = getSpectralAccelerationData(hazardPageOption.PGA, 0.02, allCurves);

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
        <HazardCurves curves={curves} width={500} scalesConfig={scalesConfig} colors={colors} heading={'Static Hazard Curves'} subHeading={'subHeading'} gridNumTicks={10} poe={undefined} />
        <SpectralAccelerationChart width={500} data={SAdata} colors={{ 'WGL 250': '#213945', 'AKL 250': '#213945' }} heading={'Heading'} subHeading={'subHeading'} />
      </div>
      <div style={{ border: 'solid black 1px', width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50vw', display: 'flex', justifyContent: 'center' }}>
          <HazardCurvesResponsive curves={curves} scalesConfig={scalesConfig} colors={colors} heading={'Responsive Hazard Curves'} subHeading={'subHeading'} gridNumTicks={10} poe={0.02} />
        </div>
        <div style={{ width: '50vw', display: 'flex', justifyContent: 'center' }}>
          <SpectralAccelerationChartResponsive data={SAdata} colors={{ 'WGL 250': '#213945', 'AKL 250': '#213945' }} heading={'Spectral Acceleration Chart Responsive'} subHeading={'subHeading'} />
        </div>
      </div>
    </>
  );
};

export default HazardPage;
