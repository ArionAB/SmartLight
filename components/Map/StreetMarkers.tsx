import { Tables } from '@/utils/Store/Models/Database'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel'
import { selectFocusedProject, selectProjectItems } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Dialog, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import LightIcon from '@mui/icons-material/Light';
import CellTowerIcon from '@mui/icons-material/CellTower';
import InfoIcon from '@mui/icons-material/Info';
import { StreetMarkerDetails } from './StreetMarkerDetails'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'

export const StreetMarkers = () => {
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const projectItems = useAppSelector(selectProjectItems)
    const focusedProject = useAppSelector(selectFocusedProject)
    console.log('focusedProject', focusedProject)



    const lampHTML = renderToStaticMarkup(
        <div style={{ color: '#19857b', }}>
            <LightIcon />
        </div>
    );
    const poleHTML = renderToStaticMarkup(
        <div style={{ color: '#ff1744' }}>
            <CellTowerIcon />
        </div>
    );

    const customLampIcon = divIcon({
        html: lampHTML,
        iconSize: [24, 24],
        iconAnchor: [24, 24],
    });
    const customPoleIcon = divIcon({
        html: poleHTML,
        iconSize: [24, 24],
        iconAnchor: [24, 24],
    });

    const handleOpenDialog = (marker: Tables<'markers'>) => {
        setOpen(true),
            setSelectedMarker(marker)
    }

    const filteredProjects = () => {
        if (focusedProject) {
            return projectItems.filter((project) => project.id === focusedProject.id)
        } else return projectItems
    }

    console.log(filteredProjects())
    return (
        <>
            {
                filteredProjects()?.map((item: ProjectModel) => {
                    return item.strazi?.map((street: StreetModel) => {
                        return street.markers?.map((marker: Tables<'markers'>) => {
                            return (
                                <Marker
                                    key={marker.id}
                                    position={[Number(marker.latitude), Number(marker.longitude)]}
                                    //@ts-ignore
                                    icon={marker.marker_type === 'Lampa' ? customLampIcon : customPoleIcon}
                                >
                                    <Popup>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography>{marker.number}</Typography>
                                            <IconButton onClick={() => handleOpenDialog(marker)}>
                                                <InfoIcon color='primary' />
                                            </IconButton>
                                        </Box>

                                    </Popup>

                                    {/* @ts-ignore */}
                                    <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                        {marker.number}
                                        {/* <IconButton edge="end" aria-label="delete"> */}
                                        {/* {marker.marker_type === 'Lampa' ? <LightIcon /> : <CellTowerIcon />} */}
                                        {/* </IconButton> */}

                                    </Tooltip>
                                </Marker>
                            );
                        });
                    });
                })
            }
            <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
                <StreetMarkerDetails marker={selectedMarker} setOpen={setOpen} />
            </Dialog>
        </>
    );
}
