import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserAsync = createAsyncThunk('user', async (id) => {
    try {
        const {data} = await axios.get(`/api/users/${id}`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});

export const editUser = createAsyncThunk( 'editUser ', async (updateUser)=>{
    try{
        const id = updateUser.id
        const {data} = await axios.put(`/api/users/${id}`,{
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            img_url:updateUser.img_url,
            email: updateUser.email,
            about_me: updateUser.about_me,
            skill_level:updateUser.skill_level
        })
         return data
    }catch(err){
        console.log(err)
    }
  });

//report a user
export const reportUserAsync = createAsyncThunk('reportUser', async ({report}, id) => {
    try {
        const { id, reportee, reason_for_report, message } = report;
        const reportedUser = {reportee, reason_for_report, message};
        const {data} = await axios.post(`/api/users/${id}/reportUser`, reportedUser);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

//bans a user
export const banUserAsync = createAsyncThunk('banUser', async (banUpdate) => {
    try {
        const { id, is_banned, ban_status } = banUpdate;
        const updatedUser = {is_banned, ban_status};
        const {data} = await axios.put(`/api/users/${id}/ban`, updatedUser);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

//report a bug/feature request or survey
export const requestBugFeatureSurveyAsync = createAsyncThunk('requestBugFeatureSurvey', async (request) => {
    try {
        const { username, type_of_request, description} = request;
        const newRequest = {username, type_of_request, description};
        const {data} = await axios.post(`/api/support`, newRequest);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(editUser.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(reportUserAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(requestBugFeatureSurveyAsync.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(banUserAsync.fulfilled, (state, action) => {
            state.is_banned = action.payload.is_banned
            state.ban_status = action.payload.ban_status
            return state
        });
    }
})

export const selectUser = (state, action) => {
    return state.user
}



export default userSlice.reducer
