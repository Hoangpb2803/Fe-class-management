import { ITeacher } from "@/types/teacher.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITeacherState {
    teachers: ITeacher[],
    isChangeStudentsNumber: boolean
}

const initialState: ITeacherState = {
    teachers: [],
    isChangeStudentsNumber: true
}

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setTeacher(state, action: PayloadAction<ITeacher[]>) {
            state.teachers = [...action.payload]
        },

        pushTeacher(state, action: PayloadAction<ITeacher>) {
            if (state.teachers.length < 5) {
                state.teachers.push(action.payload)
            }
            state.isChangeStudentsNumber = !state.isChangeStudentsNumber
        },

        updateTeacher(state, action: PayloadAction<ITeacher>) {
            state.teachers = state.teachers.map(item => {
                if (item._id === action.payload._id) {
                    return { ...action.payload }
                }
                return item
            })
        },

        deleteTeacher(state, action: PayloadAction<string>) {
            state.isChangeStudentsNumber = !state.isChangeStudentsNumber
        }
    }
})

export const {
    setTeacher,
    pushTeacher,
    updateTeacher,
    deleteTeacher,
} = teacherSlice.actions

export default teacherSlice.reducer