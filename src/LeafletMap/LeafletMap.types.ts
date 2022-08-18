import { LatLngExpression } from 'leaflet';

export interface LeafletMapProps {
  geoJsonData: string[];
  nzCentre: LatLngExpression;
  zoom: number;
  height: string;
  width: string;
  setFullscreen: (setFullscreen: boolean) => void;
  style?: GeoJsonStyle;
}

export interface GeoJsonStyle {
  stroke: string;
  color: string;
  weight: number;
  opacity: number;
  fillOpacity: number;
}
