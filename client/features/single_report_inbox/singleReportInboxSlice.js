import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//fetches a single report
export const fetchReportAsync = createAsyncThunk('report', async (id) => {
    try {
        const {data} = await axios.get(`/api/report/${id}`);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}
);

//updates a report
export const updateReportAsync = createAsyncThunk('updateReport', async (report) => {
    try {
        const { id, report_status, admin_response } = report;
        const updatedReport = {report_status, admin_response};
        const {data} = await axios.put(`/api/report/${id}`, updatedReport);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});

//slice for a single report
const reportSlice = createSlice({
    name: 'report',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReportAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(updateReportAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
});

export const selectReport = (state, action) => {
    return state.singleReport;
}

export default reportSlice.reducer
