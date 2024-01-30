import { Fab } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { flyToLocation } from './FlyToLocation'

export const AddPoleIcon: FC<{
    handleAddDraggableMarkers: Function,
    position: number[]
    getMyLocation: Function
}> = ({ handleAddDraggableMarkers, position, getMyLocation }) => {
    const map = useMap()

    useEffect(() => {
        flyToLocation(map, position[0], position[1])
    }, [position])
    return (
        <Fab onClick={() => {
            getMyLocation()
            handleAddDraggableMarkers('Stalp')
        }}
            sx={{
                position: 'absolute', right: 0, bottom: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
            }}>
            <svg fill="#b22a00" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" />
            </svg>
        </Fab>
    )
}