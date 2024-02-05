
'use client'

import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Box, Dialog, Divider, Fab, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AddOrEditProject } from '../Project/AddOrEditProject';
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
import { StreetMarkerDetails } from '../Marker/StreetMarkerDetails';
import { setFocusedProject } from '@/utils/Store/Slices/projectSlice';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import SearchIcon from '@mui/icons-material/Search';
import { flyToLocation } from '../Map/FlyToLocation';
import { useMap } from 'react-leaflet';
import { selectIsDrawerOpen } from '@/utils/Store/Selectors/miscSelectors';
import StreetMenu from '../Street/StreetMenu';
import ProjectMenu from '../Project/ProjectMenu';



export const DrawerDialog = () => {
    const [open, setOpen] = useState(true)
    const [openAddMarker, setOpenAddMarker] = useState(false)
    const [openStreet, setOpenStreet] = useState(false)
    const [openMarker, setOpenMarker] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(null)
    const [selectedMarker, setSelectedMarker] = useState<Tables<'markers'> | null>(null)
    const [street, setStreet] = useState<StreetModel | null>(null)
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
                <AddOrEditProject setOpenAddMarker={setOpenAddMarker} />
            </Dialog>
            <Dialog open={openStreet} onClose={() => setOpenStreet(false)}>
                <AddStreet project={selectedProject!} setOpenStreet={setOpenStreet} />
            </Dialog>
            <Dialog open={openMarker} onClose={() => setOpenMarker(false)}>
                <StreetMarkerDetails marker={selectedMarker!} setOpen={setOpenMarker} />
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
                    <ListItem sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <TextField type='search' variant='standard' label="Cauta proiect" onChange={(e) => setSearch(e.target.value)} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}></TextField>
                        <Fab onClick={() => setOpenAddMarker(true)} color='primary'>
                            <CreateNewFolderIcon />
                        </Fab>
                    </ListItem>
                </List>

                {
                    projectItems?.map((item: ProjectModel) => {
                        if (item.city.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <List key={item.id}>
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
                                                    <Badge badgeContent={item.count} max={1000} color="info" anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}>
                                                        <FolderIcon sx={{
                                                            color: '#F8D775'
                                                        }} />
                                                    </Badge>
                                                    <Typography variant='caption'>[{item?.county}] {item?.city}</Typography>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <ProjectMenu project={item} />
                                                    <MapIcon sx={{ mr: 2 }} onClick={() => handleGoToLocation(Number(item.lat), Number(item.long))} />
                                                </Box>

                                            </Box>


                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Fab size='small' variant='extended' color='info' onClick={() => handleAddStreet(item)}>
                                                <Add sx={{ mr: 1 }} />
                                                Strada
                                            </Fab>
                                            <Box sx={{ display: 'flex' }} flexDirection={'column'} gap={2} marginTop={2}>
                                                {
                                                    item.strazi?.map((streetItem: StreetModel) => {
                                                        return (
                                                            <Accordion key={streetItem.id}>
                                                                <Badge color="secondary" badgeContent={streetItem?.markers?.length}
                                                                    sx={{
                                                                        width: '100%'
                                                                    }}
                                                                    max={1000}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}>
                                                                    <AccordionSummary
                                                                        onClick={() => {
                                                                            setStreet(streetItem),
                                                                                dispatch(setFocusedProject({ item, streetItem }))
                                                                        }}
                                                                        expandIcon={<ArrowDownwardIcon />}
                                                                        aria-controls="panel1-content"
                                                                        id="panel1-header"
                                                                        sx={{ width: "100%" }}
                                                                    >

                                                                        <Box sx={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            width: "100%",
                                                                            marginRight: "1.5rem",
                                                                            borderBottom: (selectedProject?.id === streetItem.proiect_id) && (streetItem.id === street?.id) ? '2px solid #0052cc' : ''
                                                                        }} gap={1} justifyContent={'space-between'} alignItems={'center'}>

                                                                            <Box sx={{
                                                                                display: "flex"
                                                                            }} gap={1}

                                                                            >

                                                                                <Typography variant='caption' fontWeight={600} color={'#2196f3'}>{streetItem?.name}</Typography>
                                                                                <Typography variant='caption'>{streetItem.network_type}</Typography>
                                                                                <Typography variant='caption'>{streetItem.road_type}</Typography>
                                                                            </Box>
                                                                            <StreetMenu street={street!} />
                                                                        </Box>
                                                                    </AccordionSummary>
                                                                </Badge>
                                                                <AccordionDetails>
                                                                    <List>
                                                                        {streetItem.markers?.map((marker: Tables<'markers'>, index: number) => {
                                                                            return (
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
                                                                                            backgroundColor: marker?.accuracy === null ? 'transparent' : Number(marker.accuracy) <= 5 ? '#4caf50' : Number(marker.accuracy) > 5 && Number(marker.accuracy) < 10 ? '#ff9100' : Number(marker.accuracy) > 10 ? '#f44336' : ''
                                                                                            // backgroundColor: marker.marker_status === 'Ok' ? '#4caf50' : '#f44336'
                                                                                        }}></Box>
                                                                                        <Avatar>
                                                                                            {marker.marker_type === 'Lampa' ? <svg width="20px" height="20px" viewBox="0 0 512 512" version="1.1" >
                                                                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                                    <g id="drop" fill="#fff" transform="translate(32.000000, 42.666667)">
                                                                                                        <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                                                                                        </path>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg> : <svg fill={marker.lamp_type === 'Cu lampa' ? '#4caf50' : '#b22a00'} width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                                                <circle cx="16" cy="16" r="16" />
                                                                                            </svg>}
                                                                                        </Avatar>
                                                                                    </ListItemAvatar>
                                                                                    <ListItemText
                                                                                        primary={marker.number}
                                                                                    />


                                                                                </ListItem>

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

