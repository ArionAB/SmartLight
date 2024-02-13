import { editUserAction } from '@/utils/Store/Actions/UsersActions'
import { Tables } from '@/utils/Store/Models/Database'
import { useAppDispatch } from '@/utils/Store/hooks'
import { roleTypeItems } from '@/utils/Store/items/roleTypeItems'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { FC, useState } from 'react'

const EditUser: FC<{
    onClose: Function,
    selectedUser: Tables<'users'> | null
}> = ({
    onClose,
    selectedUser
}) => {
        const [form, setForm] = useState({
            first_name: selectedUser?.first_name ?? '',
            last_name: selectedUser?.last_name ?? '',
            role_type: selectedUser?.role_type ?? 'User'
        })
        const [loading, setLoading] = useState(false)

        const dispatch = useAppDispatch()

        const handleChange = (event: SelectChangeEvent<'Admin' | 'User' | "Visitor" | null> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm({ ...form, [event.target.name]: event.target.value });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setLoading(true)
            dispatch(editUserAction({
                ...form,
                id: selectedUser!.id
            })).then(() => {
                setLoading(false)
                onClose(false)
            })
        }
        return (
            <Container sx={{
                padding: "1rem"
            }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <TextField label="Nume" name='last_name' value={form.last_name ?? ''} onChange={(e) => handleChange(e)} />
                        <TextField label="Prenume" name="first_name" value={form.first_name ?? ''} onChange={(e) => handleChange(e)} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={form.role_type ?? 'User'}
                                label="Rol"
                                name='role_type'
                                onChange={(e) => handleChange(e)}
                            >
                                {
                                    roleTypeItems?.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button fullWidth type="submit" variant='contained' color='success'>Modifică</Button>
                        <Button fullWidth onClick={() => onClose(false)}>Anulează</Button>
                    </Box>
                </form>
            </Container>
        )
    }

export default EditUser