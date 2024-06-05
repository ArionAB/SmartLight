import { Enums, Tables } from '@/utils/Store/Models/Database'
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Button, Dialog, IconButton, Popover, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet'
import { StreetMarkerDetails } from './StreetMarkerDetails'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { selectFilters, selectHasInternet, selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors'
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors'
import { deleteOfflineMarker } from '@/utils/Store/Slices/projectSlice'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { StreetModel } from '@/utils/Store/Models/Street/StreetModel'

export const StreetMarkers = () => {
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [circleSize, setCircleSize] = useState<string>('10px')
    const map = useMap()
    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)
    const isTooltips = useAppSelector(selectIsTooltipOpen)
    const currentUser = useAppSelector(selectCurrentUser)
    const filters = useAppSelector(selectFilters)
    const hasInternet = useAppSelector(selectHasInternet)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteMarker = (marker: Tables<'markers'>) => {
        if (hasInternet) {
            dispatch(deleteMarkerAction(marker)).then(() => {
                setAnchorEl(null)
            })
        } else {
            const offlineProject = localStorage.getItem('project')
            if (offlineProject) {

                let project: ProjectModel = JSON.parse(offlineProject)
                let street: StreetModel | undefined = project.strazi.find((street: StreetModel) => street.id === marker.street_id)
                const markerIndex = street?.markersArray.findIndex((item) => item.number === marker.number);
                if (markerIndex !== -1) {
                    street!.markersArray.splice(markerIndex!, 1);
                    street!.markers[0].count--
                }
                localStorage.setItem('project', JSON.stringify(project))
                dispatch(deleteOfflineMarker(marker))
                setTimeout(() => {
                    setAnchorEl(null)
                }, 500)

            }

        }
    }



    const lampColor = (marker: Tables<'markers'>) => {
        switch (marker.power_type) {
            case '30W':
                return customLampIcon30(marker)
            case '60W':
                return customLampIcon60(marker)
            case '80W':
                return customLampIcon80(marker)
            default: 'black'
        }
    }
    const poleColor = (lamp_type: Enums<'lamp_type'>) => {
        switch (lamp_type) {
            case 'Cu lampa':
                return customPoleIconWithLamp
            case 'Fara lampa':
                return customPoleIconNoLamp
        }
    }
    useEffect(() => {
        const handleZoomChange = () => {
            setZoomLevel(map.getZoom());
        };

        map.on('zoom', handleZoomChange);

        return () => {
            map.off('zoom', handleZoomChange);
        };
    }, [map]);

    useEffect(() => {
        if (zoomLevel < 15) {
            setCircleSize('6px');
        } else {
            setCircleSize('10px');
        }
    }, [zoomLevel]);

    const lampHTML30 = (marker: Tables<'markers'>) => renderToStaticMarkup(
        <svg fill='#42a5f5' width={circleSize} height={circleSize} viewBox="0 0 32 32" style={{ border: marker.hub_c ? "#FFD700 2px solid" : marker.marker_status === 'Bad' ? '#c62828 2px solid' : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const lampHTML60 = (marker: Tables<'markers'>) => renderToStaticMarkup(
        < svg fill='#4caf50' width={circleSize} height={circleSize} viewBox="0 0 32 32" style={{ border: marker.hub_c ? "#FFD700 2px solid" : marker.marker_status === 'Bad' ? '#c62828 2px solid' : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg >
    );
    const lampHTML80 = (marker: Tables<'markers'>) => renderToStaticMarkup(
        <svg fill="#673ab7" width={circleSize} height={circleSize} viewBox="0 0 32 32" style={{ border: marker.hub_c ? "#FFD700 2px solid" : marker.marker_status === 'Bad' ? '#c62828 2px solid' : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const poleHTMLwithLamp = renderToStaticMarkup(
        <svg fill="#4caf50" width={circleSize} height={circleSize} viewBox="0 0 32 32" style={{ border: "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const poleHTMLNoLamp = renderToStaticMarkup(
        <svg fill="#b22a00" width={circleSize} height={circleSize} viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" />
        </svg>
    );

    const sensorHTML = renderToStaticMarkup(
        <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const customSensorIcon = divIcon({
        html: sensorHTML,
        iconSize: [0, 0],

    })

    const customLampIcon30 = (marker: Tables<'markers'>) => divIcon({
        html: lampHTML30(marker),
        iconSize: [0, 0],

    });

    const customLampIcon60 = (marker: Tables<'markers'>) => divIcon({
        html: lampHTML60(marker),
        iconSize: [0, 0],

    });

    const customLampIcon80 = (marker: Tables<'markers'>) => divIcon({
        html: lampHTML80(marker),
        iconSize: [0, 0],

    });

    const customPoleIconWithLamp = divIcon({
        html: poleHTMLwithLamp,
        iconSize: [-0, -0],

    });
    const customPoleIconNoLamp = divIcon({
        html: poleHTMLNoLamp,
        iconSize: [0, 0],

    });

    const handleOpenDialog = (marker: Tables<'markers'>) => {
        setSelectedMarker(marker),
            setOpen(true)
    }

    const anchor = Boolean(anchorEl)

    const filterMarkers = () => {
        return focusedProject?.street?.markersArray?.filter((marker) => {
            // Filter based on pictures
            if (
                (filters.pictures === "with_pictures" && (!marker.images || marker.images.length === 0)) ||
                (filters.pictures === "no_pictures" && marker.images && marker.images.length > 0)
            ) {
                return false;
            }

            // Filter based on lamps
            if (
                (filters.lamps === "with_lamps" && marker.lamp_type === 'Cu lampa') ||
                (filters.lamps === "no_lamps" && marker.lamp_type === 'Fara lampa')
            ) {
                return false;
            }

            // Filter based on type
            if (
                (filters.type === "pole" && marker.marker_type !== 'Stalp') ||
                (filters.type === "lamp" && marker.marker_type !== 'Lampa')
            ) {
                return false;
            }

            if (
                (filters.observatii === 'with' && !marker.observatii) ||
                (filters.observatii === 'no' && marker.observatii)
            ) {
                return false;
            }

            // If all conditions pass, include the marker in the filtered array
            return true;
        });
    };

    // Inside your useMemo:
    let markers = useMemo(() => {
        if (focusedProject && focusedProject.street) {
            return filterMarkers();
        } else {
            return [];
        }
    }, [filters, focusedProject]);

    return (
        <>
            {
                markers?.map((marker: Tables<'markers'>) => {
                    return (
                        <Marker
                            key={marker.id}
                            position={[Number(marker.latitude), Number(marker.longitude)]}
                            //@ts-ignore
                            icon={marker.marker_type === 'Lampa' ? lampColor(marker) : marker.marker_type === 'Stalp' ? poleColor(marker.lamp_type) : customSensorIcon}
                        >
                            <Popup >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                    <Typography>{marker.number}</Typography>
                                    <IconButton onClick={() => handleOpenDialog(marker)} color='warning'>
                                        <EditIcon />
                                    </IconButton>
                                    {
                                        currentUser?.role_type !== 'Visitor' && (
                                            <IconButton color='error' onClick={(e) => {
                                                handleClick(e)
                                                setSelectedMarker(marker)
                                            }} aria-describedby='delete'>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        )
                                    }
                                    {
                                        selectedMarker?.id === marker?.id && (
                                            <Popover
                                                id='delete'
                                                open={anchor}
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
                                                    <Button variant='contained' color='error' onClick={() => {
                                                        handleDeleteMarker(marker)
                                                    }}>Da</Button>
                                                </Box>

                                            </Popover>
                                        )
                                    }

                                </Box>


                            </Popup>

                            {
                                isTooltips && (
                                    //@ts-ignore
                                    <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Typography variant='caption' sx={{ fontWeight: 600, fontSize: 10 }} textAlign={'center'}>
                                                {marker?.number}
                                            </Typography>
                                            <Typography variant='caption' sx={{ fontSize: 10 }}>
                                                {
                                                    marker?.pole_type === 'Lampadar Metalic' ? 'L.M.' : marker?.pole_type === 'Lampadar beton' ? "L.B." : marker?.pole_type
                                                }
                                            </Typography>
                                        </Box>
                                    </Tooltip>)
                            }

                        </Marker>
                    );
                })}
            )
            <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
                <StreetMarkerDetails marker={selectedMarker} setOpen={setOpen} />
            </Dialog>
        </>
    );
}
