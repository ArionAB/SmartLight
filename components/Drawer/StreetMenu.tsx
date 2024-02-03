import { Box, IconButton, Menu, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, tableCellClasses, Button } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StreetModel } from '@/utils/Store/Models/Project/StreetModel';
import styled from '@emotion/styled';


const StreetMenu: FC<{ street: StreetModel }> = ({ street }) => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [openTable, setOpenTable] = useState(false)


    const handleOpenStreetMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    }

    function createData(
        name: string,
        total: number,
        lamp: number,
        noLamp: number
    ) {
        return { name, total, lamp, noLamp };
    }


    let counter = street?.markers?.reduce((acc, obj) => {
        // Initialize the counts if they don't exist yet
        //@ts-ignore
        if (!acc[obj.pole_type]) {
            //@ts-ignore
            acc[obj.pole_type] = { total: 0, 'Cu lampa': 0, 'Fara lampa': 0 };
        }

        // Increment the total count for this pole_type
        //@ts-ignore
        acc[obj.pole_type].total++;

        // Increment the count for the lamp_type if it matches
        if (obj.lamp_type === 'Cu lampa') {
            //@ts-ignore
            acc[obj.pole_type]['Cu lampa']++;
        } else if (obj.lamp_type === 'Fara lampa') {
            //@ts-ignore
            acc[obj.pole_type]['Fara lampa']++;
        }

        return acc;
    }, {});

    const rows = useMemo(() => {
        return Object.entries(counter).map(([key, value]: any) => {
            const item = {
                name: key,
                total: value['total'],
                lamp: value['Cu lampa'],
                noLamp: value['Fara lampa']
            };
            return createData(item.name, Number(item.total), Number(item.lamp), Number(item.noLamp));
        });
    }, [counter]);

    const countTotal = () => {
        let total = {
            poles: 0,
            lamp: 0,
            noLamp: 0
        }
        rows.forEach((row) => {
            total.poles += row.total,
                total.lamp += row.lamp,
                total.noLamp += row.noLamp
        })

        return total
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            //@ts-ignore
            backgroundColor: theme.palette.common.black,
            //@ts-ignore
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            //@ts-ignore
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <>
            <IconButton color='info' onClick={handleOpenStreetMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                elevation={1}
                anchorEl={anchor}
                open={anchor ? true : false}
                onClose={() => setAnchor(null)}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '150px'

                }}>
                    <IconButton color='warning'>
                        <Edit />
                    </IconButton>
                    <IconButton color='error'>
                        <Delete />
                    </IconButton>
                    <IconButton edge="end" color='secondary' onClick={() => setOpenTable(true)}>
                        <InfoIcon />
                    </IconButton>
                </Box>
            </Menu>
            <Dialog fullScreen maxWidth="md" open={openTable} onClose={() => setOpenTable(false)}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tip stâlpi</StyledTableCell>
                                <StyledTableCell>Nr. stâlpi</StyledTableCell>
                                <StyledTableCell>Cu lampă</StyledTableCell>
                                <StyledTableCell>Fără lampă</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row) => (
                                <StyledTableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align='right'>
                                        {row.total}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align='right'>
                                        {row.lamp}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align='right'>
                                        {row.noLamp}
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                            <TableRow>
                                <StyledTableCell component="th" scope="row">Total:</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align='right'>{countTotal().poles}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align='right'>{countTotal().lamp}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align='right'>{countTotal().noLamp}</StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    margin: "1rem",
                    display: 'flex',
                    justifyContent: "flex-end"
                }}>
                    <Button onClick={() => setOpenTable(false)} sx={{
                        width: 100,

                    }} variant="contained">Închide</Button>
                </Box>

            </Dialog>

        </>

    )
}

export default StreetMenu