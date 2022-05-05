
import { configureStore } from '@reduxjs/toolkit'
import markerReduser from './ducks/marker'
export const store = configureStore({
    reducer: {
        marker: markerReduser,
    }
})