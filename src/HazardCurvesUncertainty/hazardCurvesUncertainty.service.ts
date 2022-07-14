import { HazardCurveUncertaintyGroup, UncertaintyDatum } from './hazardCurvesUncertainty.types';

export const getAreaData = (curveGroup: HazardCurveUncertaintyGroup) => {
  const area: number[][] = [];

  curveGroup['lower1'].data.map((point, index) => {
    const areaPoint: number[] = [];
    areaPoint.push(point[0]);
    areaPoint.push(point[1]);
    areaPoint.push(curveGroup['upper1'].data[index][1]);
    !areaPoint.includes(0) && area.push(areaPoint);
  });

  return area;
};

export const getSortedMeanCurves = (curveGroups: HazardCurveUncertaintyGroup[]): UncertaintyDatum[] => {
  const meanCurves: number[][] = [];

  curveGroups.forEach((curveGroup) => {
    curveGroup['mean'].data.forEach((point) => {
      meanCurves.push(point);
    });
  });

  return meanCurves.sort((a, b) => {
    return a[0] - b[0];
  });
};
