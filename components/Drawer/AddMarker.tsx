import { Enums, TablesInsert } from '@/utils/Store/Models/Database'
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Button, ButtonGroup, CircularProgress, Container, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import FileUploadComponent from '../FileUpload/FileUploadComponent'
import supabase from '@/utils/supabase/createClient'
import { addMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { powerTypeItems } from '@/utils/Store/items/powerTypeItems'
import { lampItems } from '@/utils/Store/items/lampItems'
import { poleTypeItems } from '@/utils/Store/items/poleTypeItems'
import { addAppNotification } from '@/utils/Store/Slices/appNotificationSlice'
import { LocationModel } from '@/utils/Store/Models/Location/LocationModel'
import { sensorTypeItems } from '@/utils/Store/items/sensorTypeItems'
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors'
import { selectHasInternet } from '@/utils/Store/Selectors/miscSelectors'
import { StreetModel } from '@/utils/Store/Models/Street/StreetModel'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { setMarker as dispatchMarker } from '@/utils/Store/Slices/projectSlice'
import { IOSSwitch } from '../Material/iOSSwitch'

export const AddMarker: FC<{
    selectedMarker: Enums<'marker_type'>,
    position: LocationModel,
    setOpen: Function,
    accuracy: string
}> = ({
    selectedMarker,
    position,
    setOpen,
    accuracy
}) => {
        const [marker, setMarker] = useState({
            number: '',
            observatii: '',
            lamp_type: 'Cu lampa',
            pole_type: 'SE4',
            power_type: '60W',
            sensor_type: '',
            hub_c: false,
        })
        const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
        const [loading, setLoading] = useState(false)

        const currentUser = useAppSelector(selectCurrentUser)
        const hasInternet = useAppSelector(selectHasInternet)

        const dispatch = useAppDispatch()


        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
            setMarker({ ...marker, [event.target.name]: event.target.value })

        }


        const uploadPictures = (newFiles: any) => {
            setUploadedFiles(newFiles)
        };

        const focusedProject = useAppSelector(selectFocusedProject)

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!focusedProject) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: "Trebuie sa selectati un proiect si o strada!"
                }))
                return
            }

            setLoading(true)


            let markerNumber = 1

            if (hasInternet) {
                if (!focusedProject.street?.markersArray?.length) {
                    markerNumber = 1
                } else {
                    let lastMarker = { ...focusedProject.street.markersArray[focusedProject.street.markersArray.length - 1] }
                    const increment = Number(lastMarker.number!) + 1
                    markerNumber = increment
                }
            }


            const currentDate = new Date();
            const timestamp = currentDate.toISOString().replace(/[-:]/g, '').split('.')[0];
            const year = timestamp.slice(0, 4);
            const month = timestamp.slice(4, 6);
            const day = timestamp.slice(6, 8);
            const hour = timestamp.slice(9, 11);
            const minute = timestamp.slice(11, 13);
            const second = timestamp.slice(13, 15);
            const imageUrls: string[] = [];

            for (let file of uploadedFiles) {
                const randomNumber = Math.floor(Math.random() * 1000) + 1;
                let { data, error } = await supabase.storage
                    .from('illumitech-bucket')
                    .upload(focusedProject.item.city + '/' + focusedProject.street.name + "/" + `${markerNumber}/${file.name}-${year}-${month}-${day}-${hour}-${minute}-${second}-${randomNumber}`, file);
                if (error) throw error;
                imageUrls.push(data!.path);
            }




            let markerData: TablesInsert<'markers'> = {
                latitude: position.lat.toString(),
                longitude: position.lng.toString(),
                marker_type: selectedMarker,
                marker_status: 'Ok',
                proiect_id: focusedProject.item.id,
                street_id: focusedProject.street.id,
                images: imageUrls,
                observatii: marker.observatii,
                accuracy: accuracy,
                number: markerNumber,
                hub_c: marker.hub_c

            }

            if (hasInternet) {
                markerData.user_id = currentUser?.id
            } else {
                const offlineUser: any = localStorage.getItem('user')
                if (offlineUser) {
                    const parsedUser = JSON.parse(offlineUser)
                    markerData.user_id = parsedUser.id
                }
            }

            if (selectedMarker === 'Lampa') {
                //@ts-ignore
                markerData.power_type = marker.power_type ?? '60W'
            }
            if (selectedMarker === 'Stalp') {
                //@ts-ignore
                markerData.lamp_type = marker.lamp_type ?? 'Cu lampa'
                //@ts-ignore
                markerData.pole_type = marker.pole_type ?? 'Lemn'
            }

            if (selectedMarker === 'Senzor') {
                //@ts-ignore
                markerData.sensor_type = marker.sensor_type ?? 'Punct de aprindere'
            }


            if (hasInternet) {
                dispatch(addMarkerAction(markerData)).then(() => {
                    setLoading(false),
                        setOpen(false)
                })
            } else {
                const offlineProjects = localStorage.getItem('project')
                if (offlineProjects) {
                    // try {
                    const project: ProjectModel = JSON.parse(offlineProjects)

                    if (project.strazi && project.strazi.length > 0) {
                        const street: StreetModel | undefined = project.strazi.find((street: StreetModel) => street.id === markerData.street_id);
                        if (street) {
                            if (!street.markersArray) {
                                street.markersArray = [];
                            }

                            let markerNumber = 1;

                            if (!street.markersArray.length) {
                                markerNumber = 1;
                            } else {
                                let lastMarker = { ...street.markersArray[street.markersArray.length - 1] };
                                const increment = Number(lastMarker.number!) + 1;
                                markerNumber = increment;
                            }

                            markerData.number = markerNumber;

                            //@ts-ignore
                            street.markersArray.push(markerData);

                            if (!street.markers || Number(street.markers.length) === 0) {
                                street.markers = [{ count: 0 }];
                            } else {
                                street.markers[0].count++;
                            }

                            if (!project.markers || Number(project.markers.length) === 0) {
                                project.markers = [{ count: 0 }];
                            } else {
                                project.markers[0].count++;
                            }

                            dispatch(dispatchMarker(markerData))

                        }
                        localStorage.setItem('project', JSON.stringify(project))
                        dispatch(addAppNotification({
                            severity: 'success',
                            message: `${selectedMarker} adaugat cu success!`
                        }))
                        setLoading(false),
                            setOpen(false)
                    }
                    // } catch (error) {
                    //     console.log(error)
                    //     dispatch(addAppNotification({
                    //         severity: 'error',
                    //         message: `eroare adaugare marker (${error})`
                    //     }))
                    // }
                }

            }

        }


        return (
            <Container >
                <DialogTitle textAlign={'center'}>{selectedMarker === 'Senzor' ? 'Adaugă senzor sau punct de aprindere' : `Adaugă ${selectedMarker}`}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{
                        gap: '10px'
                    }}>
                        {selectedMarker === 'Lampa' && (
                            <>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Tip lampa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="power_type"
                                        value={marker.power_type}
                                        label="Tip lampa"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            powerTypeItems?.map((item: any) => {
                                                return (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 1 }} onChange={(e) => setMarker({ ...marker, hub_c: e.target.checked })} checked={marker.hub_c} />}
                                    label="HUB-C"
                                />
                            </>

                        )}
                        {selectedMarker === "Stalp" && (
                            <>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Tip lampa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="lamp_type"
                                        value={marker.lamp_type}
                                        label="Tip lampa"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            lampItems?.map((item: any) => {
                                                return (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Tip stalp</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="pole_type"
                                        value={marker.pole_type}
                                        label="Tip stalp"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            poleTypeItems?.map((item: any) => {
                                                return (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </>

                        )}
                        {
                            selectedMarker === 'Senzor' && (
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Tip</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="sensor_type"
                                        value={marker.sensor_type}
                                        label="Tip"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            sensorTypeItems?.map((item: any) => {
                                                return (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )
                        }

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observații"
                            multiline
                            maxRows={4}
                            fullWidth
                            name="observatii"
                            onChange={(e) => handleChange(e)}
                        />
                        <DialogTitle>Poze</DialogTitle>
                        {hasInternet && <FileUploadComponent onFilesChange={uploadPictures} />}
                        <ButtonGroup sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: "1rem",
                        }}>
                            <Button variant='outlined' onClick={() => setOpen(false)}>Anuleaza</Button>
                            {loading ? <CircularProgress sx={{
                                color: "rgba(0, 0, 0, 0.26)"
                            }} /> : <Button type="submit" variant='contained' color="success">Adauga</Button>}
                        </ButtonGroup>
                    </FormGroup>
                </form>
            </Container>
        )
    }
