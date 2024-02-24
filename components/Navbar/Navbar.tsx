'use client'

import Box from '@mui/material/Box';
import React, { FC, useEffect } from 'react'
import { Avatar, Button, IconButton, Switch, Typography } from '@mui/material';
import Image from 'next/image';
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
const Navbar: FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)
    const currentUser = useAppSelector(selectCurrentUser)
    const supabase = createClientComponentClient<Database>()
    const hasInternet = useAppSelector(selectHasInternet)


    const handleToggleDrawer = () => {
        dispatch(setDrawer(true))
    }

    useEffect(() => {

        const currentUser = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser()
            if (user) {
                dispatch(getUserAction(user.id))
                dispatch(setCurrentUser(user))
            }
        }

        currentUser()
    }, [])

    useEffect(() => {
        const offlineProject = localStorage.getItem('project')

        if (offlineProject && hasInternet) {
            let parsedProject = [JSON.parse(offlineProject)]

            let markersArray: any[] = []

            parsedProject.forEach((project: any) => {
                project.strazi.forEach((street: any) => {
                    if (street?.markersArray) {
                        const offlineMarkers = street?.markersArray?.filter((marker: any) => !marker.id)
                        markersArray = markersArray.concat(offlineMarkers)
                    }
                })

            })
            if (markersArray.length > 0) {
                dispatch(addOfflineMarkers(markersArray))
            }

        }

    }, [hasInternet])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        dispatch(setCurrentUser(null))
        router.push('/')
    }


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
                width: '100%'
            }}>
                <IconButton onClick={handleToggleDrawer}>
                    <MenuOpenIcon />
                </IconButton>
                <FolderIcon sx={{
                    color: '#F8D775'
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

                {
                    currentUser ? (
                        <Box onClick={() => handleSignOut()} sx={{
                            cursor: 'pointer'
                        }}>
                            <BackgroundLetterAvatars name={`${currentUser?.first_name}, ${currentUser?.last_name}`} />
                        </Box>) :
                        (<Link style={{
                            background: "#1976d2", color: "#fff", padding: '5px 10px', borderRadius: '3px'
                        }} href="/login">LOGIN</Link>)
                }
            </Box>
        </Box >
    )
}
//@ts-ignore
// export default withAuth(Navbar, false)
export default Navbar