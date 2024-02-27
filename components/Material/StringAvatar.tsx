import * as React from 'react';
import Avatar from '@mui/material/Avatar';


function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: '#00695c',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function BackgroundLetterAvatars({ name }: any) {
    return (
        <Avatar {...stringAvatar(name)} />

    );
}