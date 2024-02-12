import { Fab } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'


export const AddPoleIcon: FC<{
    handleAddDraggableMarkers: Function,
}> = ({ handleAddDraggableMarkers }) => {

    return (
        <Fab onClick={() => {
            handleAddDraggableMarkers('Stalp')
        }}
            sx={{
                position: 'absolute', right: 0, bottom: 0, zIndex: '999', margin: '1rem', backgroundColor: "#eaeaea", padding: "1rem", borderRadius: "50%"
            }}>
            <Image width={30} height={30} src="/pole-type.png" alt="icon" />
        </Fab>
    )
}
