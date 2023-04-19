import { GeoJsonObject } from 'geojson';
import { LatLngExpression } from 'leaflet';

export interface LeafletMapProps {
  geoJsonData: string[];
  nzCentre: LatLngExpression;
  zoom: number;
  height: string;
  width: string;
  setFullscreen: (setFullscreen: boolean) => void;
  style?: GeoJsonStyle;
  minZoom?: number;
  maxZoom?: number;
  zoomSnap?: number;
  zoomDelta?: number;
  cov?: boolean;
  overlay?: boolean;
  zoomLevel: number;
  timeDimension?: boolean;
  timeDimensionOptions?: TimeDimensionOptions;
  timeDimensionControlOptions?: TimeDimensionControlOptions;
  timeDimensionGeoJsonData?: GeoJsonObject[];
  timeDimensionUnderlay?: GeoJsonObject;
  setZoomLevel: (setZoomLevel: number) => void;
  setTimeDimensionNeedsMore?: (setTimeDimensionNeedsMore: boolean) => void;
  setTimeDimensionHasNoMore?: (setTimeDimensionHasNoMore: boolean) => void;
  surfaceProperties?: SurfaceProperties[];
  timeDimensionTotalLength?: number;
}

export interface GeoJsonStyle {
  stroke: string;
  color: string;
  weight: number;
  opacity: number;
  fillOpacity: number;
}

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

export interface LeafletLayersProps {
  style?: GeoJsonStyle;
  geoJsonData: string[];
  overlay?: boolean;
  setFullscreen: (setFullscreen: boolean) => void;
  cov?: boolean;
  zoomLevel: number;
  setZoomLevel: (setZoomLevel: number) => void;
  timeDimension?: boolean;
  timeDimensionGeoJsonData?: GeoJsonObject[];
  timeDimensionUnderlay?: GeoJsonObject;
  setTimeDimensionHasNoMore?: (setTimeDimensionHasNoMore: boolean) => void;
  setTimeDimensionNeedsMore?: (setTimeDimensionNeedsMore: boolean) => void;
  surfaceProperties?: SurfaceProperties[];
  timeDimensionTotalLength?: number;
}

export interface TimeDimensionLayerProps {
  geoJsonData: GeoJsonObject[];
  setTimeDimensionHasNoMore: (setTimeDimensionHasNoMore: boolean) => void;
  setTimeDimensionNeedsMore: (setTimeDimensionNeedsMore: boolean) => void;
  surfaceProperties: SurfaceProperties[];
  timeDimensionTotalLength: number;
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
