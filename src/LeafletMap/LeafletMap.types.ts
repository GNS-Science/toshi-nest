import { GeoJsonObject } from 'geojson';
import { LatLngExpression } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import { Layer } from 'leaflet';

export interface LeafletMapProps {
  geoJsonData: string[];
  nzCentre: LatLngExpression;
  zoom: number;
  height: string;
  width: string;
  setFullscreen: (setFullscreen: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEachFeature?: (feature: Feature<Geometry, any>, layer: Layer) => void;
  style?: GeoJsonStyle;
  minZoom?: number;
  maxZoom?: number;
  zoomSnap?: number;
  zoomDelta?: number;
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

export type SurfaceProperties =
  | {
      rate_weighted_mean: number | null;
      area: number | null;
      length: number | null;
      magnitude: number | null;
    }
  | null
  | undefined;
