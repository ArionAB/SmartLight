'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '@/utils/Store/hooks'
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, Container, Typography } from '@mui/material';
import { fetchNetworkRoadTypesCount } from '@/utils/Store/Actions/StreetActions';
import { Enums } from '@/utils/Store/Models/Database';
import { ResponsiveChartContainer } from '@mui/x-charts';

interface Count {
    count: number,
    network_type: Enums<'network_type'>,
    road_type: Enums<'road_type'>
}

const StreetTab = () => {
    const [street, setStreet] = useState<Count[]>([])
    const dispatch = useAppDispatch()

    let streetArray = useMemo(() => {
        return street?.map((item: Count, index) => ({
            id: index,
            value: item.count,
            label: `${item.network_type} - ${item.road_type} (${item.count})`
        }))
    }, [street]);

    useEffect(() => {
        dispatch(fetchNetworkRoadTypesCount()).then((res) => {
            if (res) {
                //@ts-ignore
                setStreet(res)
            }
        })
    }, [])


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <Typography textAlign={'center'} variant='h6'>Statistici tip strada si tip drum</Typography>
            <Card sx={{
                padding: '1rem',
                minWidth: '100px',
                overflowX: 'auto',
            }}>
                <PieChart
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',

                    }}
                    colors={['#f44336', '#9c27b0', '#3f51b5', '#00bcd4', '#009688', '#4caf50', '#cddc39', '#ffeb3b', '#ff9800', '#d1c4e9', '#0d47a1']}
                    series={[
                        {
                            data: streetArray,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                        },
                    ]}
                    width={900}
                    height={300}

                />
            </Card>
        </Box>
    )
}

export default StreetTab