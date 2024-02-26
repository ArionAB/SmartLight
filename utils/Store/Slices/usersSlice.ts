import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';
import { userState } from './userState';


const initialState: userState = {
    users: [],
    assignedUsers: [],
    currentUser: null
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
        },
        setAssignedUsers: (state, action) => {
            state.assignedUsers = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        removeUser: (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id)
            if (index !== -1) {
                state.users.splice(index, 1)
            }
        }

    },
});

export const { setUsers, addUser, editUser, setAssignedUsers, setCurrentUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;