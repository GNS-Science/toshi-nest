import React from "react";
import { XY } from "../../../interfaces/common";
import { HazardTableFilteredData } from "../../../interfaces/inversionSolutions";
interface HazardCurvesProps {
    parentWidth: number;
    parentRef: HTMLDivElement | null;
    resizeParent: (state: any) => void;
    data: HazardTableFilteredData;
    POE: string;
    PGA: string[];
    PGAoptions: string[];
    POEdata: XY[];
    subHeading: string;
    location: string;
    timeSpan: string;
}
declare const HazardCurves: React.FC<HazardCurvesProps>;
export default HazardCurves;
