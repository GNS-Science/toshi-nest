export interface TimeDimensionOptions {
  timeInterval: string;
  period: string;
  currentTime: number;
  times: number[];
}

export interface TimeDimensionControlOptions {
  loopButton?: boolean;
  displayDate?: boolean;
}

export type SurfaceProperties =
  | {
      rate_weighted_mean: number | null;
      area: number | null;
      length: number | null;
      magnitude: number | null;
    }
  | null
  | undefined;

export interface TimeDimensionLayerProps {
  geoJsonData: GeoJsonObject[];
  setTimeDimensionHasNoMore: (setTimeDimensionHasNoMore: boolean) => void;
  setTimeDimensionNeedsMore: (setTimeDimensionNeedsMore: boolean) => void;
  surfaceProperties: SurfaceProperties[];
  timeDimensionTotalLength: number;
  onNewTimeIndexHandler?: (timeIndex: number) => void;
}
