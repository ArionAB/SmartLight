import { configureStore } from '@reduxjs/toolkit'
import projectSlice from './Slices/projectSlice'
import markersSlice from './Slices/markersSlice'
import miscSlice from './Slices/miscSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            project: projectSlice,
            marker: markersSlice,
            misc: miscSlice
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunkConfig = { dispatch: AppDispatch, state: RootState }