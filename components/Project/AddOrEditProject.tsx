'use client'

import { addProjectAction, updateProjectAction } from '@/utils/Store/Actions/ProjectAction';
import { LocalityModel } from '@/utils/Store/Models/LocalityModel';
import { CountyModel } from '@/utils/Store/Models/CountyModel';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { Autocomplete, Container, Dialog, DialogTitle, FormControl, FormGroup, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import React, { FC, useEffect, useState } from 'react'
import { localities } from "@/utils/localities"
import { Enums, Tables, TablesInsert } from '@/utils/Store/Models/Database';
import { ProjectModel } from '@/utils/Store/Models/Project/ProjectModel';
import { projectTypeItems } from '@/utils/Store/items/projectTypeItems';
import { getUsersAction } from '@/utils/Store/Actions/UsersActions';
import { selectAssignedUsers, selectUsers } from '@/utils/Store/Selectors/usersSelectors';
import { ChipsArray } from '../Material/ChipArray';
import { assignUsersToProjectAction, getAssignedUsersAction } from '@/utils/Store/Actions/PermissionActions';

type UserChip = {
    id: string,
    key: string,
    label: string
}


export const AddOrEditProject: FC<{
    setOpenAddMarker: Function,
    project?: ProjectModel
}> = ({ setOpenAddMarker, project }) => {
    const [name, setName] = useState<string>(project?.name ?? '')
    const [info, setInfo] = useState<string>(project?.info ?? '')
    const [loading, setLoading] = useState(false)
    const [counties, setCounties] = useState<CountyModel[]>([])
    const [cities, setCities] = useState<LocalityModel[]>([])
    const [selectedCounty, setSelectedCounty] = useState<CountyModel | null>(null)
    const [selectedCity, setSelectedCity] = useState<LocalityModel | null>(null)
    const [projectType, setProjectType] = useState<Enums<'project_type'>>(project?.project_type ?? 'Stalpi')
    const [usersArray, setUsersArray] = useState<any>([])
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers)
    const assignedUsers = useAppSelector(selectAssignedUsers)

    const handleSubmit = () => {
        setLoading(true)
        if (!project) {
            dispatch(addProjectAction({
                name: name,
                long: Number(selectedCity!.lng),
                lat: Number(selectedCity?.lat),
                project_type: projectType,
                county: selectedCounty!.auto,
                city: selectedCity!.nume,
                info: info
            })).then(() => {
                setLoading(false)
                setOpenAddMarker(false)
            })
        } else {
            dispatch(updateProjectAction({
                id: project.id,
                name: name,
                long: Number(selectedCity!.lng),
                lat: Number(selectedCity!.lat),
                project_type: projectType,
                county: selectedCounty?.auto,
                city: selectedCity?.nume,
                info: info
            })).then((res) => {
                if (res?.severity === 'success') {
                    const usersWithProject: TablesInsert<'users_projects'>[] = usersArray.map((chip: UserChip) => {
                        return {
                            user_id: chip.id,
                            project_id: project.id
                        }
                    })
                    dispatch(assignUsersToProjectAction(usersWithProject, project))
                    setLoading(false)
                    setOpenAddMarker(false)
                } else {
                    setLoading(false)
                }
            })
        }

    }
    const getCounties = async () => {
        await fetch(`https://roloca.coldfuse.io/judete`, { cache: 'force-cache' }).then((res) => {
            res.json().then((data) => {
                setCounties(data)
                if (project) {
                    const county: CountyModel = data.find((item: CountyModel) => item.auto === project?.county)
                    setSelectedCounty({ nume: county.nume, auto: county.auto })
                    setSelectedCity({ auto: project.city, lat: project.lat!, lng: project?.long!, nume: project.city, id: 0 })
                }
            })
        })

    }
    useEffect(() => {
        let locality = localities.filter((item) => item.auto === selectedCounty?.auto)
        locality.sort((a, b) => a.nume.localeCompare(b.nume))
        setCities(locality as any)
    }, [selectedCounty])

    useEffect(() => {
        getCounties()
        dispatch(getUsersAction())
        if (project) {
            dispatch(getAssignedUsersAction(project?.id!))
        }
    }, [])

    useEffect(() => {
        if (assignedUsers.length > 0) {
            const usersToChip = assignedUsers.map((user) => {
                return {
                    key: user.user_id,
                    label: user.users.email,
                    id: user.user_id
                }
            })
            setUsersArray(usersToChip)
        }
    }, [assignedUsers])
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1rem',
            minWidth: 300
        }}>
            <DialogTitle>{project ? `Editează proiectul ${project.city}` : "Adaugă proiect"}</DialogTitle>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tip proiect</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="street_id"
                    value={projectType}
                    label="Tip proiect"
                    onChange={(e) => setProjectType(e.target.value as any)}
                >
                    {
                        projectTypeItems.map((item) => {
                            return (
                                <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={counties}
                sx={{ width: 300 }}
                autoHighlight
                onChange={(event: any, newValue: CountyModel | null) => {
                    setSelectedCounty(newValue);
                }}
                value={selectedCounty}
                getOptionLabel={(option) => option.nume}
                getOptionKey={(option) => option.auto}
                renderInput={(params) => <TextField {...params} label="Județ" />}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cities}
                sx={{ width: 300 }}
                autoHighlight
                onChange={(event: any, newValue: LocalityModel | null) => {
                    setSelectedCity(newValue);
                }}
                value={selectedCity}
                getOptionLabel={(option) => option.nume}
                getOptionKey={(option) => option.id}
                renderInput={(params) => <TextField {...params} label="Oraș" />}
            />
            <TextField value={info} onChange={(e) => setInfo(e.target.value)} label='Info' />
            {project && (
                <>
                    <Typography>Lista access:</Typography>
                    <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option.email}
                        getOptionKey={(option) => option.id}
                        renderInput={(params) => <TextField {...params} label="Useri" />}
                        //@ts-ignore
                        onChange={(e: any, newValue: Tables<'users'>) => {
                            let item = {
                                key: newValue.id,
                                id: newValue.id,
                                label: newValue.email
                            }
                            if (!usersArray.some((user: Tables<'users'>) => user.id === item.id)) {
                                setUsersArray([...usersArray, item]);
                            }
                        }}
                    />
                    <ChipsArray array={usersArray} setArray={setUsersArray} />
                </>

            )}

            <Button disabled={loading} onClick={() => handleSubmit()} variant="contained" color='secondary'>{project ? `Modifică proiect` : "Adaugă proiect"}</Button>
        </Container>
    )
}
