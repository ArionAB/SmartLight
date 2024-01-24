'use client'

import Box from '@mui/material/Box';
import React from 'react'
import { Button, IconButton, useTheme } from '@mui/material';
import Image from 'next/image';

const Navbar = () => {

    const { palette } = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            zIndex: '3',
            height: '55px',
            margin: '0 auto',
            width: '100%'
        }}>
            <IconButton>

            </IconButton>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                width: '100%'
            }}>
                <Image src="/Logo.jpeg" width='63' height='63' alt='Logo' />
                {/* <Button size='small' variant='contained' sx={{ background: palette.primary.light }}>Login</Button> */}
            </Box>
        </Box>
    )
}

export default Navbar