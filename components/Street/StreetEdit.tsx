import { addStreetAction, updateStreetAction } from '@/utils/Store/Actions/StreetActions'
import { Tables, TablesUpdate } from '@/utils/Store/Models/Database'
import { useAppDispatch } from '@/utils/Store/hooks'
import { Box, Button, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { FC, useState } from 'react'

export const StreetEdit: FC<{
    street: Tables<'strazi'>,
    onClose: Function
}> = ({ street, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<TablesUpdate<'strazi'>>({
        id: street.id,
        name: street.name,
        network_type: street.network_type,
        road_type: street.road_type
    })

    const dispatch = useAppDispatch()
    const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = () => {
        setLoading(true)
        dispatch(updateStreetAction(form)).then((res) => {
            if (res?.severity === 'success') {
                setLoading(false)
                onClose(false)
            } else {
                setLoading(false)
            }
        })
    }


    return (
        <>
            <DialogTitle>Editeaza strada {street.name}</DialogTitle>
            <Divider />
            <Box sx={{
                display: "flex"
            }} flexDirection='column' gap={3} margin={1}>
                <TextField label="Nume" name="name" value={form.name} onChange={(e) => handleChange(e)} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tip retea</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="network_type"
                        value={form.network_type}
                        label="Tip retea"
                        onChange={handleChange}
                    >
                        <MenuItem value="Torsadat">Torsadat</MenuItem>
                        <MenuItem value="Subteran">Subteran</MenuItem>
                        <MenuItem value="Clasic">Clasic</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tip drum</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="road_type"
                        value={form.road_type}
                        label="Tip retea"
                        onChange={handleChange}
                    >
                        <MenuItem value="M1">M1</MenuItem>
                        <MenuItem value="M2">M2</MenuItem>
                        <MenuItem value="M3">M3</MenuItem>
                        <MenuItem value="M4">M4</MenuItem>
                        <MenuItem value="M5">M5</MenuItem>
                        <MenuItem value="M6">M6</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" disabled={loading} color="success" onClick={handleSubmitForm}>Editează strada</Button>
                <Button variant='outlined'>
                    Anulează
                </Button>
            </Box>
        </>
    )
}
