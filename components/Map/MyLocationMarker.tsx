import React, { FC } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import L, { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const iconHTML = renderToStaticMarkup(
    <div style={{ color: '#004aad' }}>
        <MyLocationIcon />
    </div>
);

const customMarkerIcon = divIcon({
    html: iconHTML,
    iconSize: [0, 0],
    iconAnchor: [12, 12],
});
export const MyLocationMarker: FC<{ position: any }> = ({
    position
}) => {
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e: any) {
            map.flyTo(e.latlng, map.getZoom())
        },
    })


    return position === null ? null : (
        //@ts-ignore
        <Marker position={position} icon={customMarkerIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

