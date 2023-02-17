import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// this fetches all posts from the database
export const asyncFetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {

    const { data } = await axios.get('/api/post');
    return data


  } catch (error) {
    console.log(error);
  }
});

export const asyncCreatePost = createAsyncThunk('createPost', async (newPost) => {
  const {data } = await axios.post('/api/post', newPost);
  return data

})


export const asyncDeletePost = createAsyncThunk('deletePost', async (id) => {


  const {data} = await axios.delete(`/api/post/${id}`)
  return data


})

export const asyncUpdatePost = createAsyncThunk('updatePost', async (post) => {
  try{
    const {data} = await axios.put(`/api/post/${post.id}`, post)
    return data
  }catch(error){
    console.log(error)
  }
})



const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchPosts.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(asyncCreatePost.fulfilled, (state, action) => {
      state.push(action.payload)
    });
    builder.addCase(asyncDeletePost.fulfilled, (state, action) => {
      return state.filter((post) => post.id !== action.payload.id)
    });
    builder.addCase(asyncUpdatePost.fulfilled, (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id)
      state[index] = action.payload
    });
  },
});

export const selectPosts = (state) => {
  return state.posts;
};


export default postsSlice.reducer;
