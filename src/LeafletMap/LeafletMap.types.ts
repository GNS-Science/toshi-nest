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
  timeDimensionGeoJsonDataGenerator?: GeoJsonGenerator<GeoJsonObject>;
  timeDimensionUnderlay?: GeoJsonObject;
  setZoomLevel: (setZoomLevel: number) => void;
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
  timeDimensionGeoJsonDataGenerator?: GeoJsonGenerator<GeoJsonObject>;
  timeDimensionUnderlay?: GeoJsonObject;
}

export interface TimeDimensionLayerProps {
  geoJsonDataGenerator: GeoJsonGenerator<GeoJsonObject>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GeoJsonGenerator<T = GeoJsonObject, TReturn = any, TNext = number> extends Iterator<T, TReturn, TNext> {
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throw?(e?: any): IteratorResult<T, TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;
}
