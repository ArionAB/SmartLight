import { Tables, TablesUpdate } from '@/utils/Store/Models/Database'
import { lampItems } from '@/utils/Store/items/lampItems'
import { poleTypeItems } from '@/utils/Store/items/poleTypeItems'
import { getImage } from '@/utils/supabase/getImage'
import { Box, Container, DialogTitle, FormControl, Grid, InputLabel, Select, SelectChangeEvent, Typography, MenuItem, Switch, SwitchProps, TextField, Button, IconButton, FormControlLabel, FilledInput, InputAdornment, Dialog, } from '@mui/material'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import FileUploadComponent from '../FileUpload/FileUploadComponent'
import { Close, HighlightOff } from '@mui/icons-material'
import supabase from '@/utils/supabase/createClient'
import { updateMarkerAction } from '@/utils/Store/Actions/MarkerActions'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { powerTypeItems } from '@/utils/Store/items/powerTypeItems'
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors'
import { IOSSwitch } from '../Material/iOSSwitch'
import { deleteFilesActions } from '@/utils/Store/Actions/FilesActions'
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors'
import { selectHasInternet } from '@/utils/Store/Selectors/miscSelectors'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { StreetModel } from '@/utils/Store/Models/Street/StreetModel'
import { updateOfflineMarker } from '@/utils/Store/Slices/projectSlice'
import EditIcon from '@mui/icons-material/Edit';

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
        power_type: marker.power_type,
        hub_c: marker.hub_c,
        series_number: marker.series_number
    })

    const [url, setUrl] = useState<string>('')
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const [deletedImages, setDeletedImages] = useState<string[]>([])
    const [disabled, setDisabled] = useState({
        latitude: true,
        longitude: true,
        observatii: true,
        series_number: true
    })
    const [imageDialog, setImageDialog] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser)
    const focusedProject = useAppSelector(selectFocusedProject)
    const hasInternet = useAppSelector(selectHasInternet)

    const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const uploadPictures = (newFiles: any) => {
        setUploadedFiles(newFiles)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

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
            let { data, error } = await supabase.storage.from('illumitech-bucket')
                .upload(focusedProject.item.city + '/' + focusedProject.street.name + "/" + `${marker.number}/${file.name}-${year}-${month}-${day}-${hour}-${minute}-${second}-${randomNumber}`, file);
            if (error) throw error;
            imageUrls.push(data!.path);
        }

        //@ts-ignore
        form.images = imageUrls

        let markerData: TablesUpdate<'markers'> = {
            ...form,
            marker_type: marker.marker_type,
            id: marker.id
        }

        if (deletedImages.length > 0) {
            dispatch(deleteFilesActions(deletedImages)).then((res) => {
                if (res?.severity === 'success') {
                    dispatch(updateMarkerAction(markerData)).then(() => {
                        setOpen(false)
                        setLoading(false)
                    })
                }
            })
        } else {
            dispatch(updateMarkerAction(markerData)).then(() => {
                setOpen(false)
                setLoading(false)
            })
        }

    }

    const handleOfflineSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const offlineProject = localStorage.getItem('project')
        if (offlineProject) {

            let project: ProjectModel = JSON.parse(offlineProject)
            let street: StreetModel | undefined = project.strazi.find((street: StreetModel) => street.id === marker.street_id)
            const markerIndex = street!.markersArray.findIndex((item) => item.number === marker.number);
            if (markerIndex !== -1) {
                let markerData = {
                    ...form,
                    marker_status: marker.marker_status,
                    marker_type: marker.marker_type,
                    number: marker.number,
                    street_id: marker.street_id,
                    proiect_id: marker.proiect_id
                }

                street!.markersArray[markerIndex] = markerData
                dispatch(updateOfflineMarker(markerData))
            }
            localStorage.setItem('project', JSON.stringify(project))
            setTimeout(() => {
                setOpen(false)
            }, 500)
        }
    }

    const handleRemoveImage = (urlToRemove: string) => {
        setDeletedImages(deletedImages.concat(urlToRemove))
        const images = form.images!.filter((url: string) => url !== urlToRemove)
        setForm({ ...form, images: images })
    }

    const handleDisplayImage = (image: string) => {
        setUrl(getImage(image))
        setImageDialog(true)
    }


    return (
        <Container max-width='1200' >
            <Dialog open={imageDialog} onClose={() => setImageDialog(false)} fullScreen>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                </Box>
                <Box sx={{
                    height: "90dvh"
                }}>
                    <Image src={url}
                        alt={url}
                        objectFit="contain"
                        placeholder='blur'
                        quality="100"
                        layout="fill"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                    />
                </Box>

                <Button variant="contained" sx={{ minWidth: 200, maxWidth: "500px", margin: "0 auto" }} onClick={() => setImageDialog(false)}>Închide</Button>
            </Dialog>
            <form onSubmit={hasInternet ? handleSubmit : handleOfflineSave}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Typography textAlign={'center'} fontWeight={600}>{marker?.marker_type === 'Senzor' ? marker?.sensor_type : marker.marker_type} #{marker?.number}</Typography>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} onChange={(e) => setForm({ ...form, marker_status: e.target.checked ? 'Ok' : 'Bad' })} checked={form.marker_status === "Ok" ? true : false} />}
                            label="Status"
                        />
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
                            disabled={disabled.latitude}
                            name="latitude"
                            label="Latitudine"
                            onChange={handleChange}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            onClick={() => setDisabled({ ...disabled, latitude: !disabled.latitude })}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            fullWidth
                            value={form.longitude ?? ''}
                            name="longitude"
                            label="Longitudine"
                            onChange={handleChange}
                            disabled={disabled.longitude}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            onClick={() => setDisabled({ ...disabled, longitude: !disabled.longitude })}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                                <>
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
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} onChange={(e) => setForm({ ...form, hub_c: e.target.checked })} checked={form.hub_c} />}
                                        label="HUB-C/S"
                                    />
                                </>
                            )
                        }
                    </Grid>
                    {
                        marker.marker_type === 'Stalp' && (
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
                    {
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Serie controller"
                                fullWidth
                                name="series_number"
                                value={form.series_number ?? ''}
                                onChange={(e) => handleChange(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                color='warning'
                                                onClick={() => setDisabled({ ...disabled, series_number: !disabled.series_number })}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
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
                            disabled={disabled.observatii}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            onClick={() => setDisabled({ ...disabled, observatii: !disabled.observatii })}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',

                    }}>
                        {
                            hasInternet && marker?.images && marker?.images?.length > 0 ? (
                                marker.images?.map((image, index) => {
                                    return (
                                        <Box sx={{
                                            position: 'relative',
                                            cursor: 'pointer',
                                            display: form.images.includes(image) ? 'flex' : 'none'
                                        }}>
                                            <Image src={getImage(image)}
                                                key={index}
                                                alt={image}
                                                width={250}
                                                height={300}
                                                objectFit="contain"
                                                placeholder='blur'
                                                onClick={() => handleDisplayImage(image)}
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                                            />

                                            <IconButton color="error" onClick={() => handleRemoveImage(image)} sx={{
                                                position: 'absolute',
                                                top: -20,
                                                right: -20,
                                                background: "#fff"
                                            }}>
                                                <HighlightOff />
                                            </IconButton>
                                        </Box>

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
