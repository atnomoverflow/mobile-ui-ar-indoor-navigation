
import { configureStore } from '@reduxjs/toolkit'
import markerReduser from './ducks/marker'
import pathReducer from './ducks/Path'
export const store = configureStore({
    reducer: {
        marker: markerReduser,
        path:pathReducer
    }
})