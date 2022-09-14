import { CurveGroup, Datum } from './groupCurveChart.types';

export const getAreaData = (curveGroup: CurveGroup, scaleType: string) => {
  const area: number[][] = [];

  curveGroup['lower1'].data.map((point, index) => {
    const areaPoint: number[] = [];
    areaPoint.push(point[0]);
    areaPoint.push(point[1]);
    areaPoint.push(curveGroup['upper1'].data[index][1]);
    scaleType === 'log' ? !areaPoint.includes(0) && area.push(areaPoint) : area.push(areaPoint);
  });

  return area;
};

export const getSortedMeanCurves = (curveGroups: Record<string, CurveGroup>): Datum[] => {
  const meanCurves: number[][] = [];

  Object.keys(curveGroups).forEach((key) => {
    curveGroups[key]['mean'].data.forEach((point) => {
      meanCurves.push(point);
    });
  });

  return meanCurves.sort((a, b) => {
    return a[0] - b[0];
  });
};
