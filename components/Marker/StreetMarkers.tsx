import { Enums, Tables } from '@/utils/Store/Models/Database'
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Button, Dialog, IconButton, Popover, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { StreetMarkerDetails } from './StreetMarkerDetails'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { selectFilters, selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors'
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors'

export const StreetMarkers = () => {
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)
    const isTooltips = useAppSelector(selectIsTooltipOpen)
    const currentUser = useAppSelector(selectCurrentUser)
    const filters = useAppSelector(selectFilters)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const lampColor = (power_type: Enums<'power_type'>, hub_c: boolean) => {
        switch (power_type) {
            case '30W':
                return customLampIcon30(hub_c)
            case '60W':
                return customLampIcon60(hub_c)
            case '80W':
                return customLampIcon80(hub_c)
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
    const lampHTML30 = (hub_c: boolean) => renderToStaticMarkup(
        <svg fill="#f44336" width="12px" height="12px" viewBox="0 0 32 32" style={{ border: hub_c ? "#FFD700 2px solid" : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const lampHTML60 = (hub_c: boolean) => renderToStaticMarkup(
        <svg fill="#4caf50" width="12px" height="12px" viewBox="0 0 32 32" style={{ border: hub_c ? "#FFD700 2px solid" : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const lampHTML80 = (hub_c: boolean) => renderToStaticMarkup(
        <svg fill="#673ab7" width="12px" height="12px" viewBox="0 0 32 32" style={{ border: hub_c ? "#FFD700 2px solid" : "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const poleHTMLwithLamp = renderToStaticMarkup(
        <svg fill="#4caf50" width="12px" height="12px" viewBox="0 0 32 32" style={{ border: "rgba(89,89,89,1) 1px solid", borderRadius: "50%" }}>
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const poleHTMLNoLamp = renderToStaticMarkup(
        <svg fill="#b22a00" width="15px" height="15px" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" />
        </svg>
    );

    const sensorHTML = renderToStaticMarkup(
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const customSensorIcon = divIcon({
        html: sensorHTML,
        iconSize: [0, 0],

    })

    const customLampIcon30 = (hub_c: boolean) => divIcon({
        html: lampHTML30(hub_c),
        iconSize: [0, 0],

    });

    const customLampIcon60 = (hub_c: boolean) => divIcon({
        html: lampHTML60(hub_c),
        iconSize: [0, 0],

    });

    const customLampIcon80 = (hub_c: boolean) => divIcon({
        html: lampHTML80(hub_c),
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
        setOpen(true),
            setSelectedMarker(marker)
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
                            icon={marker.marker_type === 'Lampa' ? lampColor(marker.power_type, marker.hub_c) : marker.marker_type === 'Stalp' ? poleColor(marker.lamp_type) : customSensorIcon}
                        >
                            <Popup >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                    <Typography>{marker.number}</Typography>
                                    <IconButton onClick={() => handleOpenDialog(marker)} color='warning'>
                                        <EditIcon />
                                    </IconButton>
                                    {
                                        currentUser?.role_type !== 'Visitor' && (
                                            <IconButton color='error' onClick={handleClick} aria-describedby='delete'>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        )
                                    }

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
                                                dispatch(deleteMarkerAction(marker)).then(() => {
                                                    setAnchorEl(null)
                                                })
                                            }}>Da</Button>
                                        </Box>

                                    </Popover>
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
