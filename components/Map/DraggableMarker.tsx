'use client'

import { Add } from "@mui/icons-material"
import { Box, Button, ButtonGroup, Dialog, Typography } from "@mui/material"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { AddMarker } from "../Drawer/AddMarker"
import { Enums } from "@/utils/Store/Models/Database"
import { PositionModel } from "@/utils/Store/Models/Markers/PositionModel"
import { divIcon } from 'leaflet';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { renderToStaticMarkup } from 'react-dom/server';
import LightIcon from '@mui/icons-material/Light';
import CellTowerIcon from '@mui/icons-material/CellTower';




export const DraggableMarker: FC<{
    item: Enums<'marker_type'>,
    currentLocation: any
}> = ({ item, currentLocation }) => {
    const [position, setPosition] = useState(currentLocation)
    const [open, setOpen] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<Enums<'marker_type'>>('Lampa')
    const markerRef = useRef(null)


    const iconHTML = renderToStaticMarkup(
        <div style={{ color: '#00897bb' }}>
            {item === 'Lampa' ? <LightIcon /> : <CellTowerIcon />}
        </div>
    );

    const customMarkerIcon = divIcon({
        html: iconHTML,
        iconSize: [24, 24],
        iconAnchor: [24, 24],
    });

    const eventHandlers = {
        dragend() {
            const marker = markerRef.current;
            //@ts-ignore
            if (marker != null && marker.getLatLng != null) {
                //@ts-ignore
                setPosition(marker.getLatLng());
            }
        },
    };

    const handleOpenDialog = (type: Enums<'marker_type'>) => {
        setSelectedMarker(type)
        setOpen(true)
    }

    useEffect(() => {
        setOpen(true)
        setSelectedMarker(item)
    }, [])

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <AddMarker position={position} selectedMarker={selectedMarker} setOpen={setOpen} />
            </Dialog>
            {/* <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                icon={customMarkerIcon}
                ref={markerRef}>
                <Popup>
                    <Typography>{`${position}`}</Typography>
                </Popup>
                 <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                    {`Stalpul ${item}`}
                </Tooltip> 
            </Marker> */}
        </>

    )
}

