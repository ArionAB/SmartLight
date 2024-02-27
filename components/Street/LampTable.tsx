import { StreetModel } from '@/utils/Store/Models/Street/StreetModel';
import styled from '@emotion/styled';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses } from '@mui/material';
import React, { useMemo, FC } from 'react'

const LampTable: FC<{
    street: StreetModel,
}> = ({ street }) => {

    function createData(
        name: string,
        total: number,
        lamp: number,
        noLamp: number
    ) {
        return { name, total, lamp, noLamp };
    }

    let counter = useMemo(() => {
        return street?.markersArray?.reduce((acc: any, obj) => {
            // Initialize the counts if they don't exist yet
            if (obj.power_type) {
                if (!acc[obj.power_type]) {
                    acc[obj.power_type] = { total: 0, '30W': 0, '60W': 0, '80W': 0 };
                }
                // Increment the total count for this power_type
                acc[obj.power_type].total++;
            }




            // Increment the count for the power_type if it matches
            if (obj.hub_c) {
                if (obj.power_type) {
                    acc[obj.power_type]['Hub-c']++;
                }
            } else if (!obj.hub_c) {
                //@ts-ignore
                if (obj.power_type) {
                    acc[obj.power_type]['Fara Hub-c']++;

                }
            }

            return acc;
        }, {});
    }, [street?.markersArray])

    const rows = useMemo(() => {
        if (counter) {
            return Object.entries(counter).map(([key, value]: any) => {
                const item = {
                    name: key,
                    total: value['total'],
                    lamp: value['Hub-c'],
                    noLamp: value['Fara Hub-c']
                };
                return createData(item.name, Number(item.total), Number(item.lamp), Number(item.noLamp));
            });
        }

    }, [counter]);

    const countTotal = () => {
        let total = {
            poles: 0,
            lamp: 0,
            noLamp: 0
        }
        rows?.forEach((row) => {
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
        <TableContainer component={Paper} >
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
                            <StyledTableCell component="th" scope="row" align='center'>
                                {row.total}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align='center'>
                                {row.lamp}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align='center'>
                                {row.noLamp}
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                    <TableRow>
                        <StyledTableCell component="th" scope="row">Total:</StyledTableCell>
                        <StyledTableCell component="th" scope="row" align='center'>{countTotal().poles}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" align='center'>{countTotal().lamp}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" align='center'>{countTotal().noLamp}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LampTable