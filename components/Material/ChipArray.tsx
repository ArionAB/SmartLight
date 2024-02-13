import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

interface ChipData {
    key: number;
    label: string;
    id?: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export const ChipsArray: React.FC<{
    array: ChipData[],
    setArray: Function
}> = ({
    array,
    setArray
}) => {
        const handleDelete = (chipToDelete: ChipData) => () => {
            setArray((chips: ChipData[]) => chips.filter((chip) => chip.key !== chipToDelete.key));
        };

        return (
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                component="ul"
            >
                {array?.map((data) => {
                    let icon;

                    if (data.label === 'React') {
                        icon = <TagFacesIcon />;
                    }

                    return (
                        <ListItem key={data.key}>
                            <Chip
                                icon={icon}
                                label={data.label}
                                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            />
                        </ListItem>
                    );
                })}
            </Paper>
        );
    }