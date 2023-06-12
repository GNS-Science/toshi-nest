/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import 'leaflet-timedimension';
import { TileLayer, GeoJSON, LayersControl, Pane, LayerGroup, useMapEvents } from 'react-leaflet';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { LeafletLayersProps } from './LeafletMap.types';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css';
import TimeDimensionLayer from './TimeDimensionLayer';
const { BaseLayer } = LayersControl;

const BaseLayerOptions: React.FC = () => {
  return (
    <>
      <BaseLayer name="CartoDB: VoyagerLabelsUnder" checked={true}>
        <LayerGroup>
          <TileLayer
            url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={20}
          />
        </LayerGroup>
      </BaseLayer>

      <BaseLayer name="Esri: WorldGrayCanvas">
        <TileLayer
          url={'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'}
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          maxZoom={16}
        />
      </BaseLayer>

      <BaseLayer name="Ocean Basemap">
        <LayerGroup>
          <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'} attribution="&copy; Ocean Basemap, image service by ArcGIS" />
          <TileLayer url={'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}'} />
        </LayerGroup>
      </BaseLayer>

      <BaseLayer name="Esri: WorldImagery">
        <TileLayer
          url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          // maxZoom={13}
        />
      </BaseLayer>
    </>
  );
};

const BaseLayerOverlayOptions: React.FC = () => {
  return (
    <Pane name="Overlay" style={{ zIndex: 499 }}>
      <LayersControl.Overlay name="Place names">
        <TileLayer
          url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/text@GoogleMapsCompatible/{z}/{x}/{y}.png'}
          tms={true}
          // attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Transport">
        <TileLayer
          url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/transport@g/{z}/{x}/{y}.png'}
          tms={true}
          // attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Water">
        <TileLayer
          url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/water@g/{z}/{x}/{y}.png'}
          tms={true}
          // attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Contours">
        <TileLayer
          url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/contours@g/{z}/{x}/{y}.png'}
          tms={true}
          // attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Urban">
        <TileLayer
          url={'https://maps.scinfo.org.nz/mapcache/pwms/tms/1.0.0/urban@g/{z}/{x}/{y}.png'}
          tms={true}
          // attribution="&copy; Landcare Research NZ Limited 2009-2022. Contains data sourced from LINZ. Crown Copyright Reserved."
        />
      </LayersControl.Overlay>
    </Pane>
  );
};

function LeafletLayers({ style, geoJsonData, overlay, setFullscreen, onEachFeature, zoomLevel, setZoomLevel, timeDimensionLayerProps }: LeafletLayersProps) {
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  const parseGeoJson = (data: string): GeoJsonObject => {
    return JSON.parse(data) as GeoJsonObject;
  };

  return (
    <>
      <Fullscreen
        eventHandlers={{
          enterFullscreen: () => setFullscreen(true),
          exitFullscreen: () => setFullscreen(false),
        }}
        forcePseudoFullscreen={true}
      />

      <LayersControl>
        <BaseLayerOptions />
        {overlay && <BaseLayerOverlayOptions />}
      </LayersControl>

      {geoJsonData.length &&
        geoJsonData.map((data, index) => {
          return (
            <GeoJSON
              key={`geojson-layer-${index}-${Math.random()}`}
              data={parseGeoJson(data)}
              onEachFeature={onEachFeature}
              style={(feature) => {
                return (
                  style || {
                    stroke: feature?.properties['stroke'] || feature?.properties['stroke-color'],
                    color: feature?.properties['stroke'] || feature?.properties['stroke-color'] || feature?.properties['fill'] || feature?.properties['fill-color'],
                    weight: zoomLevel / 3,
                    opacity: feature?.properties['stroke-opacity'],
                    fillOpacity: feature?.properties['fill-opacity'],
                  }
                );
              }}
            />
          );
        })}

      {timeDimensionLayerProps && <TimeDimensionLayer {...timeDimensionLayerProps} />}
    </>
  );
}

export default LeafletLayers;
