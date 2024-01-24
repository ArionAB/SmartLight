import { Enums, Tables, TablesInsert } from '@/utils/Store/Models/Database'
import { selectProjectItems } from '@/utils/Store/Selectors/projectSelectors'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Button, ButtonGroup, Container, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import FileUploadComponent from '../FileUpload/FileUploadComponent'
import supabase from '@/utils/supabase/createClient'
import { PositionModel } from '@/utils/Store/Models/Markers/PositionModel'
import { getStreetAction } from '@/utils/Store/Actions/StreetActions'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { addMarkerAction } from '@/utils/Store/Actions/MarkerActions'

export const AddMarker: FC<{
    selectedMarker: Enums<'marker_type'>,
    position: PositionModel,
    selectedProject?: ProjectModel,
    selectedStreet?: Tables<'strazi'>,
    setOpenMarker: Function
}> = ({
    selectedMarker,
    position,
    selectedProject,
    selectedStreet,
    setOpenMarker
}) => {
        const [marker, setMarker] = useState({
            proiect_id: selectedProject?.id ?? '',
            street_id: selectedStreet?.id ?? '',
            number: '',
            images: [],
            observatii: ''
        })
        const [streets, setStreets] = useState<Tables<'strazi'>[]>([])
        const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
        const [loading, setLoading] = useState(false)

        const dispatch = useAppDispatch()
        const projectItems = useAppSelector(selectProjectItems)



        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
            setMarker({ ...marker, [event.target.name]: event.target.value })

        }

        useEffect(() => {
            setStreets([])
            dispatch(getStreetAction(marker.proiect_id)).then((res) => {
                if (res?.severity === 'success') {
                    setStreets(res?.data ?? [])
                }

                console.log('res', res)

            })
        }, [marker.proiect_id])


        const uploadPictures = (newFiles: any) => {
            setUploadedFiles(newFiles)
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true)

            const imageUrls: string[] = [];
            for (let file of uploadedFiles) {
                let { data, error } = await supabase.storage.from('smart-light-bucket').upload(`${file.name}`, file);
                if (error) throw error;
                imageUrls.push(data!.path);
            }

            //@ts-ignore
            marker.images = imageUrls

            let markerData: TablesInsert<'markers'> = {
                ...marker,
                latitude: position.lat,
                longitude: position.lng,
                marker_type: selectedMarker,
                marker_status: 'Ok',
            }


            dispatch(addMarkerAction(markerData)).then(() => {
                setLoading(false)
            })


        }


        return (
            <Container >
                <DialogTitle>Adauga {selectedMarker}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{
                        gap: '10px'
                    }}>
                        <TextField label="Numar" name='number' value={marker.number} onChange={(e) => handleChange(e)}>
                        </TextField>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Proiect</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="proiect_id"
                                value={marker.proiect_id}
                                label="Proiect"
                                onChange={(e) => handleChange(e)}
                            >
                                {
                                    projectItems?.map((item: any) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Strada</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="street_id"
                                value={marker.street_id}
                                label="Strada"
                                onChange={(e) => handleChange(e)}
                            >
                                {
                                    streets?.map((item: Tables<'strazi'>) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
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
