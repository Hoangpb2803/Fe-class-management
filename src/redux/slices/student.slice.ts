import { IStudent } from "@/types/student.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStudentState {
    students: IStudent[],
    isChangeStudentsNumber: boolean
}

const initialState: IStudentState = {
    students: [],
    isChangeStudentsNumber: true
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudent(state, action: PayloadAction<IStudent[]>) {
            state.students = [...action.payload]
        },

        pushStudent(state, action: PayloadAction<IStudent>) {
            if (state.students.length < 5) {
                state.students.push(action.payload)
            }
            state.isChangeStudentsNumber = !state.isChangeStudentsNumber
        },

        updateStudent(state, action: PayloadAction<IStudent>) {
            state.students = state.students.map(item => {
                if (item._id === action.payload._id) {
                    return { ...action.payload }
                }
                return item
            })
        },

        deleteStudent(state) {
            state.isChangeStudentsNumber = !state.isChangeStudentsNumber
        }
    }
})

export const {
    setStudent,
    pushStudent,
    updateStudent,
    deleteStudent,
} = studentSlice.actions

export default studentSlice.reducer