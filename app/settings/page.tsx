'use client'

import { IOSSwitch } from '@/components/Material/iOSSwitch'
import { selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors'
import { setTooltips } from '@/utils/Store/Slices/miscSlice'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Container, FormControlLabel, Paper, Switch, Typography } from '@mui/material'
import React from 'react'

const Settings = () => {
    const dispatch = useAppDispatch()

    const isTooltips = useAppSelector(selectIsTooltipOpen)

    const handleTooltipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTooltips(event.target.checked));
    };

    return (
        <Container sx={{
            height: "calc(100dvh - 128px)"
        }}>
            <Typography variant='h4' sx={{
                background: '#004aad',
                color: "#fff",
                marginBottom: "1rem"
            }} textAlign={'center'}>Setări aplicație</Typography>
            <Paper>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} onChange={handleTooltipChange} checked={isTooltips} />}
                    label="Detalii markeri"
                />
            </Paper>

        </Container>
    )
}

export default Settings