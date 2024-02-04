import { Box, IconButton, Menu, Dialog, Button, Stack, Paper, MenuList, MenuItem, Popper, Grow, ClickAwayListener, MenuProps, alpha, Divider } from '@mui/material'
import React, { FC, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from '@emotion/styled';
import { Delete } from '@mui/icons-material';
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel';
import { AddOrEditProject } from './AddOrEditProject';
import DeleteProject from './DeleteProject';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={10}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        //@ts-ignore
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            //@ts-ignore
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                //@ts-ignore
                color: theme.palette.text.secondary,
                //@ts-ignore
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    //@ts-ignore
                    theme.palette.primary.main,
                    //@ts-ignore
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



const ProjectMenu: FC<{ project: ProjectModel }> = ({ project }) => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
    const [openTable, setOpenTable] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)


    const handleOpenProjectMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null)
    }

    return (
        <>
            <IconButton color='info' onClick={handleOpenProjectMenu}>
                <MoreVertIcon />
            </IconButton>
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} >
                <AddOrEditProject setOpenAddMarker={setOpenEditDialog} project={project} />
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DeleteProject project={project} onClose={setDeleteDialog} />
                {/* <DeleteStreet street={street} onClose={setDeleteDialog} /> */}
            </Dialog>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchor}
                open={anchor ? true : false}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    setOpenEditDialog(true)
                    handleClose()
                }} disableRipple>
                    <EditIcon color='warning' />
                    Edit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    setOpenTable(true),
                        handleClose()
                }} disableRipple>
                    <InfoIcon style={{ color: 'success' }} />
                    Info
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    setDeleteDialog(true),
                        handleClose()
                }} disableRipple>
                    <Delete />
                    Șterge
                </MenuItem>
            </StyledMenu>
            <Dialog fullScreen maxWidth="md" open={openTable} onClose={() => setOpenTable(false)}>
                {/* <StreetTable street={street} /> */}
                <Box sx={{
                    margin: "1rem",
                    display: 'flex',
                    justifyContent: "flex-end"
                }}>
                    <Button onClick={() => setOpenTable(false)} sx={{
                        width: 100,

                    }} variant="contained">Închide</Button>
                </Box>

            </Dialog>

        </>

    )
}

export default ProjectMenu