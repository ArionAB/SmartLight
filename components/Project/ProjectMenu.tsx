import { Box, IconButton, Menu, Dialog, Button, MenuItem, MenuProps, alpha, Divider } from '@mui/material'
import React, { FC, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { Delete } from '@mui/icons-material';
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel';
import { AddOrEditProject } from './AddOrEditProject';
import DeleteProject from './DeleteProject';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { getMarkersAction } from '@/utils/Store/Actions/MarkerActions';
import MapIcon from '@mui/icons-material/Map';
import { useMap } from 'react-leaflet';
import { flyToLocation } from '../Map/FlyToLocation';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { addAppNotification } from '@/utils/Store/Slices/appNotificationSlice';
import { DeleteDialog } from '../Notifications/DeleteDialog';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as XLSX from 'xlsx';
import { selectHasInternet } from '@/utils/Store/Selectors/miscSelectors';
import { MarkersExcelModel } from '@/utils/Store/Models/Markers/MarkersExcelModel';
import { exportProjectAsExcel } from '@/utils/Store/Actions/ExcelActions';


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



const ProjectMenu: FC<{
    project: ProjectModel, anchor: null | HTMLElement, handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void, setAnchor: Function
}> = ({ project, anchor, handleClose, setAnchor }) => {
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
    const [openTable, setOpenTable] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [existingProject, setExistingProject] = useState<ProjectModel | null>(null)

    const hasInternet = useAppSelector(selectHasInternet)
    const currentUser = useAppSelector(selectCurrentUser)
    const map = useMap();
    const dispatch = useAppDispatch()

    const checkIfProjectExists = () => {
        const offlineProject = localStorage.getItem('project')
        if (offlineProject) {
            setExistingProject(JSON.parse(offlineProject))
        } else {
            saveProjectToLocalStorage()
        }
    }

    const saveProjectToLocalStorage = () => {
        localStorage.setItem("project", JSON.stringify(project))
        dispatch(addAppNotification({
            severity: 'success',
            message: "Proiectul a fost descărcat!"
        }))
        setExistingProject(null)
    }



    const handleGoToLocation = (lat: number, lng: number) => {
        flyToLocation(map, lat, lng)
    }

    const handleExportExcel = () => {
        let markersForExcel: MarkersExcelModel[] = []
        dispatch(exportProjectAsExcel(project)).then((res: any) => {
            res.map((marker: any) => {
                let data: MarkersExcelModel = {
                    strada: '',
                    numar: 0,
                    latitudine: '',
                    longitudine: '',
                    stalp: '',
                    lampa: '',
                    tip: '',
                    observatii: '',
                    putere: '',
                    hub_c: '',
                    'serie controller': '',
                };
                let street = project.strazi.find((strada) => strada.id === marker.street_id);
                data.strada = street!.name;
                data.numar = marker.number;
                data.latitudine = marker.latitude;
                data.longitudine = marker.longitude;
                data.stalp = marker.pole_type;
                data.lampa = marker.lamp_type;
                data.tip = marker.marker_type;
                data.observatii = marker.observatii;
                data.putere = marker.power_type;
                data['serie controller'] = marker.series_number
                data.hub_c = marker.hub_c ? 'Da' : "Nu";
                markersForExcel.push(data);
            });

            // Sort the markers alphabetically by street name
            markersForExcel.sort((a, b) => (a.strada > b.strada) ? 1 : ((b.strada > a.strada) ? -1 : 0));

            const worksheet = XLSX.utils.json_to_sheet(markersForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

            const blobURL = URL.createObjectURL(blob);

            // Create a temporary anchor element
            const tempLink = document.createElement('a');
            tempLink.href = blobURL;
            tempLink.setAttribute('download', `${project.city}.xlsx`); // Set the file name
            tempLink.style.display = 'none'; // Make sure it's not visible

            // Append the anchor to the document body
            document.body.appendChild(tempLink);

            // Programmatically click the anchor to initiate download
            tempLink.click();

            // Clean up: remove the anchor from the document
            document.body.removeChild(tempLink);

            // Revoke the Blob URL to free up memory
            URL.revokeObjectURL(blobURL);

        })

    }


    return (
        <>
            <DeleteDialog
                open={existingProject ? true : false}
                setOpen={setExistingProject}
                yesAction={saveProjectToLocalStorage}
                title='Aveți deja un proiect descărcat!'
                message={`Sunteți sigur că doriți să descărcați un alt proiect și să-l ștergeți pe cel deja descărcat "${existingProject?.city}"?`}
            />

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} >
                <AddOrEditProject setOpenAddMarker={setOpenEditDialog} project={project} />
                <Button sx={{ marginBottom: '1rem', marginX: '24px' }} variant='outlined' onClick={() => setOpenEditDialog(false)}>Anulează</Button>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DeleteProject project={project} onClose={setDeleteDialog} />
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
                    handleGoToLocation(Number(project.lat), Number(project.long))
                }} disableRipple>
                    <MapIcon />
                    Locație
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    dispatch(getMarkersAction(undefined, project))
                }} disableRipple>
                    <VisibilityIcon color='info' />
                    Afișează proiect
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    checkIfProjectExists()
                }} disableRipple>
                    <DownloadForOfflineIcon color="primary" />
                    Descarcă offline
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem disabled={!hasInternet} onClick={() => {
                    handleExportExcel()
                }} disableRipple>
                    <GetAppIcon color="success" />
                    Export ca Excel
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                {
                    currentUser?.role_type === 'Admin' && (
                        <Box>
                            <MenuItem onClick={() => {
                                setOpenEditDialog(true)
                            }} disableRipple>
                                <EditIcon color='warning' />
                                Edit
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                        </Box>

                    )
                }

                {
                    currentUser?.role_type === 'Admin' && (
                        <MenuItem onClick={() => {
                            setDeleteDialog(true)
                        }} disableRipple>
                            <Delete color="error" />
                            Șterge
                        </MenuItem>
                    )
                }

            </StyledMenu>
            <Dialog fullScreen maxWidth="md" open={openTable} onClose={() => setOpenTable(false)}>
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