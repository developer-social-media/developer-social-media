import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//fetch a single support request
export const fetchSingleSupportAsync = createAsyncThunk('singleSupport', async (id) => {
    try {
        const {data} = await axios.get(`/api/support/${id}`);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}
)

//update a single support request
export const updateSingleSupportAsync = createAsyncThunk('updateSingleSupport', async (support) => {
    try {
        const { id, admin_comment, status, priority } = support;
        const updatedSupport = { status, priority, admin_comment};
        const {data} = await axios.put(`/api/support/${id}`, updatedSupport);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}
)

const singleSupportSlice = createSlice({
    name: 'singleSupport',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleSupportAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(updateSingleSupportAsync.fulfilled, (state, action) => {
            return action.payload
        });
    }
})

export const selectSingleSupport = (state, action) => {
    return state.singleSupport;
}

export default singleSupportSlice.reducer
