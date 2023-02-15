import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';
import { FormControl, TextField,  Autocomplete, Box, List, ListItem, Divider, Paper, Button, ButtonGroup, Avatar, Typography } from '@mui/material';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { asyncCreatePost, asyncFetchPosts } from '../globalfeed/postslice';
import SourceIcon from '@mui/icons-material/Source';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import theme from "../../app/theme";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';

/**
 * COMPONENT
 */

const SideNav = (props) => {
  // const router = useLocation();
  // const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector((state) => state.auth.me);
  // const userProjects = useSelector((state) => state.user.projects)
  // const feed = useSelector((state) => state.globalfeed)
  // const nullProject = [{ project_name: 'You have no projects' }]
  // const dispatch = useDispatch()

  // const options = userProjects && userProjects.length ? userProjects : nullProject


  // const [value, setValue] = useState('');
  // const [inputValue, setInputValue] = useState('');
  // const [url, setUrl] = useState('')
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  const navigate = useNavigate()



useEffect(() => {


},[])





  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
           <img style={{height: '100%', width: '100%'}} src='webdevsocial.png' />
          <ButtonGroup sx={{width: 4/5}} orientation="vertical" variant='text' aria-label='vertical outlined button group'>

 
            <Button theme={theme} color='primary' onClick={(e) => navigate(`/users/${user.id}`)} sx={{justifyContent: 'flex-start'}} >
              <Person2Icon sx={{width: 32, height: 32}} />
              {user.first_name} {user.last_name}
            </Button>

            <Button theme={theme} color='primary' onClick={(e) => navigate('/project')} sx={{justifyContent: 'flex-start'}} >
              <WorkIcon sx={{width: 32, height: 32}}/>
              Projects
            </Button>

            <Button theme={theme} color='primary' onClick={(e) => navigate('/project/add')} sx={{justifyContent: 'flex-start'}} >
              <CreateIcon sx={{width: 32, height: 32}}/>
              Create Project
            </Button>
            {user.is_admin ? 
            <Button onClick={(e) => navigate('/users')} theme={theme} color='primary' sx={{justifyContent: 'flex-start'}} >
              <PeopleIcon sx={{width: 32, height: 32}} />
              Users
            </Button> : null}

            <Button theme={theme} color='primary' onClick={(e) => navigate('/chat')} sx={{justifyContent: 'flex-start'}} >
            <ChatIcon sx={{width: 32, height: 32}}/>
            Chat
            </Button>

            <Button theme={theme} color='primary' onClick={(e) => navigate('/friendrequests')} sx={{justifyContent: 'flex-start'}} >
            <PersonAddIcon sx={{width: 32, height: 32}}/>
            Friend Requests
            </Button>

            <Button theme={theme} color='primary' onClick={(e) => navigate('/contactUs')} sx={{justifyContent: 'flex-start'}} >
              <HelpIcon sx={{width: 32, height: 32}}/>
              Contact Us
            </Button>

          </ButtonGroup>


    </div>
  );
};

export default SideNav;
