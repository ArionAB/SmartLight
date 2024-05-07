import { Box, Menu, Dialog, Button, MenuItem, MenuProps, alpha, Divider } from '@mui/material'
import React, { FC, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { StreetModel } from '@/utils/Store/Models/Street/StreetModel';
import { StreetEdit } from './StreetEdit';
import DeleteStreet from './DeleteStreet';
import StreetTable from './StreetTable';
import styled from '@emotion/styled';
import { Delete } from '@mui/icons-material';
import { useAppSelector } from '@/utils/Store/hooks';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';

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



const StreetMenu: FC<{
    street: StreetModel, anchor: null | HTMLElement, handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}> = ({ street, anchor, handleClose }) => {
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
    const [openTable, setOpenTable] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const currentUser = useAppSelector(selectCurrentUser)

    return (
        <>

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} >
                <StreetEdit street={street} onClose={setOpenEditDialog} />
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DeleteStreet street={street} onClose={setDeleteDialog} />
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
                    setOpenTable(true),
                        handleClose
                }} disableRipple>
                    <InfoIcon color='success' />
                    Info
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                {
                    currentUser?.role_type !== 'Visitor' && (
                        <Box>
                            <MenuItem onClick={() => {
                                setOpenEditDialog(true)
                                handleClose
                            }} disableRipple>
                                <EditIcon color='warning' />
                                Edit
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={() => {
                                setDeleteDialog(true),
                                    handleClose
                            }} disableRipple>
                                <Delete color='error' />
                                Șterge
                            </MenuItem>
                        </Box>

                    )
                }

            </StyledMenu>
            <Dialog fullScreen maxWidth="md" open={openTable} onClose={() => setOpenTable(false)}>
                <StreetTable street={street} />
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

export default StreetMenu