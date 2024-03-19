'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MapIcon from '@mui/icons-material/Map';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/utils/Store/hooks';
import { selectCurrentUser } from '@/utils/Store/Selectors/usersSelectors';

export default function BottomTabs() {
    const [tab, setTab] = useState<number>(0)
    const pathname = usePathname()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const currentUser = useAppSelector(selectCurrentUser)
    return (
        <Box sx={{
            display: pathname === '/login' ? 'none' : 'flex',
            alignItems: "center",
            justifyContent: "space-around",
            height: '64px',
            backgroundColor: "#fff",
            zIndex: '9999',
            width: '100%',
        }}>
            {currentUser?.role_type === 'Admin' ? (
                <Tabs
                    value={tab}
                    onChange={handleChange}
                >
                    <Tab icon={<MapIcon />} component={Link} href='/' />
                    <Tab icon={<GroupIcon />} component={Link} href='/users' />
                    <Tab icon={<SettingsIcon />} component={Link} href='/settings' />
                    <Tab icon={<LeaderboardIcon />} component={Link} href='/statistics' />
                </Tabs>
            ) : (
                <Tabs
                    value={tab}
                    onChange={handleChange}
                >
                    <Tab icon={<MapIcon />} component={Link} href='/' />
                </Tabs>
            )}

        </Box>
    );
}
