import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';

const initialState: any = {
    users: []
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        editUser: (state, action) => {
            const userIndex = state.users.findIndex((user: Tables<'users'>) => user.id === action.payload.id)
            if (userIndex !== -1) {
                state.users[userIndex] = action.payload
            }
        }

    },
});

export const { setUsers, addUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;