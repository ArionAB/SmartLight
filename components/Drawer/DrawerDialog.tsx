
'use client'

import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonGroup, Card, Dialog, Divider, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AddProject } from './AddProject';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectProjectItems, selectStreetItems } from '@/utils/Store/Selectors/projectSelectors';
import { Add, PlusOne } from '@mui/icons-material';
import { AddStreet } from './AddStreet';
import { Enums, Tables } from '@/utils/Store/Models/Database';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import PowerInputIcon from '@mui/icons-material/PowerInput';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel';
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel';
import LightIcon from '@mui/icons-material/Light';
import CellTowerIcon from '@mui/icons-material/CellTower';
import FolderIcon from '@mui/icons-material/Folder';
import { getProjectAction } from '@/utils/Store/Actions/ProjectAction';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { setDrawer } from '@/utils/Store/Slices/miscSlice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StreetMarkerDetails } from '../Map/StreetMarkerDetails';
import { setFocusedProject } from '@/utils/Store/Slices/projectSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';



export const DrawerDialog = () => {
    const [open, setOpen] = useState(true)
    const [drawerWidth, setDrawerWidth] = useState(350)
    const [openAddMarker, setOpenAddMarker] = useState(false)
    const [openStreet, setOpenStreet] = useState(false)
    const [openMarker, setOpenMarker] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectModel>(null!)
    const [selectedStreet, setSelectedStreet] = useState<Tables<'strazi'>>(null!)
    const [selectedMarker, setSelectedMarker] = useState<Enums<'marker_type'>>('Lampa')
    const [street_id, setStreet_id] = useState<string>('')
    const [expanded, setExpanded] = React.useState<string | false>(false);



    const dispatch = useAppDispatch();

    const projectItems = useAppSelector(selectProjectItems)
    const streetItems = useAppSelector(selectStreetItems)
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        dispatch(getProjectAction())
    }, [])

    const handleAddStreet = (project: ProjectModel) => {
        setSelectedProject(project)
        setOpenStreet(true)
    }

    const handleOpenMarker = (item: Tables<'strazi'>, marker_type: Enums<'marker_type'>) => {
        setSelectedStreet(item)
        setSelectedMarker(marker_type)
        setOpenMarker(true)
    }

    useEffect(() => {
        dispatch(setDrawer(open))
    }, [open])

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Dialog open={openAddMarker} onClose={() => setOpenAddMarker(false)}>
                <AddProject setOpenAddMarker={setOpenAddMarker} />
            </Dialog>
            <Dialog open={openStreet} onClose={() => setOpenStreet(false)}>
                <AddStreet project={selectedProject} setOpenStreet={setOpenStreet} />
            </Dialog>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onOpen={() => {
                    setOpen(true)
                    dispatch(setDrawer(true))
                }}
                disableDiscovery={false}
                disableSwipeToOpen={false}
                onClose={() => setOpen(false)}
                sx={{
                    width: 350,
                    minWidth: 5,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        transition: '0.3s',
                        width: 350
                    },
                }}
            >

                <Divider />
                <List>
                    <Fab variant="extended" onClick={() => setOpenAddMarker(true)}>
                        <CreateNewFolderIcon sx={{ mr: 1 }} />
                        Adauga proiect
                    </Fab>
                </List>
                {
                    projectItems?.map((item: ProjectModel) => {
                        return (
                            <List>
                                <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)} sx={selectedProject?.id === item.id ? { border: "2px solid #0052cc" } : {}}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        onClick={() => {
                                            setSelectedProject(item)
                                        }}
                                    >
                                        <Box sx={{
                                            width: "100%",
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <FolderIcon sx={{
                                                    color: '#F8D775'
                                                }} />
                                                <Typography variant='caption'>{item?.city}</Typography>
                                            </Box>
                                            <MapIcon sx={{ mr: 2 }} />
                                        </Box>


                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Fab size='small' variant='extended' color='info' onClick={() => handleAddStreet(item)}>
                                            <Add sx={{ mr: 1 }} />
                                            Strada
                                        </Fab>
                                        <Box sx={{ display: 'flex' }} flexDirection={'column'} gap={2} marginTop={2}>
                                            {
                                                item.strazi?.map((street: StreetModel) => {
                                                    return (
                                                        <Accordion >
                                                            <AccordionSummary
                                                                onClick={() => {
                                                                    setStreet_id(street.id),
                                                                        dispatch(setFocusedProject({ item, street }))
                                                                }}
                                                                expandIcon={<ArrowDownwardIcon />}
                                                                aria-controls="panel1-content"
                                                                id="panel1-header"
                                                            >
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    borderBottom: (selectedProject?.id === street.proiect_id) && (street.id === street_id) ? '2px solid #0052cc' : ''
                                                                }} gap={1} justifyContent={'space-between'}>
                                                                    <Typography variant='caption'>{street?.name}</Typography>
                                                                    {street.network_type === 'Torsadat' && (<StackedLineChartIcon />)}
                                                                    {street.network_type === 'Subteran' && (<PowerInputIcon />)}
                                                                    {street.network_type === 'Clasic' && (<LinearScaleIcon />)}
                                                                    <Typography>{street.road_type}</Typography>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <List>
                                                                    {street.markers?.map((marker: Tables<'markers'>) => {
                                                                        return (
                                                                            <>
                                                                                <ListItem key={marker.id}
                                                                                    sx={{ borderBottom: '2px solid #eaeaea' }}
                                                                                    secondaryAction={
                                                                                        <IconButton edge="end" color='secondary' aria-label="delete" >
                                                                                            <InfoIcon />
                                                                                        </IconButton>
                                                                                    }
                                                                                >
                                                                                    <ListItemAvatar>
                                                                                        <Avatar>
                                                                                            {marker.marker_type === 'Lampa' ? <LightIcon /> : <CellTowerIcon />}
                                                                                        </Avatar>
                                                                                    </ListItemAvatar>
                                                                                    <ListItemText
                                                                                        primary={marker.number}
                                                                                    />

                                                                                    <Box color='sucess' sx={{
                                                                                        width: '10px',
                                                                                        height: '10px',
                                                                                        borderRadius: '50%',
                                                                                        display: 'inline-block',
                                                                                        backgroundColor: marker.marker_status === 'Ok' ? '#4caf50' : '#f44336'
                                                                                    }}></Box>
                                                                                </ListItem>
                                                                            </>

                                                                        )
                                                                    })}
                                                                </List>

                                                            </AccordionDetails>
                                                        </Accordion>

                                                    )

                                                })
                                            }
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </List>

                        )
                    })
                }
                {

                }


                <Divider />

            </SwipeableDrawer >
        </>

    )
}

