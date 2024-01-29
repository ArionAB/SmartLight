import { Enums, Tables } from '@/utils/Store/Models/Database'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel'
import { selectFocusedProject, selectProjectItems } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Button, Dialog, IconButton, Popover, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import LightIcon from '@mui/icons-material/Light';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { StreetMarkerDetails } from './StreetMarkerDetails'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMarkerAction } from '@/utils/Store/Actions/MarkerActions'

export const StreetMarkers = () => {
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const dispatch = useAppDispatch()
    const projectItems = useAppSelector(selectProjectItems)
    const focusedProject = useAppSelector(selectFocusedProject)

    const lampColor = (power_type: Enums<'power_type'>) => {
        switch (power_type) {
            case '30W':
                return customLampIcon30
            case '60W':
                return customLampIcon60
            case '80W':
                return customLampIcon80
            default: 'black'
        }
    }

    const lampHTML30 = renderToStaticMarkup(
        <div style={{ color: '#f44336', }}>
            <LightIcon />
        </div>
    );
    const lampHTML60 = renderToStaticMarkup(
        <div style={{ color: '#9c27b0', }}>
            <LightIcon />
        </div>
    );
    const lampHTML80 = renderToStaticMarkup(
        <div style={{ color: '#009688', }}>
            <LightIcon />
        </div>
    );
    const poleHTML = renderToStaticMarkup(
        <div style={{ color: '#ff1744' }}>
            <CellTowerIcon />
        </div>
    );



    const customLampIcon30 = divIcon({
        html: lampHTML30,
        iconSize: [24, 24],
        iconAnchor: [24, 24],
    });
    const customLampIcon60 = divIcon({
        html: lampHTML60,
        iconSize: [24, 24],
        iconAnchor: [24, 24],
    });
    const customLampIcon80 = divIcon({
        html: lampHTML80,
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
            return projectItems.filter((project) => project.id === focusedProject.item.id)
        } else return projectItems
    }

    const deletePopover = Boolean(anchorEl)
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
                                    icon={marker.marker_type === 'Lampa' ? lampColor(marker.power_type) : customPoleIcon}
                                >
                                    <Popup >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                            <Typography>{marker.number}</Typography>
                                            <IconButton onClick={() => handleOpenDialog(marker)} color='warning'>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color='error' onClick={handleClick} aria-describedby='delete'>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                            <Popover
                                                id='delete'
                                                open={deletePopover}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Typography sx={{ p: 2 }} textAlign={'center'}>Sunteti sigur ca doriti sa stergeti markerul cu nr. {marker?.number}?</Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-around',
                                                    marginBottom: 2
                                                }}>
                                                    <Button variant='outlined' onClick={() => setAnchorEl(null)}>Anuleaza</Button>
                                                    <Button variant='contained' color='error' onClick={() => dispatch(deleteMarkerAction(marker))}>Da</Button>
                                                </Box>

                                            </Popover>
                                        </Box>


                                    </Popup>

                                    {/* @ts-ignore */}
                                    <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                        {marker.number}
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
