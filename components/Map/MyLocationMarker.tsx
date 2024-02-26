import React, { FC, useEffect, useState } from 'react'
import { Circle, Marker, Popup, useMap, useMapEvents, } from 'react-leaflet'
import L, { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Fab } from '@mui/material';
import { LocationModel } from '@/utils/Store/Models/Location/LocationModel';
import { useDeviceOrientation } from '../../utils/Hooks/useDeviceOrientation';
import { flyToLocation } from './FlyToLocation';


export const MyLocationMarker: FC<{ position: LocationModel, accuracy: number }> = ({
    position,
    accuracy
}) => {
    const [isTracking, setIsTracking] = useState(false)
    const map = useMap()

    useEffect(() => {
        if (isTracking) {
            flyToLocation(map, position.lat, position.lng)
        }
    }, [position, isTracking])

    const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation();


    const iconHTML = renderToStaticMarkup(
        <div>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
    const customMarkerIcon = divIcon({
        html: iconHTML,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });

    return position === null ? null : (
        <>
            {/* @ts-ignore */}
            <Marker position={position} icon={customMarkerIcon}>
                {/* @ts-ignore */}
                <Circle center={position} radius={accuracy < 10 ? 10 : accuracy} ></Circle>
                <Popup>You are here</Popup>
            </Marker>
            <Fab
                onClick={() => setIsTracking(!isTracking)}
                sx={{
                    position: 'absolute', right: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                }} >
                <MyLocationIcon color={isTracking ? 'success' : 'inherit'} />
            </Fab>
        </>


    )
}

