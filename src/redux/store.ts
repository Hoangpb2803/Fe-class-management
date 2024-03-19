import { configureStore } from "@reduxjs/toolkit";
import majorSlice from "./slices/major.slice";
import studentSlice from "./slices/student.slice";
import teacherSlice from "./slices/teacher.slice";
import classSlice from "./slices/class.slice";

export const store = configureStore({
    reducer: {
        major: majorSlice,
        student: studentSlice,
        teacher: teacherSlice,
        class: classSlice
    },
})

export type RootState = ReturnType<typeof store.getState>