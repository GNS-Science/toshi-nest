import * as mathjs from 'mathjs';
import { RowData, FaultModelGeojsonFeature } from './faultModelTable.types';

export const generateFaultModelTable = (data: string): RowData[] => {
  const dataParsed = JSON.parse(data);
  const rows: RowData[] = [];
  dataParsed.features.map((feature: FaultModelGeojsonFeature) => {
    rows.push({
      id: feature.id,
      name: feature.properties.fault_name,
      maxMag: mathjs.round(feature.properties['magnitude.max'], 1),
      minMag: mathjs.round(feature.properties['magnitude.min'], 1),
      maxRate: Number(Number(feature.properties['annual_rate.max']).toPrecision(3)).toExponential(),
      minRate: Number(Number(feature.properties['annual_rate.min']).toPrecision(3)).toExponential(),
      slipRate: mathjs.round(feature.properties.slip_rate, 1),
    });
  });
  return rows;
};
