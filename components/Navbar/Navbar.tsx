'use client'

import Box from '@mui/material/Box';
import React from 'react'
import { IconButton, Switch, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors';
import FolderIcon from '@mui/icons-material/Folder';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors';
import { setDrawer, setTooltips } from '@/utils/Store/Slices/miscSlice';

const Navbar = () => {
    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)

    const handleTooltipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTooltips(event.target.checked));
    };

    const handleToggleDrawer = () => {
        dispatch(setDrawer(true))
    }

    const isTooltips = useAppSelector(selectIsTooltipOpen)
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
                <IconButton onClick={handleToggleDrawer}>
                    <MenuOpenIcon />
                </IconButton>
                <FolderIcon sx={{
                    color: '#F8D775'
                }} />
                <Typography variant='caption'>{focusedProject?.item?.city}</Typography>
                <Typography variant='caption'>{focusedProject?.streetItem?.name}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: "flex-end",
                alignItems: 'center',
                width: '100%'
            }}>
                <Switch checked={isTooltips} onChange={handleTooltipChange} />
                <Image src="/Logo.jpeg" width='63' height='63' alt='Logo' />
                {/* <Button size='small' variant='contained' sx={{ background: palette.primary.light }}>Login</Button> */}
            </Box>
        </Box>
    )
}

export default Navbar