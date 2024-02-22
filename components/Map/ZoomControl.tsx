import React from 'react'
import { Card, Divider, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from 'react-leaflet';

const ZoomControl = () => {
    const map = useMap()
    const zoomIn = () => {
        map.setZoom(map.getZoom() + 1);
    };
    const zoomOut = () => {
        map.setZoom(map.getZoom() - 1);
    };



    return (
        <Card sx={{
            display: 'flex',
            flexDirection: "column",
            position: 'absolute',
            top: "130px",
            right: '20px',
            zIndex: '1000',
        }}>
            <IconButton color='inherit' onClick={zoomIn}>
                <AddIcon />
            </IconButton>
            <Divider></Divider>
            <IconButton color='inherit' onClick={zoomOut}>
                <RemoveIcon />
            </IconButton>
        </Card>
    )
}

export default ZoomControl