import { LatLngExpression } from 'leaflet';

export interface LeafletMapProps {
  rupturesData: string;
  locationsData: string;
  nzCentre: LatLngExpression;
  zoom: number;
  providerUrl: string;
  showLocation: boolean;
}
