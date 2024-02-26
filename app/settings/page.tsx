'use client'

import { Container, Typography } from '@mui/material'
import React from 'react'

const Settings = () => {



    return (
        <Container sx={{
            height: "calc(100dvh - 128px)"
        }}>
            <Typography variant='h4' sx={{
                background: '#004aad',
                color: "#fff",
                marginBottom: "1rem"
            }} textAlign={'center'}>Setări aplicație</Typography>


        </Container>
    )
}

export default Settings