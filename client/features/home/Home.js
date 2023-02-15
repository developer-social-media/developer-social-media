import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom'
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';
import { FormControl, TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { asyncCreatePost, asyncFetchPosts } from '../globalfeed/postslice';
import SideNav from '../home/SideNav'
import FriendList from '../friendlist/friendlist';



/**
 * COMPONENT
 */

const Home = (props) => {
  const router = useLocation();
  const userId = useSelector((state) => state.auth.me.id);
  const userProjects = useSelector((state) => state.user.projects)
  const feed = useSelector((state) => state.globalfeed)
  const nullProject = [{ project_name: 'You have no projects' }]
  const dispatch = useDispatch()

  const options = userProjects && userProjects.length ? userProjects : nullProject


  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')



useEffect(() => {
  if(router.search.token){
    const TOKEN = 'token'
    window.localStorage.setItem(TOKEN, router.search.token)
    dispatch(me())
  }
  dispatch(fetchUserAsync(userId))
  dispatch(asyncFetchPostLikes())
  dispatch(asyncFetchComments())
  dispatch(asyncFetchPosts())

},[])





  return (

    <div id='home-container'  style={{marginTop: 5, display: 'flex', flexDirection: 'row' }}>
      <div id='home-left-container' style={{width: '25%'}}><SideNav/></div>
      
      <div id='home-left-container' style={{width: '50%', marginTop: 20}} ><GlobalFeed />
      </div>
      <div id='home-right-container' style={{width: '25%'}}  >
      <FriendList/>
      </div>
      
      
    </div>

  );
};

export default Home;
