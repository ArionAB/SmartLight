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

    const calculateRotationAngle = (alpha: number) => {
        return (alpha - 90) % 360;
    };
    const rotationAngle = calculateRotationAngle(orientation?.alpha ?? 0);
    const iconHTML = renderToStaticMarkup(
        <div style={{ position: 'relative' }}>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#4285F4" style={{ transform: `rotate(${rotationAngle}deg)`, transformOrigin: 'center' }}>
                <path d="M10.9792 4.26973L4.59197 18.4636C4.10239 19.5516 3.85761 20.0955 3.9608 20.4146C4.05015 20.6908 4.2714 20.9042 4.55064 20.9836C4.87315 21.0753 5.40801 20.8112 6.47772 20.283L11.2921 17.9055C11.552 17.7771 11.682 17.713 11.8181 17.6877C11.9387 17.6653 12.0624 17.6653 12.183 17.6877C12.3192 17.713 12.4491 17.7771 12.709 17.9055L17.5234 20.283C18.5931 20.8112 19.128 21.0753 19.4505 20.9836C19.7298 20.9042 19.951 20.6908 20.0403 20.4146C20.1435 20.0955 19.8988 19.5516 19.4092 18.4636L13.0219 4.26973C12.6979 3.54967 12.5359 3.18964 12.3108 3.07837C12.1153 2.98169 11.8859 2.98169 11.6903 3.07837C11.4653 3.18964 11.3032 3.54967 10.9792 4.26973Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

