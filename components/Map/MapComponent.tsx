'use client'

import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import L, { Map } from "leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box, Icon } from '@mui/material';
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
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';
import { Delete, Save, SaveAlt } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { setHasInternet } from '@/utils/Store/Slices/miscSlice';

const MapComponent: FC = () => {
    const [markers, setMarkers] = useState<any[]>([])
    const [map, setMap] = useState<Map | undefined>();
    const [progress, setProgress] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(selectCurrentUser)

    const [location, accuracy, error] = useLocation(true); // Enable, Accuracy Threshold, Threshold Wait Time

    const handleAddDraggableMarkers = (marker_type: Enums<'marker_type'>) => {
        let markersArr: any = [...markers]
        markersArr.push(marker_type)
        setMarkers(markersArr)
    }
    // useEffect(() => {
    //     if (map) {

    //         // @ts-ignore
    //         const tileLayerOffline = L.tileLayer.offline(
    //             "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //             {
    //                 minZoom: 14,
    //                 maxZoom: 17
    //             }
    //         );
    //         tileLayerOffline.addTo(map);

    //         // @ts-ignore
    //         const controlSaveTiles = L.control.savetiles(tileLayerOffline, {
    //             zoomlevels: [14, 15, 16, 17], // optional zoomlevels to save, default current zoomlevels
    //             confirm(layer: any, succescallback: any) {
    //                 // eslint-disable-next-line no-alert
    //                 if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
    //                     succescallback();
    //                 }
    //             },
    //             confirmRemoval(layer: any, successCallback: any) {
    //                 // eslint-disable-next-line no-alert
    //                 if (window.confirm("Remove all the tiles?")) {
    //                     successCallback();
    //                 }
    //             },
    //             saveText:
    //                 `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12.1893L14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697C15.8232 10.7626 15.8232 11.2374 15.5303 11.5303L12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303L8.46967 11.5303C8.17678 11.2374 8.17678 10.7626 8.46967 10.4697C8.76256 10.1768 9.23744 10.1768 9.53033 10.4697L11.25 12.1893V7C11.25 6.58579 11.5858 6.25 12 6.25ZM8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z" fill="#1C274C"/>
    //                 </svg>`,

    //             rmText:
    //                 `<svg width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    //                 <title>delete [#1487]</title>
    //                 <desc>Created with Sketch.</desc>
    //                 <defs>

    //             </defs>
    //                 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    //                     <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000">
    //                         <g id="icons" transform="translate(56.000000, 160.000000)">
    //                             <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]">

    //             </path>
    //                         </g>
    //                     </g>
    //                 </g>
    //             </svg>`
    //         });

    //         controlSaveTiles.addTo(map!);

    //         let progress: number;
    //         tileLayerOffline.on("savestart", (e: any) => {
    //             progress = 0;
    //             setTotal(e._tilesforSave.length);
    //         });
    //         tileLayerOffline.on("savetileend", () => {
    //             progress += 1;
    //             setProgress(progress);
    //         });
    //     }
    // }, [map]);


    useEffect(() => {
        const handleStatusChange = () => {
            dispatch(setHasInternet(navigator.onLine))
        };

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);



    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: "flex-end" }}>
            {/* {
                location && (
                    <Box sx={{
                        display: "flex",
                        position: 'absolute',
                        background: 'red',
                        zIndex: '999',
                        top: 0,
                        right: 100
                    }}>
                        <Box>
                            Progress: {progress}
                        </Box>
                        <Box>
                            Total: {total}
                        </Box>
                    </Box>

                )
            } */}
            {
                location && (
                    //@ts-ignore
                    <MapContainer center={[location?.lat, location?.lng]}
                        zoom={13}
                        zoomControl={false}
                        //@ts-ignore
                        whenReady={(mapInstance: any) => {
                            setMap(mapInstance.target)
                        }}
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