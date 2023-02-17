import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFriendshipsById = createAsyncThunk('friendship', async (id) =>{
    try {
        const {data} = await axios.get(`/api/friendship`);
        let friendRequests =  data.filter(friendship => friendship.friendId === id && friendship.status === 'inReview');
        return friendRequests
    }
    catch (error) {
        console.log(error);
    }
})

export const fetchFriendshipById = createAsyncThunk('getfriendship', async (userId, profileId) =>{
  try {
    console.log(userId, profileId, 'inside asyncthun' )
      const {data} = await axios.get(`/api/friendship`);
      let userFriendship = data.filter(friendship => friendship.userId == userId && friendship.friendId == profileId )
      return userFriendship
  }
  catch (error) {
      console.log(error);
  }
})

export const createFriendship = createAsyncThunk('createFriendship',  async (friendship) => {
  try {
    const { data } = await axios.post('/api/friendship', friendship)
    return data


  }
  catch (error) {

  }
})

export const updateFriendship = createAsyncThunk('updateFriendship',  async (updatedFriendship) => {
  try {
    const { data } = await axios.put(`/api/friendship/${updatedFriendship.id}`, updatedFriendship)
    return data


  }
  catch (error) {

  }
})

export const deleteFriendship = createAsyncThunk('deleteFriendship',  async (id) => {
  try {
    const { data } = await axios.delete(`/api/friendship/${id}`);

    return data


  }
  catch (error) {

  }
})



const friendshipSlice = createSlice({
    name: 'friendship',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFriendshipsById.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(createFriendship.fulfilled, (state, action) => {
          return action.payload
      });
      builder.addCase(createFriendship.rejected, (state, action) => {
        alert("Friend has already been requested")
        return action.payload
    });
      builder.addCase(updateFriendship.fulfilled, (state, action) => {
        return action.payload
    });
    builder.addCase(deleteFriendship.fulfilled, (state, action) => {
      return action.payload
  });
  builder.addCase(fetchFriendshipById.fulfilled, (state, action) => {
    return action.payload
});
    }
})

export const selectFriendRequests = (state, action) => {
  return state.friendship
}

export default friendshipSlice.reducer
