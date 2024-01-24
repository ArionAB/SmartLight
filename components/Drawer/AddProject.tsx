'use client'

import { addProjectAction } from '@/utils/Store/Actions/ProjectAction';
import { useAppDispatch } from '@/utils/Store/hooks';
import { Container, Dialog, DialogTitle, FormGroup, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import React, { FC, useState } from 'react'

export const AddProject: FC<{ setOpenAddMarker: Function }> = ({ setOpenAddMarker }) => {
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setLoading(true)
        dispatch(addProjectAction({
            name: name
        })).then(() => {
            setLoading(false)
            setOpenAddMarker(false)
        })
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1rem'
        }}>
            <DialogTitle>Adauga proiect</DialogTitle>
            <TextField onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Nume proiect" variant="outlined" />
            <Button disabled={loading} onClick={() => handleSubmit()} variant="contained" color='secondary'>Adauga proiect</Button>
        </Container>
    )
}
