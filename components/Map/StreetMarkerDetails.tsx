import { Tables, TablesInsert, TablesUpdate } from '@/utils/Store/Models/Database'
import { lampItems } from '@/utils/Store/items/lampItems'
import { poleTypeItems } from '@/utils/Store/items/poleTypeItems'
import { getImage } from '@/utils/supabase/getImage'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Container, DialogTitle, FormControl, Grid, InputLabel, Select, SelectChangeEvent, Typography, MenuItem, Switch, SwitchProps, FormControlLabel, TextField, Button, Toolbar, AppBar, IconButton, ButtonGroup } from '@mui/material'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import FileUploadComponent from '../FileUpload/FileUploadComponent'
import { Close } from '@mui/icons-material'
import supabase from '@/utils/supabase/createClient'
import { updateMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { useAppDispatch } from '@/utils/Store/hooks'

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
    })
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const uploadPictures = (newFiles: any) => {
        setUploadedFiles(newFiles)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageUrls: string[] = [];
        for (let file of uploadedFiles) {
            let { data, error } = await supabase.storage.from('smart-light-bucket').upload(`${file.name}`, file);
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

        dispatch(updateMarkerAction(markerData))
    }

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    //@ts-ignore
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    //@ts-ignore
                    theme.palette.mode === 'light'
                        //@ts-ignore
                        ? theme.palette.grey[100]
                        //@ts-ignore
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                //@ts-ignore
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            //@ts-ignore
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            //@ts-ignore
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <Container max-width='1200' >
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        {marker?.marker_type} #{marker?.number}

                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label="Status"
                        />


                    </DialogTitle>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            fullWidth
                            value={form.latitude}
                            name="latitude"
                            label="Latitudine"
                            onChange={handleChange}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            fullWidth
                            value={form.longitude}
                            name="longitudine"
                            label="Longitudine"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
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
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observații"
                            multiline
                            maxRows={4}
                            fullWidth
                            value={form.observatii}
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
                                <Typography variant='h6' width='100%' textAlign='center'>Nu exista poze momentan</Typography>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} height={200}>
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
                        <Button variant="contained" type="submit" color="secondary">
                            Salvează
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    )
}
