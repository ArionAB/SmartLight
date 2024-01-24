import { addStreetAction } from '@/utils/Store/Actions/StreetActions'
import { Tables, TablesInsert } from '@/utils/Store/Models/Database'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { useAppDispatch } from '@/utils/Store/hooks'
import { Box, Button, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { FC, useState } from 'react'

export const AddStreet: FC<{
    project: ProjectModel
}> = ({ project }) => {
    const [form, setForm] = useState<TablesInsert<'strazi'>>({
        name: '',
        network_type: 'Torsadat',
        proiect_id: project.id,
        road_type: "M1"
    })

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = () => {
        dispatch(addStreetAction(form))
    }


    return (
        <>
            <DialogTitle>Adauga strada la proiectul "{project?.name}"</DialogTitle>
            <Divider />
            <Box sx={{
                display: "flex"
            }} flexDirection='column' gap={3} margin={1}>
                <TextField label="Nume" name="name" onChange={(e) => handleChange(e)} />
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
                <Button variant="contained" color="success" onClick={handleSubmitForm}>Adauga strada</Button>
            </Box>

        </>
    )
}
