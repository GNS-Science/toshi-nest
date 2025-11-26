import { CurveGroup, Datum } from './groupCurveChart.types';

export const getAreaData = (curveGroup: CurveGroup, scaleType: string) => {
  const area: number[][] = [];

  curveGroup['lower1'].data.forEach((point, index) => {
    const areaPoint: number[] = [];
    areaPoint.push(point[0]);
    areaPoint.push(point[1]);
    areaPoint.push(curveGroup['upper1'].data[index][1]);
    if (scaleType !== 'log' || !areaPoint.includes(0)) {
      area.push(areaPoint);
    }
  });

  return area;
};

export const getSortedMeanCurves = (curveGroups: Record<string, CurveGroup>): Datum[] => {
  const meanCurves: number[][] = [];

  Object.keys(curveGroups).forEach((key) => {
    curveGroups[key]['mean'].data.forEach((point, i) => {
      const curveWithUncertainty: number[] = [];
      curveWithUncertainty.push(point[0], point[1]);
      curveWithUncertainty.push(curveGroups[key]['lower2'].data[i][1]);
      curveWithUncertainty.push(curveGroups[key]['lower1'].data[i][1]);
      curveWithUncertainty.push(curveGroups[key]['upper1'].data[i][1]);
      curveWithUncertainty.push(curveGroups[key]['upper2'].data[i][1]);
      meanCurves.push(curveWithUncertainty);
    });
  });

  return meanCurves.sort((a, b) => {
    return a[0] - b[0];
  });
};

export const removeFirstMeanPoint = (curveGroups: Record<string, CurveGroup>): Record<string, CurveGroup> => {
  Object.keys(curveGroups).forEach((key) => {
    curveGroups[key]['mean'].data.shift();
  });

  return curveGroups;
};
