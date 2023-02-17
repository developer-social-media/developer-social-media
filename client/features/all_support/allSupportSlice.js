import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSupportAsync = createAsyncThunk(
    "allSupport/fetchAllSupportAsync",
    async () => {
        try{
            const response = await axios.get("/api/support");
            return response.data;
        } catch(err){
            console.log(err);
        }
    }
);

export const allSupportSlice = createSlice({
    name: "allSupport",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllSupportAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectAllSupport = (state) => {
    return state.allSupport;
}

export default allSupportSlice.reducer;
