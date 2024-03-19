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
    }
})

export const {
    setMajor,
} = majorSlice.actions

export default majorSlice.reducer