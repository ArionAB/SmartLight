import React, { FC, useEffect } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L, { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Fab } from '@mui/material';
import { flyToLocation } from './FlyToLocation';

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
export const MyLocationMarker: FC<{ position: number[], getMyLocation: Function }> = ({
    position,
    getMyLocation
}) => {
    const map = useMap()

    useEffect(() => {
        flyToLocation(map, position[0], position[1])
    }, [position])


    return position === null ? null : (
        <>
            {/* @ts-ignore */}
            <Marker position={position} icon={customMarkerIcon}>
                <Popup>You are here</Popup>
            </Marker>
            <Fab onClick={() => getMyLocation()}
                sx={{
                    position: 'absolute', right: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                }} >
                <MyLocationIcon />
            </Fab>
        </>

    )
}

