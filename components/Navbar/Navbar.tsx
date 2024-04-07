'use client'

import Box from '@mui/material/Box';
import React, { FC, MouseEvent, useEffect, useState } from 'react'
import { Button, CircularProgress, Divider, FormControlLabel, IconButton, Popover, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors';
import FolderIcon from '@mui/icons-material/Folder';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { selectHasInternet, selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors';
import { setDrawer, setTooltips } from '@/utils/Store/Slices/miscSlice';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';
import { setCurrentUser } from '@/utils/Store/Slices/usersSlice';
import { getUserAction } from '@/utils/Store/Actions/UsersActions';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/Store/Models/Database';
import { useRouter } from "next/navigation";
import { addOfflineMarkers } from '@/utils/Store/Actions/MarkerActions';
import BackgroundLetterAvatars from '../Material/StringAvatar';
import { IOSSwitch } from '../Material/iOSSwitch';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortIcon from '@mui/icons-material/Sort';
import Filter from '../Filter/Filter';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addAppNotification } from '@/utils/Store/Slices/appNotificationSlice';

const Navbar: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null);
    const [loadingUpload, setLoadingUpload] = useState(false)


    const router = useRouter()
    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)
    const currentUser = useAppSelector(selectCurrentUser)
    const supabase = createClientComponentClient<Database>()
    const hasInternet = useAppSelector(selectHasInternet)
    const isTooltips = useAppSelector(selectIsTooltipOpen)


    const handleToggleDrawer = () => {
        dispatch(setDrawer(true))
    }

    useEffect(() => {

        const currentUser = async () => {
            const {
                data: { user }, error
            } = await supabase.auth.getUser()
            if (user) {
                dispatch(getUserAction(user.id))
                dispatch(setCurrentUser(user))
            }
            if (error) {
                router.push('/login')
            }

        }

        currentUser()
    }, [])

    const handleUploadOfflineMarkers = () => {
        setLoadingUpload(true)
        const offlineProject = localStorage.getItem('project')
        if (offlineProject && hasInternet) {
            let parsedProject = [JSON.parse(offlineProject)]

            let markersArray: any[] = []

            parsedProject.forEach((project: any) => {
                project.strazi.forEach((street: any) => {
                    if (street?.markersArray) {
                        let offlineMarkers = street?.markersArray?.filter((marker: any) => !marker.id)
                        markersArray = markersArray.concat(offlineMarkers)
                    }
                })
            })
            if (markersArray.length > 0) {
                dispatch(addOfflineMarkers(markersArray)).then(() => {
                    setLoadingUpload(false)
                })
            }

        } else setLoadingUpload(false)
    }

    const handleSignOut = async () => {
        handleClose()
        await supabase.auth.signOut()
        dispatch(setCurrentUser(null))
        router.push('/login')
    }

    const handleClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTooltipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTooltips(event.target.checked));
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            zIndex: '3',
            height: '55px',
            margin: '0 auto',
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '100%',
                minWidth: '200px'
            }}>
                <IconButton onClick={handleToggleDrawer}>
                    <MenuOpenIcon />
                </IconButton>
                <FolderIcon sx={{
                    color: focusedProject?.item?.project_type === 'Lampi' ? "#CC5500" : '#F8D775'
                }} />
                <Typography variant='caption'>{focusedProject?.item?.city}</Typography>
                <Typography variant='caption'>{focusedProject?.street?.name}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: "flex-end",
                alignItems: 'center',
                width: '100%',
                paddingRight: '10px'
            }}>
                <IconButton color='inherit' onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => setFilterAnchor(e.currentTarget)}>
                    <SortIcon />
                </IconButton>
                <Filter anchor={filterAnchor} setFilterAnchor={setFilterAnchor} />
                <IconButton sx={{ mr: 3 }} onClick={() => location.reload()}>
                    <RefreshIcon />
                </IconButton>
                {
                    currentUser ? (
                        <Box onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => handleClick(e)} sx={{
                            cursor: 'pointer'
                        }}>
                            <BackgroundLetterAvatars name={`${currentUser?.first_name}, ${currentUser?.last_name}`} />
                        </Box>) :
                        (<Link style={{
                            background: "#1976d2", color: "#fff", padding: '5px 10px', borderRadius: '3px'
                        }} href="/login">LOGIN</Link>)
                }
            </Box>
            <Popover
                open={anchorEl ? true : false}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }}>
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} onChange={handleTooltipChange} checked={isTooltips} />}
                        label="Detalii markeri"
                    />
                    <Divider sx={{ my: 0.5 }} />
                    {loadingUpload ? (
                        <CircularProgress sx={{ color: "rgba(0, 0, 0, 0.26)" }} />
                    ) : (
                        <Button
                            startIcon={<CloudUploadIcon />}
                            variant='contained'
                            color='success'
                            onClick={() => handleUploadOfflineMarkers()}
                        >
                            Încarcă markerii offline
                        </Button>
                    )}
                    <Divider sx={{ my: 0.5 }} />
                    <Button fullWidth variant='contained' color='info' onClick={() => handleSignOut()}>LOGOUT</Button>
                </Box>
            </Popover>
        </Box >
    )
}
//@ts-ignore
// export default withAuth(Navbar, false)
export default Navbar