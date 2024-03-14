import { IMajor } from "@/types/major.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMajorState {
    majors: IMajor[]
}

const initialState: IMajorState = {
    majors: []
}

const majorSlice = createSlice({
    name: "major",
    initialState,
    reducers: {
        setMajor(state, action: PayloadAction<IMajor[]>) {
            state.majors = [...action.payload]
        },

        pushMajor(state, action: PayloadAction<IMajor>) {
            state.majors.push(action.payload)
        },

        updateMajor(state, action: PayloadAction<IMajor>) {
            state.majors.forEach(item => {
                if (item._id === action.payload._id) {
                    item = { ...action.payload }
                }
            })
        },

        deleteMajor(state, action: PayloadAction<string>) {
            state.majors.forEach((item, index) => {
                if (item._id === action.payload) {
                    state.majors.splice(index, 1)
                }
            })
        }
    }
})

export const {
    setMajor,
    pushMajor,
    updateMajor,
    deleteMajor,
} = majorSlice.actions

export default majorSlice.reducer