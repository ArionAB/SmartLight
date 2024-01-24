'use client'

import { addProjectAction } from '@/utils/Store/Actions/AddProjectAction';
import { Container, Dialog, DialogTitle, FormGroup, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';

export const AddProject = () => {
    const [name, setName] = useState<string>('')
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('submit')
        console.log('name', name)

        //@ts-ignore
        dispatch(addProjectAction({
            name: name
        }))
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
            <Button onClick={() => handleSubmit()} variant="contained" color='secondary'>Adauga proiect</Button>
        </Container>
    )
}
