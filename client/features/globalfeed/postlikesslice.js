import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all products from the database
export const asyncFetchPostLikes = createAsyncThunk("fetchPostLikes", async () => {
  try {

    const { data } = await axios.get('/api/postlike');
    return data


  } catch (error) {
    console.log(error);
  }
});

export const asyncCreateLike = createAsyncThunk('createLike', async (like) => {
  const {data } = await axios.post('/api/postlike', like);
  return data

})


export const asyncDeleteLike = createAsyncThunk('deleteLike', async (id) => {

  const {data} = await axios.delete(`/api/postlike/${id}`)
  return data


})



const postLikesSlice = createSlice({
  name: "postlikes",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchPostLikes.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(asyncCreateLike.fulfilled, (state, action) => {
      state.push(action.payload)
    });
    builder.addCase(asyncDeleteLike.fulfilled, (state, action) => {
      return action.payload
    });
  },
});

export const selectPostLikes = (state) => {
  return state.postlikes;
};


export default postLikesSlice.reducer;
