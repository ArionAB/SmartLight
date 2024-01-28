'use client'

import Box from '@mui/material/Box';
import React from 'react'
import { Button, IconButton, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/utils/Store/hooks';
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors';
import FolderIcon from '@mui/icons-material/Folder';

const Navbar = () => {

    const focusedProject = useAppSelector(selectFocusedProject)
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
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '100%'
            }}>
                <FolderIcon sx={{
                    color: '#F8D775'
                }} />
                <Typography variant='caption'>{focusedProject?.item?.city}</Typography>
                -
                <Typography variant='caption'>{focusedProject?.street?.name}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: "flex-end",
                width: '100%'
            }}>
                <Image src="/Logo.jpeg" width='63' height='63' alt='Logo' />
                {/* <Button size='small' variant='contained' sx={{ background: palette.primary.light }}>Login</Button> */}
            </Box>
        </Box>
    )
}

export default Navbar