/* import { Box, IconButton, Popover, Typography } from "@mui/material";
import React from "react";
import { Marker, Popup } from "react-leaflet";

const MemoizedMarker = React.memo(({ marker }) => (
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
                            marker?.pole_type === 'Lampadar Metalic' ? 'L.M.' : marker?.pole_type
                        }
                    </Typography>
                </Box>
            </Tooltip>)
    }

</Marker>
  )); */