import { Enums, Tables } from '@/utils/Store/Models/Database'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel'
import { selectFocusedProject, selectProjectItems } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Button, Dialog, IconButton, Popover, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { StreetMarkerDetails } from './StreetMarkerDetails'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors'

export const StreetMarkers = () => {
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const dispatch = useAppDispatch()
    const projectItems = useAppSelector(selectProjectItems)
    const focusedProject = useAppSelector(selectFocusedProject)
    const isTooltips = useAppSelector(selectIsTooltipOpen)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



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

    const poleColor = (lamp_type: Enums<'lamp_type'>) => {
        switch (lamp_type) {
            case 'Cu lampa':
                return customPoleIconWithLamp
            case 'Fara lampa':
                return customPoleIconNoLamp
        }
    }

    const lampHTML30 = renderToStaticMarkup(
        <svg width="15px" height="15px" viewBox="0 0 512 512" version="1.1" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="drop" fill="#f44336" transform="translate(32.000000, 42.666667)">
                    <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                    </path>
                </g>
            </g>
        </svg>
    );
    const lampHTML60 = renderToStaticMarkup(
        <svg width="15px" height="15px" viewBox="0 0 512 512" version="1.1" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="drop" fill="#9c27b0" transform="translate(32.000000, 42.666667)">
                    <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                    </path>
                </g>
            </g>
        </svg>
    );
    const lampHTML80 = renderToStaticMarkup(
        <svg width="15px" height="15px" viewBox="0 0 512 512" version="1.1" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="drop" fill="#009688" transform="translate(32.000000, 42.666667)">
                    <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                    </path>
                </g>
            </g>
        </svg>
    );
    const poleHTMLwithLamp = renderToStaticMarkup(
        <svg fill="#4caf50" width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" />
        </svg>
    );
    const poleHTMLNoLamp = renderToStaticMarkup(
        <svg fill="#b22a00" width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" />
        </svg>
    );



    const customLampIcon30 = divIcon({
        html: lampHTML30,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });

    const customLampIcon60 = divIcon({
        html: lampHTML60,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });

    const customLampIcon80 = divIcon({
        html: lampHTML80,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });

    const customPoleIconWithLamp = divIcon({
        html: poleHTMLwithLamp,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });
    const customPoleIconNoLamp = divIcon({
        html: poleHTMLNoLamp,
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });

    const handleOpenDialog = (marker: Tables<'markers'>) => {
        setOpen(true),
            setSelectedMarker(marker)
    }


    return (
        <>
            {
                focusedProject?.street?.markers?.map((marker: Tables<'markers'>) => {
                    return (
                        <Marker
                            key={marker.id}
                            position={[Number(marker.latitude), Number(marker.longitude)]}
                            //@ts-ignore
                            icon={marker.marker_type === 'Lampa' ? lampColor(marker.power_type) : poleColor(marker.lamp_type)}
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
                                        open={anchorEl ? true : false}
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
