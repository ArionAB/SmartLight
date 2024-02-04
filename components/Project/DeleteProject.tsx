import { deleteProjectAction } from '@/utils/Store/Actions/ProjectAction'
import { deleteStreetAction } from '@/utils/Store/Actions/StreetActions'
import { Tables } from '@/utils/Store/Models/Database'
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel'
import { useAppDispatch } from '@/utils/Store/hooks'
import { Box, Button, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

const DeleteProject: FC<{
    project: ProjectModel,
    onClose: Function
}> = ({ project, onClose }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        setLoading(true)

        //@ts-ignore
        dispatch(deleteProjectAction(project)).then((res) => {
            if (res?.severity === 'success') {
                setLoading(false)
                onClose(false)
            } else setLoading(false)
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
            <Typography sx={{ p: 2 }} textAlign={'center'}>Sunteti sigur ca doriti sa stergeti proiectul "{project?.city}"?</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 2
            }}>
                <Button variant='outlined' onClick={() => onClose(false)}>Anuleaza</Button>
                <Button variant='contained' disabled={loading} color='error' onClick={() => handleSubmit()}>Șterge</Button>
            </Box>

        </Box>


    )
}

export default DeleteProject