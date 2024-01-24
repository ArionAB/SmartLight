
'use client'

import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonGroup, Card, Dialog, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AddProject } from './AddProject';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectProjectItems, selectStreetItems } from '@/utils/Store/Selectors/projectSelectors';
import { Add } from '@mui/icons-material';
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

    const dispatch = useAppDispatch();

    const projectItems = useAppSelector(selectProjectItems)
    const streetItems = useAppSelector(selectStreetItems)

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


    return (
        <>
            <Dialog open={openAddMarker} onClose={() => setOpenAddMarker(false)}>
                <AddProject />
            </Dialog>
            <Dialog open={openStreet} onClose={() => setOpenStreet(false)}>
                <AddStreet project={selectedProject} />
            </Dialog>
            <Dialog open={openMarker} onClose={() => setOpenMarker(false)}>
                {/* <AddMarker /> */}
            </Dialog>
            <SwipeableDrawer
                anchor='left'
                open={open}
                variant="persistent"
                onOpen={() => {
                    setOpen(true)
                    dispatch(setDrawer(true))
                }}
                onClose={() => setOpen(false)}
                sx={{
                    width: 350,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        transition: '0.5s'
                    },
                }}
            >
                <IconButton onClick={() => drawerWidth === 350 ? setDrawerWidth(50) : setDrawerWidth(350)}>
                    {drawerWidth === 350 ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Divider />
                <List>
                    <ListItemButton onClick={() => setOpenAddMarker(true)}>
                        <ListItemIcon>
                            <CreateNewFolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Adauga proiect" />
                    </ListItemButton>
                </List>
                {
                    projectItems?.map((item: ProjectModel) => {
                        return (
                            <Card key={item.id} sx={{
                                marginBottom: "5px"
                            }}>
                                <Accordion  >
                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        onClick={() => setSelectedProject(item)}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}>
                                            <FolderIcon sx={{
                                                color: '#F8D775'
                                            }} />
                                            <Typography variant={drawerWidth === 350 ? 'h6' : 'caption'}>{item?.name}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Button variant="contained" size='small' startIcon={<Add />} onClick={() => handleAddStreet(item)}>
                                            Adauga strada
                                        </Button>
                                        <Box sx={{ display: 'flex' }} flexDirection={'column'} gap={2} marginTop={2}>
                                            {
                                                item.strazi?.map((street: StreetModel) => {
                                                    return (
                                                        <Accordion >
                                                            <AccordionSummary
                                                                onClick={() => setStreet_id(item.id)}
                                                                expandIcon={<ArrowDownwardIcon />}
                                                                aria-controls="panel1-content"
                                                                id="panel1-header"
                                                            >
                                                                <Box sx={{ display: 'flex' }} flexDirection={'column'}>
                                                                    <Box sx={{ display: 'flex' }} gap={1} justifyContent={'space-between'}>
                                                                        <Typography>{street?.name}</Typography>
                                                                        {street.network_type === 'Torsadat' && (<StackedLineChartIcon />)}
                                                                        {street.network_type === 'Subteran' && (<PowerInputIcon />)}
                                                                        {street.network_type === 'Clasic' && (<LinearScaleIcon />)}
                                                                        <Typography>{street.road_type}</Typography>
                                                                    </Box>
                                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{
                                                                        gap: '1rem',
                                                                        marginTop: "1rem"
                                                                    }}>
                                                                        <Button startIcon={<Add />} variant="contained" size="small" color='secondary' onClick={() => handleOpenMarker(street, 'Lampa')}>lampa</Button>
                                                                        <Button startIcon={<Add />} variant="contained" size="small" onClick={() => handleOpenMarker(street, 'Stalp')}>stalp</Button>
                                                                    </ButtonGroup>
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
                                                                                        <IconButton edge="end" aria-label="delete">
                                                                                            {marker.marker_type === 'Lampa' ? <LightIcon /> : <CellTowerIcon />}
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
                            </Card>

                        )
                    })
                }
                {

                }


                {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
                <Divider />
                {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
            </SwipeableDrawer >
        </>

    )
}

