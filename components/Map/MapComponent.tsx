'use client'

import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';

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
                        <Fab onClick={() => getMyLocation()}
                            sx={{
                                position: 'absolute', right: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                            }} >
                            <MyLocationIcon />
                        </Fab>
                        <Fab onClick={() => handleAddDraggableMarkers('Stalp')}
                            sx={{
                                position: 'absolute', right: 0, bottom: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                            }}>
                            <svg fill="#b22a00" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </Fab>
                        <Fab onClick={() => handleAddDraggableMarkers('Lampa')}
                            sx={{
                                position: 'absolute', right: 0, bottom: 80, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
                            }}>
                            <svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" >
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="drop" fill="#009688" transform="translate(32.000000, 42.666667)">
                                        <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </Fab>

                        <MyLocationMarker position={currentLocation} />
                        {/* {
                            markers.length > 0 && markers?.map((item) => {
                                return (
                                    <Box key={item} >
                                        <DraggableMarker item={item} currentLocation={currentLocation} />
                                    </Box>
                                )
                            })
                        } */}
                        <StreetMarkers />
                        <DrawerDialog />
                    </MapContainer>
                )
            }

        </Box>
    )
}

export default MapComponent