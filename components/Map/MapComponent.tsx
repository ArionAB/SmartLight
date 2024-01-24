'use client'

import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, SVGOverlay } from 'react-leaflet';

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box, Button, Fab, Typography } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { DraggableMarker } from './DraggableMarker';
import { MyLocationMarker } from './MyLocationMarker';
import { StreetMarkers } from './StreetMarkers';

interface MarkerData {
    coordinates: [number, number];
    title: string;
}
const MapComponent: FC = () => {
    const [currentLocation, setCurrentLocation] = useState([46.0685312, 23.5569152]);
    const [markers, setMarkers] = useState<any[]>([])


    const getMyLocation = () => {
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000, // 5 seconds
                maximumAge: 0, // Do not use a cached position
            };

            const success = (position: any) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation([latitude, longitude]);
            };

            const error = (err: any) => {
                console.error('Error getting location:', err);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleAddDraggableMarkers = () => {
        let markersArr: any = [...markers]
        markersArr.push(markersArr.length + 1)
        setMarkers(markersArr)
    }
    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: "flex-end" }}>
            <Fab onClick={() => getMyLocation()}
                sx={{
                    position: 'absolute', right: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                }} >
                <MyLocationIcon />
            </Fab>
            <Fab onClick={() => handleAddDraggableMarkers()}
                sx={{
                    position: 'absolute', right: 0, bottom: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                }}>
                <AddLocationIcon
                />
            </Fab>


            <MapContainer center={currentLocation} zoom={13}
                style={{
                    height: "calc(100vh - 64px)",
                    width: "calc(100vw - 350px)",
                }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyLocationMarker position={currentLocation} />
                {
                    markers.length > 0 && markers?.map((item) => {
                        return (
                            <Box key={item} >
                                <DraggableMarker item={item} />
                            </Box>
                        )
                    })
                }
                <StreetMarkers />

            </MapContainer>
        </Box>
    )
}

export default MapComponent