import { configureStore } from '@reduxjs/toolkit'
import projectSlice from './Slices/projectSlice'
import miscSlice from './Slices/miscSlice'
import appNotificationSlice from './Slices/appNotificationSlice'
import mapSlice from './Slices/mapSlice'
import usersSlice from './Slices/usersSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            project: projectSlice,
            misc: miscSlice,
            notification: appNotificationSlice,
            map: mapSlice,
            users: usersSlice
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunkConfig = { dispatch: AppDispatch, state: RootState }