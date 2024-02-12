import { Enums, TablesInsert } from '@/utils/Store/Models/Database'
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Button, ButtonGroup, Container, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
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
            pole_type: '',
            power_type: '',
            sensor_type: ''
        })
        const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
        const [loading, setLoading] = useState(false)

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
            setLoading(true)

            const imageUrls: string[] = [];
            for (let file of uploadedFiles) {
                let { data, error } = await supabase.storage.from('smart-light-bucket').upload(`${file.name}`, file);
                if (error) throw error;
                imageUrls.push(data!.path);
            }

            if (!focusedProject) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: "Trebuie sa selectati un proiect si o strada!"
                }))
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

            }
            if (!focusedProject.street?.markersArray?.length) {
                markerData.number = '1'
            } else {
                let lastMarker = { ...focusedProject.street.markersArray[focusedProject.street.markersArray.length - 1] }
                const increment = Number(lastMarker.number!) + 1
                markerData.number = increment.toString()
            }


            if (selectedMarker === 'Lampa') {
                //@ts-ignore
                markerData.power_type = marker.power_type
            }
            if (selectedMarker === 'Stalp') {
                //@ts-ignore
                markerData.lamp_type = marker.lamp_type
                //@ts-ignore
                markerData.pole_type = marker.pole_type
            }

            if (selectedMarker === 'Senzor') {
                //@ts-ignore
                markerData.sensor_type = marker.sensor_type
            }



            dispatch(addMarkerAction(markerData)).then(() => {
                setLoading(false),
                    setOpen(false)
            })


        }


        return (
            <Container >
                <DialogTitle textAlign={'center'}>{selectedMarker === 'Senzor' ? 'Adaugă senzor sau punct de aprindere' : `Adaugă ${selectedMarker}`}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{
                        gap: '10px'
                    }}>
                        {selectedMarker === 'Lampa' && (
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
                        <FileUploadComponent onFilesChange={uploadPictures} />
                        <ButtonGroup sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: "1rem"
                        }}>
                            <Button variant='outlined' onClick={() => setOpen(false)}>Anuleaza</Button>
                            <Button disabled={loading} type="submit" variant='contained' color="success">Adauga</Button>
                        </ButtonGroup>
                    </FormGroup>
                </form>
            </Container>
        )
    }
