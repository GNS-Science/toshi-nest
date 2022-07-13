import { HazardCurveUncertaintyGroup } from './hazardCurvesUncertainty.types';

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
