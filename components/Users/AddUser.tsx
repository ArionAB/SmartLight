import { createUserAction } from '@/utils/Store/Actions/UsersActions'
import { Enums } from '@/utils/Store/Models/Database'
import { AddUserModel } from '@/utils/Store/Models/Users/AddUserModel'
import { useAppDispatch } from '@/utils/Store/hooks'
import { roleTypeItems } from '@/utils/Store/items/roleTypeItems'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

const AddUser: FC<{
    onClose: Function
}> = ({
    onClose
}) => {
        const [form, setForm] = useState<AddUserModel>({
            email: "",
            password: '',
            role: 'User',
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
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={form.role}
                        label="Rol"
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        {
                            roleTypeItems?.map((item: Enums<'role_type'>) => {
                                return (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Button onClick={() => dispatch(createUserAction(form))} variant='contained' color='success'>Adaugă</Button>
                <Button onClick={() => onClose(false)}>Anulează</Button>
            </Container>
        )
    }

export default AddUser