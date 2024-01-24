'use client'

import { Add } from "@mui/icons-material"
import { Box, Button, ButtonGroup, Dialog, Typography } from "@mui/material"
import { FC, useCallback, useMemo, useRef, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { AddMarker } from "../Drawer/AddMarker"
import { Enums } from "@/utils/Store/Models/Database"
import { PositionModel } from "@/utils/Store/Models/Markers/PositionModel"



export const DraggableMarker = ({ item, currentLocation }: any) => {
    const [position, setPosition] = useState(currentLocation)
    const [open, setOpen] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<Enums<'marker_type'>>('Lampa')
    const markerRef = useRef(null)
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
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <AddMarker position={position} selectedMarker={selectedMarker} setOpen={setOpen} />
            </Dialog>
            <Marker
                //@ts-ignore 
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup >
                    <Typography>{`${position}`}</Typography>
                    <ButtonGroup fullWidth sx={{ gap: '10px' }}>
                        <Button onClick={() => handleOpenDialog('Stalp')} variant="contained" size='small' startIcon={<Add />}>Stalp</Button>
                        <Button onClick={() => handleOpenDialog('Lampa')} variant="contained" color="success" size='small' startIcon={<Add />}>Lampa</Button>
                    </ButtonGroup>
                </Popup>
                {/* @ts-ignore */}
                <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                    {`Stalpul ${item}`}
                </Tooltip>
            </Marker>
        </>

    )
}

