'use client'

import Box from '@mui/material/Box';
import React, { FC, useEffect, useState } from 'react'
import { Button, Card, Dialog, IconButton, Switch, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { selectFocusedProject } from '@/utils/Store/Selectors/projectSelectors';
import FolderIcon from '@mui/icons-material/Folder';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { selectIsTooltipOpen } from '@/utils/Store/Selectors/miscSelectors';
import { setDrawer, setTooltips } from '@/utils/Store/Slices/miscSlice';
import { createClient } from '@/utils/supabase/client';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';
import { setCurrentUser } from '@/utils/Store/Slices/usersSlice';
import withAuth from '../Auth/withAuth';
import { getUserAction } from '@/utils/Store/Actions/UsersActions';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/Store/Models/Database';
import { useRouter } from "next/navigation";
const Navbar: FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const focusedProject = useAppSelector(selectFocusedProject)
    const currentUser = useAppSelector(selectCurrentUser)
    const supabase = createClientComponentClient<Database>()
    const handleTooltipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTooltips(event.target.checked));
    };

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


    const handleSignOut = async () => {
        await supabase.auth.signOut()
        dispatch(setCurrentUser(null))
        router.push('/')
    }
    const isTooltips = useAppSelector(selectIsTooltipOpen)
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
                <Switch checked={isTooltips} onChange={handleTooltipChange} />
                {/* <Dialog fullScreen open={openLogin} onClose={() => setOpenLogin(false)}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: "0 auto",
                        width: "100%"
                    }}>
                        <Image src="/logo-illu.jpeg" width="250" height="250" alt='logo' objectFit="contained" />
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxWidth: '600px',
                            padding: '1rem',
                        }}>
                            <TextField label="Email" type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField label="Parola" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Link href="/">Login</Link>
                            <Button LinkComponent={'a'} href='/login' variant="contained" color='primary'>Login</Button>
                        </Card>
                    </Box>
                </Dialog> */}
                {
                    currentUser ? (<Button variant='contained' onClick={() => handleSignOut()}>Logout</Button>) :
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