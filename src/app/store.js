import { configureStore } from "@reduxjs/toolkit";
import taskSlice from '../features/todo/taskSlice'

export const store = configureStore({
    reducer: {
        tasks:taskSlice
    }
})