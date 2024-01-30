
'use client'

import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Dialog, Divider, Fab, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AddProject } from './AddProject';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectProjectItems } from '@/utils/Store/Selectors/projectSelectors';
import { Add } from '@mui/icons-material';
import { AddStreet } from './AddStreet';
import { Tables } from '@/utils/Store/Models/Database';
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel';
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel';
import FolderIcon from '@mui/icons-material/Folder';
import { getProjectAction } from '@/utils/Store/Actions/ProjectAction';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { setDrawer } from '@/utils/Store/Slices/miscSlice';
import { StreetMarkerDetails } from '../Map/StreetMarkerDetails';
import { setFocusedProject, setMarker } from '@/utils/Store/Slices/projectSlice';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import { flyToLocation } from '../Map/FlyToLocation';
import { useMap } from 'react-leaflet';
import { selectIsDrawerOpen } from '@/utils/Store/Selectors/miscSelectors';



export const DrawerDialog = () => {
    const [open, setOpen] = useState(true)
    const [openAddMarker, setOpenAddMarker] = useState(false)
    const [openStreet, setOpenStreet] = useState(false)
    const [openMarker, setOpenMarker] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectModel>(null!)
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'>>(null!)
    const [street_id, setStreet_id] = useState<string>('')
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [search, setSearch] = useState<string>('')
    const map = useMap();


    const dispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen)
    const projectItems = useAppSelector(selectProjectItems)
    const theme = useTheme();

    useEffect(() => {
        dispatch(getProjectAction())
    }, [])

    const handleAddStreet = (project: ProjectModel) => {
        setSelectedProject(project)
        setOpenStreet(true)
    }

    const handleOpenMarkerDetails = (marker: Tables<'markers'>) => {
        setOpenMarker(true)
        setSelectedMarker(marker)
    }



    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleGoToLocation = (lat: number, lng: number) => {
        setOpen(false)
        flyToLocation(map, lat, lng)
    }


    return (
        <>
            <Dialog open={openAddMarker} onClose={() => setOpenAddMarker(false)}>
                <AddProject setOpenAddMarker={setOpenAddMarker} />
            </Dialog>
            <Dialog open={openStreet} onClose={() => setOpenStreet(false)}>
                <AddStreet project={selectedProject} setOpenStreet={setOpenStreet} />
            </Dialog>
            <Dialog open={openMarker} onClose={() => setOpenMarker(false)}>
                <StreetMarkerDetails marker={selectedMarker} setOpen={setOpenMarker} />
            </Dialog>
            <SwipeableDrawer
                anchor='left'
                open={open || isDrawerOpen}
                onOpen={() => {
                    setOpen(true)
                    dispatch(setDrawer(true))
                }}
                disableDiscovery={false}
                disableSwipeToOpen={false}
                onClose={() => {
                    setOpen(false)
                    dispatch(setDrawer(false))
                }}
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
                    <ListItem>
                        <Fab variant="extended" onClick={() => setOpenAddMarker(true)}>
                            <CreateNewFolderIcon sx={{ mr: 1 }} />
                            Adauga proiect
                        </Fab>
                    </ListItem>
                    <ListItem>
                        <TextField type='search' variant='standard' label="Cauta proiect" onChange={(e) => setSearch(e.target.value)} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}></TextField>
                    </ListItem>
                </List>

                {
                    projectItems?.map((item: ProjectModel) => {
                        if (item.city.toLowerCase().includes(search.toLowerCase())) {
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
                                                    <Typography variant='caption'>[{item?.county}] {item?.city}</Typography>
                                                </Box>
                                                <MapIcon sx={{ mr: 2 }} onClick={() => handleGoToLocation(Number(item.lat), Number(item.long))} />
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
                                                                    }} gap={1} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography variant='caption' fontWeight={600}>{street?.name}</Typography>
                                                                        <Typography variant='caption'>{street.network_type}</Typography>
                                                                        <Typography variant='caption'>{street.road_type}</Typography>
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
                                                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                                <IconButton edge="end" color='secondary' aria-label="delete" sx={{ mr: 1 }} onClick={() => handleOpenMarkerDetails(marker)}>
                                                                                                    <InfoIcon />
                                                                                                </IconButton>
                                                                                                <IconButton onClick={() => handleGoToLocation(Number(marker.latitude), Number(marker.longitude))}>
                                                                                                    <MapIcon />
                                                                                                </IconButton>
                                                                                            </Box>

                                                                                        }
                                                                                    >
                                                                                        <ListItemAvatar>
                                                                                            <Box color='sucess' sx={{
                                                                                                width: '10px',
                                                                                                height: '10px',
                                                                                                borderRadius: '50%',
                                                                                                display: 'inline-block',
                                                                                                backgroundColor: marker.marker_status === 'Ok' ? '#4caf50' : '#f44336'
                                                                                            }}></Box>
                                                                                            <Avatar>
                                                                                                {marker.marker_type === 'Lampa' ? <svg width="20px" height="20px" viewBox="0 0 512 512" version="1.1" >
                                                                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                                        <g id="drop" fill="#fff" transform="translate(32.000000, 42.666667)">
                                                                                                            <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                                                                                            </path>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </svg> : <svg fill="#fff" width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <circle cx="16" cy="16" r="16" />
                                                                                                </svg>}
                                                                                            </Avatar>
                                                                                        </ListItemAvatar>
                                                                                        <ListItemText
                                                                                            primary={marker.number}
                                                                                        />


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
                        }

                    })
                }
                {

                }


                <Divider />

            </SwipeableDrawer >
        </>

    )
}

