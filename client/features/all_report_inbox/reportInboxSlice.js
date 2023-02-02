import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//fetch all reports in the database
export const fetchReportsAsync = createAsyncThunk('reports', async () => {
    try {
        const {data} = await axios.get('/api/report');
        console.log(data, "data");
        return data;
    } 
    catch (error) {
        console.log(error);
    }
});

//slice for reports
const reportSlice = createSlice({
    name: 'reports',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReportsAsync.fulfilled, (state, action) => {
            console.log(action.payload, "action.payload");
            return action.payload
        })
    }
});

export const selectReports = (state, action) => {
    return state.reportInbox;
}

export default reportSlice.reducer