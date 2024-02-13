'use client'
import { getUsersAction } from '@/utils/Store/Actions/AuthActions'
import { dateTimeFormatOptions, getDateLabel } from '@/utils/Store/Functions/dateTimeFormat'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Box, Button, Container, Dialog, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridPagination, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Tables } from '@/utils/Store/Models/Database'
import AddUser from '@/components/Users/AddUser'
import { selectUsers } from '@/utils/Store/Selectors/usersSelectors'
import EditIcon from '@mui/icons-material/Edit';
import EditUser from '@/components/Users/EditUser'

const Users = () => {
    const [addUserDialog, setAddUserDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState<Tables<'users'> | null>(null)
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersAction())
    }, [])

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "last_name",
            headerName: "Nume",
            flex: 1,
            minWidth: 150,
            // valueGetter: (params: GridValueGetterParams) =>
            //     params.row?.lastName
            //         ? params.row?.lastName
            //         : params.row?.shippingAddress?.lastName,
        },

        {
            field: "first_name",
            headerName: "Prenume",
            flex: 1,
            minWidth: 150,
            // valueGetter: (params: GridValueGetterParams) =>
            //     params.row?.firstName
            //         ? params.row?.firstName
            //         : params.row?.shippingAddress?.firstName,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            minWidth: 150,
            // valueGetter: (params: GridValueGetterParams) =>
            //     params.row?.email
            //         ? params.row?.email
            //         : params.row?.shippingAddress.email,
        },
        {
            field: "role_type",
            headerName: "Rol",
            flex: 1,
            minWidth: 100,
            // valueGetter: (params: GridValueGetterParams) => {
            //     return params.row?.userId === "00000000-0000-0000-0000-000000000000"
            //         ? "Vizitator"
            //         : "Client";
            // },
        },
        {
            field: "created_at",
            headerName: "Data creării",
            flex: 1,
            minWidth: 150,
            valueFormatter: (params: GridValueFormatterParams) =>
                getDateLabel(params.value, dateTimeFormatOptions),
        },
        {
            field: "",
            headerName: "Optiuni",
            sortable: false,
            // hide: isEmployer(currentUser?.userType),
            // flex: 1,
            // minWidth: 100,
            // width: 1,
            align: "center",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <IconButton color='warning' onClick={() => {
                        setSelectedUser(params.row)
                        setEditDialog(true)
                    }}>
                        <EditIcon />
                    </IconButton>
                );
            },
        },
    ];
    const CustomFooter = () => {
        return (
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => setAddUserDialog(true)} variant="contained" color="success" startIcon={<AddIcon />}>User</Button>
                <GridPagination />
            </Box>
        );
    };

    return (
        <Container>
            <Dialog open={addUserDialog} onClose={() => setAddUserDialog(false)}>
                <AddUser onClose={setAddUserDialog} />
            </Dialog>
            <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
                <EditUser selectedUser={selectedUser} onClose={setEditDialog} />
            </Dialog>
            <DataGrid
                className="allocations-data-grid"
                //   components={{
                //     LoadingOverlay: DataLoadingComponent,
                //   }}
                onCellClick={(params) => {
                    if (params.field === "status") {
                        // handleChangeOrderStatus(params.row.orderId);
                        // setChecked(params.row.status);
                    }
                }}
                loading={false}

                // page={filters.pageNumber}
                // pageSize={10}
                // getRowId={(row) => row}
                hideFooterSelectedRowCount={true}
                // disableSelectionOnClick={true}
                // paginationMode="server"
                localeText={{
                    noRowsLabel: "Fără rezultate",
                }}
                sx={{
                    background: "#fff",
                    '.MuiDataGrid-columnHeader': {
                        background: '#000',
                        color: "#fff"
                    },
                    "& .MuiDataGrid-row:hover": {
                        background: "aliceblue",
                        cursor: "pointer",
                    },
                    height: "calc(100dvh - 128px)",
                    boxShadow: 3,
                }}
                rows={users ?? []}
                columns={columns}
                // onPageChange={handlePageChange}
                rowCount={users?.length}
                disableColumnMenu={true}
                sortingMode="server"
                // onSortModelChange={handleSortModelChange}
                slots={{
                    footer: CustomFooter
                }}
            ></DataGrid>
        </Container>

    )
}

export default Users