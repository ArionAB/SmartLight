import { createUserAction } from '@/utils/Store/Actions/AuthActions'
import { TablesInsert } from '@/utils/Store/Models/Database'
import { AddUserModel } from '@/utils/Store/Models/Users/AddUserModel'
import { useAppDispatch } from '@/utils/Store/hooks'
import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddUser = () => {
    const [form, setForm] = useState<AddUserModel>({
        email: "",
        password: ''
    })

    const dispatch = useAppDispatch()

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: "column",
            padding: "1rem",
            gap: "1rem",
            width: "100%",
            minWidth: "300px"
        }}>
            <Typography textAlign={'center'} variant='h6'>Adaugă utilizator</Typography>
            <TextField fullWidth onChange={(e) => setForm({ ...form, email: e.target.value })} label="Email" variant="outlined" />
            <TextField fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} label="Parola" variant="outlined" />
            <Button onClick={() => dispatch(createUserAction(form))} variant='contained' color='success'>Adaugă</Button>
            <Button>Anulează</Button>
        </Container>
    )
}

export default AddUser