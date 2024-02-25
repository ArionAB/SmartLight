import { Tables, TablesUpdate } from '@/utils/Store/Models/Database'
import { lampItems } from '@/utils/Store/items/lampItems'
import { poleTypeItems } from '@/utils/Store/items/poleTypeItems'
import { getImage } from '@/utils/supabase/getImage'
import styled from '@emotion/styled'
import { Box, Container, DialogTitle, FormControl, Grid, InputLabel, Select, SelectChangeEvent, Typography, MenuItem, Switch, SwitchProps, TextField, Button, IconButton, } from '@mui/material'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import FileUploadComponent from '../FileUpload/FileUploadComponent'
import { Close } from '@mui/icons-material'
import supabase from '@/utils/supabase/createClient'
import { updateMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { powerTypeItems } from '@/utils/Store/items/powerTypeItems'
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors'

export const StreetMarkerDetails: FC<{
    marker: Tables<'markers'>,
    setOpen: Function,
}> = ({ marker, setOpen }) => {
    const [form, setForm] = useState<any>({
        lamp_type: marker.lamp_type,
        pole_type: marker.pole_type,
        marker_status: marker.marker_status,
        observatii: marker.observatii,
        images: marker.images,
        latitude: marker.latitude,
        longitude: marker.longitude,
        power_type: marker.power_type
    })
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser)

    const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const uploadPictures = (newFiles: any) => {
        setUploadedFiles(newFiles)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const imageUrls: string[] = [];
        for (let file of uploadedFiles) {
            let { data, error } = await supabase.storage.from('illumitech-bucket').upload(`${file.name}`, file);
            if (error) throw error;
            imageUrls.push(data!.path);
        }

        //@ts-ignore
        form.images = imageUrls

        let markerData: TablesUpdate<'markers'> = {
            ...form,
            marker_status: 'Ok',
            marker_type: marker.marker_type,
            id: marker.id
        }

        dispatch(updateMarkerAction(markerData)).then(() => {
            setOpen(false)
            setLoading(false)
        })
    }


    return (
        <Container max-width='1200' >
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Typography textAlign={'center'} fontWeight={600}>{marker?.marker_type === 'Senzor' ? marker?.sensor_type : marker.marker_type} #{marker?.number}</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </DialogTitle>

                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            fullWidth
                            value={form.latitude ?? ''}
                            name="latitude"
                            label="Latitudine"
                            onChange={handleChange}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            fullWidth
                            value={form.longitude ?? ''}
                            name="longitude"
                            label="Longitudine"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {
                            marker.marker_type === 'Stalp' && (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tip lampa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form.lamp_type}
                                        label="Tip lampa"
                                        name='lamp_type'
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            lampItems?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )
                        }
                        {
                            marker.marker_type === 'Lampa' && (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tip lampa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form.power_type}
                                        label="Tip lampa"
                                        name='power_type'
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            powerTypeItems?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )
                        }
                    </Grid>
                    {
                        marker.marker_type !== 'Senzor' && (
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tip stalp</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form.pole_type}
                                        label="Tip stalp"
                                        name='pole_type'
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            poleTypeItems?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observații"
                            multiline
                            maxRows={4}
                            fullWidth
                            value={form.observatii ?? ''}
                            name="observatii"
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        {
                            marker?.images && marker?.images?.length > 0 ? (
                                marker.images?.map((image, index) => {
                                    return (
                                        <Image src={getImage(image)}
                                            key={index}
                                            alt={image}
                                            width={250}
                                            height={300}
                                            objectFit="contain"
                                            placeholder='blur'
                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                                        />
                                    )
                                })
                            ) : (
                                <Typography width='100%' textAlign='center'>Nu exista poze momentan</Typography>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} >
                        <FileUploadComponent onFilesChange={uploadPictures} />
                    </Grid>
                    <Grid item xs={12} width="100%" sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginBottom: '1rem',
                    }}>
                        <Button variant='outlined' onClick={() => setOpen(false)}>
                            Anulează
                        </Button>
                        <Button disabled={loading || currentUser?.role_type === 'Visitor'} variant="contained" type="submit" color="secondary">
                            Salvează
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    )
}
