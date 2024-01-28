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

export const AddMarker: FC<{
    selectedMarker: Enums<'marker_type'>,
    position: string[],
    setOpen: Function
}> = ({
    selectedMarker,
    position,
    setOpen
}) => {
        const [marker, setMarker] = useState({
            number: '',
            observatii: '',
            lamp_type: '',
            power_type: ''
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


            let markerData: TablesInsert<'markers'> = {
                latitude: position[0],
                longitude: position[1],
                marker_type: selectedMarker,
                marker_status: 'Ok',
                proiect_id: focusedProject.item.id,
                street_id: focusedProject.street.id,
                images: imageUrls,
                observatii: marker.observatii,
                //@ts-ignore
                number: focusedProject.street.markers.length + 1
            }



            if (selectedMarker === 'Lampa') {
                //@ts-ignore
                markerData.power_typr = marker.power_type
            } else {
                //@ts-ignore
                markerData.lamp_type = marker.lamp_type
            }



            dispatch(addMarkerAction(markerData)).then(() => {
                setLoading(false),
                    setOpen(false)
            })


        }


        return (
            <Container >
                <DialogTitle>Adauga {selectedMarker}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{
                        gap: '10px'
                    }}>
                        {selectedMarker === 'Lampa' ? (
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
                        ) : (
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
                        )}

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
                            <Button variant='outlined'>Anuleaza</Button>
                            <Button type="submit" variant='contained' color="success">Adauga</Button>
                        </ButtonGroup>
                    </FormGroup>
                </form>
            </Container>
        )
    }
