'use client'

import React, { FC, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box } from '@mui/material';
import { DraggableMarker } from '../Marker/DraggableMarker';
import { MyLocationMarker } from './MyLocationMarker';
import { StreetMarkers } from '../Marker/StreetMarkers';
import { Enums } from '@/utils/Store/Models/Database';
import { DrawerDialog } from '../Drawer/DrawerDialog';
import { AddLampIcon } from '../Marker/AddLampIcon';
import { AddPoleIcon } from '../Marker/AddPoleIcon';
import useLocation from '@/utils/Hooks/useLocation';
import ZoomControl from './ZoomControl';
import { AddSensorIcon } from '../Marker/AddSensorIcon';
import withAuth from '../Auth/withAuth';
import { useAppSelector } from '@/utils/Store/hooks';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';


const MapComponent: FC = () => {
    const [markers, setMarkers] = useState<any[]>([])



    const handleAddDraggableMarkers = (marker_type: Enums<'marker_type'>) => {
        let markersArr: any = [...markers]
        markersArr.push(marker_type)
        setMarkers(markersArr)
    }

    const currentUser = useAppSelector(selectCurrentUser)
    const [location, accuracy, error] = useLocation(true); // Enable, Accuracy Threshold, Threshold Wait Time

    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: "flex-end" }}>
            {/* <Box sx={{ position: 'absolute', top: 0, right: 100, zIndex: 999, background: 'red' }}>Accuracy: {accuracy}</Box>
            <Box sx={{ position: 'absolute', top: 30, right: 100, zIndex: 999, background: 'blue' }}>lat: {location?.lat}</Box>
            <Box sx={{ position: 'absolute', top: 50, right: 100, zIndex: 999, background: 'green' }}>long: {location?.lng}</Box> */}
            {
                location && (

                    //@ts-ignore
                    <MapContainer center={[location?.lat, location?.lng]}
                        zoom={13}
                        zoomControl={false}
                        style={{
                            height: "calc(100dvh - 128px)",
                            width: "100%",
                        }}>
                        <TileLayer
                            //@ts-ignore
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {location && currentUser?.role_type !== 'Visitor' && <AddPoleIcon handleAddDraggableMarkers={handleAddDraggableMarkers} />}
                        {location && currentUser?.role_type !== 'Visitor' && <AddLampIcon handleAddDraggableMarkers={handleAddDraggableMarkers} />}
                        {location && currentUser?.role_type !== 'Visitor' && <AddSensorIcon handleAddDraggableMarkers={handleAddDraggableMarkers} />}
                        {location && (<MyLocationMarker position={location} accuracy={accuracy!} />)}
                        {
                            markers.length > 0 && markers?.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: 'none' }}>
                                        <DraggableMarker item={item} currentLocation={location} accuracy={accuracy!?.toString()} />
                                    </Box>
                                )
                            })
                        }
                        <ZoomControl />
                        <StreetMarkers />
                        <DrawerDialog />
                    </MapContainer>
                )
            }
        </Box>
    )
}

// export default withAuth(MapComponent, false)
export default MapComponent