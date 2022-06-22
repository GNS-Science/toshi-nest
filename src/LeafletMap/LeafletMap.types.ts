import { LatLngExpression } from 'leaflet';

export interface LeafletMapProps {
  rupturesData: string;
  locationsData: string;
  nzCentre: LatLngExpression;
  zoom: number;
  showLocation: boolean;
  height: string;
  width: string;
  setFullscreen: (setFullscreen: boolean) => null;
}
