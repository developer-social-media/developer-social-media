import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";


// this fetches all products from the database
export const fetchGlobalFeed = createAsyncThunk("fetchGlobalFeed", async ({page, limit}) => {
  try {
    const globalFeed = []
    const {data} = await axios.get("/api/feed", {params: {
      page: page,
      limit: limit,
    } });
    

    return data




  } catch (error) {
    console.log(error);
  }
});

export const fetchGlobalFeedByPages = createAsyncThunk("fetchGlobalFeedByPages", async (page) => {
  try {
    page = parseInt(page)
    const newLimit = page * 10
    const {data} = await axios.get("/api/feed", {params: {
      page: 1,
      limit: newLimit,
    } });
    

    return data




  } catch (error) {
    console.log(error);
  }
});





const globalFeedSlice = createSlice({
  name: "globalFeed",
  initialState: [],
  reducers: {
    resetGlobalFeed: (state) => state = []
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalFeed.fulfilled, (state, action) => {
      action.payload.results.forEach((item) => state.push(item))
    });
    builder.addCase(fetchGlobalFeedByPages.fulfilled, (state, action) => {
      return action.payload.results
    });
  
  },
});



export const selectGlobalFeed = (state) => {
  return state.globalfeed;
};

export const { resetGlobalFeed } = globalFeedSlice.actions;

export default globalFeedSlice.reducer;
