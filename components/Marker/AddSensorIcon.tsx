import { Fab } from '@mui/material'
import React, { FC } from 'react'

import Image from 'next/image'

export const AddSensorIcon: FC<{
    handleAddDraggableMarkers: Function
}> = ({ handleAddDraggableMarkers }) => {




    return (
        <Fab onClick={() => {
            handleAddDraggableMarkers('Senzor')
        }}
            sx={{
                position: 'absolute', right: 0, bottom: 160, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
            }}>
            <Image width={30} height={30} src="/motion-sensor.png" alt="icon" />
        </Fab>
    )
}
