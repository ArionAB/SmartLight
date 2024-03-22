'use client'

import React, { useEffect, useMemo } from 'react'
import { selectProjectItems } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { PieChart } from '@mui/x-charts/PieChart';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';
import { getProjectAction } from '@/utils/Store/Actions/ProjectAction';
import { Box, Card, Typography } from '@mui/material';
import useBreakpointDown from '@/utils/Hooks/useBreakpoints';


const ProjectTab = () => {
    const dispatch = useAppDispatch()
    const projectItems = useAppSelector(selectProjectItems)
    const currentUser = useAppSelector(selectCurrentUser)

    useEffect(() => {
        if (currentUser && projectItems.length === 0) {
            dispatch(getProjectAction(currentUser))
        }
    }, [currentUser])

    let counties = useMemo(() => {
        return projectItems?.reduce((acc: any, obj) => {
            const county = obj.county;
            if (!acc[county]) {
                acc[county] = 1;
            } else {
                acc[county]++;
            }
            return acc;
        }, {});
    }, [projectItems]);

    let project_types = useMemo(() => {
        return projectItems?.reduce((acc: any, obj) => {
            const project_type = obj.project_type;
            if (!acc[project_type]) {
                acc[project_type] = 1;
            } else {
                acc[project_type]++;
            }
            return acc;
        }, {});
    }, [projectItems]);

    let project_typesArray = useMemo(() => {
        return Object.entries(project_types).map(([project_type, count], index) => ({
            id: index,
            value: Number(count),
            label: `${project_type} (${count})`
        }));
    }, [projectItems]);



    let countiesArray = useMemo(() => {
        return Object.entries(counties).map(([county, count], index) => ({
            id: index,
            value: Number(count),
            label: `${county} (${count})`
        }));
    }, [counties]);

    const lessThan1200 = useBreakpointDown('lg');
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: lessThan1200 ? 'column' : 'row',
            justifyContent: 'space-around',
            gap: '1rem',
        }}>
            <Card sx={{
                padding: '1rem',
                minWidth: '100px',
                overflowX: 'auto',
            }}>
                <Typography textAlign={'center'} variant='h6'>Statistici proiecte / județ</Typography>
                <PieChart
                    colors={['#f44336', '#9c27b0', '#3f51b5', '#00bcd4', '#009688', '#4caf50', '#cddc39', '#ffeb3b', '#ff9800', '#d1c4e9', '#0d47a1']}
                    series={[
                        {
                            data: countiesArray,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                        },
                    ]}
                    width={lessThan1200 ? 500 : 700}
                    height={200}
                />
            </Card>
            <Card sx={{
                padding: '1rem',
                overflowX: 'auto',
                minWidth: '100px'

            }}>
                <Typography textAlign={'center'} variant='h6'>Tipuri de proiect</Typography>
                <PieChart
                    colors={['#f44336', '#9c27b0', '#3f51b5', '#00bcd4', '#009688', '#4caf50', '#cddc39', '#ffeb3b', '#ff9800', '#d1c4e9', '#0d47a1']}
                    series={[
                        {
                            data: project_typesArray,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </Card>

        </Box>
    )
}

export default ProjectTab