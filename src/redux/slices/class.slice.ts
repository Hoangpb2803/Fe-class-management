import { IClass } from "@/types/class.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IClassState {
    classes: IClass[],
    isChangeClassesNumber: boolean
}

const initialState: IClassState = {
    classes: [],
    isChangeClassesNumber: true
}

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        setClass(state, action: PayloadAction<IClass[]>) {
            state.classes = [...action.payload]
        },

        pushClass(state, action: PayloadAction<IClass>) {
            if (state.classes.length < 5) {
                state.classes.push(action.payload)
            }
            state.isChangeClassesNumber = !state.isChangeClassesNumber
        },

        updateClass(state, action: PayloadAction<IClass>) {
            state.classes = state.classes.map(item => {
                if (item._id === action.payload._id) {
                    return { ...action.payload }
                }
                return item
            })
        },

        deleteClass(state) {
            state.isChangeClassesNumber = !state.isChangeClassesNumber
        }
    }
})

export const {
    setClass,
    pushClass,
    updateClass,
    deleteClass,
} = classSlice.actions

export default classSlice.reducer