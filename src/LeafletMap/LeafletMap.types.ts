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
  timeDimensionGeoJsonData?: GeoJsonObject[];
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
}

export interface TimeDimensionLayerProps {
  geoJsonData: GeoJsonObject[];
}
