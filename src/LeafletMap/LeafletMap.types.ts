import { LatLngExpression } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import { Layer } from 'leaflet';
import { TimeDimensionLayerProps, TimeDimensionOptions, TimeDimensionControlOptions } from './TimeDimensionLayer';

export interface LeafletMapProps {
  geoJsonData: string[];
  nzCentre: LatLngExpression;
  zoom: number;
  height: string;
  width: string;
  fullscreen?: boolean;
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
  setZoomLevel: (setZoomLevel: number) => void;
  timeDimensionLayerProps?: TimeDimensionLayerProps;
}

export interface LeafletLayersProps {
  style?: GeoJsonStyle;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEachFeature?: (feature: Feature<Geometry, any>, layer: Layer) => void;
  geoJsonData: string[];
  overlay?: boolean;
  fullscreen?: boolean;
  setFullscreen: (setFullscreen: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (setZoomLevel: number) => void;
  timeDimensionLayerProps?: TimeDimensionLayerProps;
}

export interface GeoJsonStyle {
  stroke: string;
  color: string;
  weight: number;
  opacity: number;
  fillOpacity: number;
}
