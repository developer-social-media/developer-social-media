import { AcUnitTwoTone } from "@mui/icons-material";
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";


// this fetches all products from the database


export const fetchUserFeedById = createAsyncThunk("fetchUserFeed", async ({page, limit, id}) => {
  try {
    const {data} = await axios.get(`/api/userfeed/${id}`,{params: {
      page: page,
      limit: limit
    } });
  
    return data



  } catch (error) {
    console.log(error);
  }
});

export const restartUserFeed = createAsyncThunk("restartUserFeed", async () => {
  try {
    
  
    const {data} = await axios.get(`/api/userfeed/${id}`,{params: {
      page: page,
      limit: limit
    } });
    return data



  } catch (error) {
    console.log(error);
  }
});

export const fetchUserFeedByPages = createAsyncThunk("fetchUserFeedByPages", async ({profileId , userPageNumber}) => {
  try {
    const newLimit = userPageNumber * 10
    const {data} = await axios.get(`/api/userfeed/${profileId}`, {params: {
      page: 1,
      limit: newLimit,
    } });

    

    return data




  } catch (error) {
    console.log(error);
  }
});



const userFeedSlice = createSlice({
  name: "userFeed",
  initialState: [],
  reducers: {
    resetUserFeed: (state) => state = []
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeedById.fulfilled, (state, action) => {
      action.payload.results.forEach((item) => state.push(item))
    });
    builder.addCase(fetchUserFeedByPages.fulfilled, (state, action) => {
      return action.payload.results
    });
  },
});



export const selectUserFeed = (state) => {
  return state.userfeed;
};

export const { resetUserFeed } = userFeedSlice.actions;



export default userFeedSlice.reducer;
