'use client'

import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box, Fab } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { DraggableMarker } from './DraggableMarker';
import { MyLocationMarker } from './MyLocationMarker';
import { StreetMarkers } from './StreetMarkers';
import LightIcon from '@mui/icons-material/Light';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { Enums } from '@/utils/Store/Models/Database';
import { DrawerDialog } from '../Drawer/DrawerDialog';
import { flyToLocation } from './FlyToLocation';
import { AddLampIcon } from './AddLampIcon';
import { AddPoleIcon } from './AddPoleIcon';


const MapComponent: FC = () => {
    const [currentLocation, setCurrentLocation] = useState<any>([]);
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

    useEffect(() => {
        getMyLocation();
    }, [])

    const handleAddDraggableMarkers = (marker_type: Enums<'marker_type'>) => {
        let markersArr: any = [...markers]
        markersArr.push(marker_type)
        setMarkers(markersArr)
    }

    // useEffect(() => {
    //     window.addEventListener('deviceorientation', handleOrientation);

    //     return () => {
    //         window.removeEventListener('deviceorientation', handleOrientation);
    //     };
    // }, []);

    // const handleOrientation = (event: any) => {
    //     console.log(event)

    //     console.log(`Alpha: ${event.alpha}`);
    //     console.log(`Beta: ${event.beta}`);
    //     console.log(`Gamma: ${event.gamma}`);
    // };

    // useEffect(() => {
    //     setCurrentLocation([coordinates.lat, coordinates.lng])
    // }, [coordinates])


    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: "flex-end" }}>
            {
                currentLocation.length > 0 && (
                    //@ts-ignore
                    <MapContainer center={currentLocation} zoom={13}
                        style={{
                            height: "calc(100dvh - 64px)",
                            width: "100%",
                        }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <AddPoleIcon getMyLocation={getMyLocation} position={currentLocation} handleAddDraggableMarkers={handleAddDraggableMarkers} />
                        <AddLampIcon getMyLocation={getMyLocation} position={currentLocation} handleAddDraggableMarkers={handleAddDraggableMarkers} />
                        <MyLocationMarker position={currentLocation} getMyLocation={getMyLocation} />
                        {
                            markers.length > 0 && markers?.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: 'none' }}>
                                        <DraggableMarker item={item} currentLocation={currentLocation} />
                                    </Box>
                                )
                            })
                        }
                        <StreetMarkers />
                        <DrawerDialog />
                    </MapContainer>
                )
            }

        </Box>
    )
}

export default MapComponent