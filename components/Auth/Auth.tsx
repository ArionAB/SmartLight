'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Box, Button, Card, TextField } from '@mui/material';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks';
import { getUserAction } from '@/utils/Store/Actions/UsersActions';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/Store/Models/Database';
import { addAppNotification } from '@/utils/Store/Slices/appNotificationSlice';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';


const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch()
    const supabase = createClientComponentClient<Database>()
    const currentUser = useAppSelector(selectCurrentUser)


    const signIn = async () => {
        const { data } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        localStorage.setItem('session', JSON.stringify(data.session))
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(getUserAction(user.id))
            location.reload();

        }
        if (!user) {
            dispatch(addAppNotification({
                severity: "error",
                message: "Email sau parola incorecte"
            }))
        }
    }

    useEffect(() => {
        if (currentUser) {
            router.push('/')
        }
    }, [currentUser])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: "0 auto",
            width: "100%"
        }}>
            <Image src="/Logo-illu.jpeg" width="250" height="250" alt='logo' objectFit="contained" />
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '600px',
                padding: '1rem',
            }}>
                <TextField label="Email" type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email ?? ''} />
                <TextField label="Parola" type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password ?? ''} />
                <Button variant="contained" color='primary' onClick={() => signIn()}>Login</Button>
            </Card>
        </Box>
    )
}

export default Auth