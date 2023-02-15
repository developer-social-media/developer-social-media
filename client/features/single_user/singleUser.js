import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { Box, Grid, Typography, Table, AppBar, Toolbar, Button, ButtonGroup, Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { banUserAsync } from "../single_user/singleUserSlice";
import Paper from '@mui/material/Paper';
import GlobalFeed from "../globalfeed/GlobalFeed";
import { asyncFetchComments } from "../globalfeed/commentslice";
import { asyncFetchPostLikes } from "../globalfeed/postlikesslice";
import { createFriendship, fetchFriendshipById} from "../friends/friendshipSlice";
import Avatar from '@mui/material/Avatar';
import UserFeed from '../globalfeed/UserFeed'
import FriendList from "../friendlist/friendlist";
import { flexbox } from "@mui/system";
import Divider from '@mui/material/Divider';
import theme from "../../app/theme";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px'
}));



const SingleUser = () => {
    const loggedInUserId = useSelector((state) => state.auth.me.id);
    const loggedInUser = useSelector((state) => state.auth.me)
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => state.auth.me.is_admin)
    const banStatus = ['good_standing', 'banned']
    const [bannedType, setBannedType] = useState(banStatus[0])
    const [banned, setBanned] = useState(true)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(selectUser)
    const friends = user.friends;
    const projects = user.projects


    const handleCreateFriendRequest = (e) => {
        const friendship = {
            userId: loggedInUserId,
            friendId: userId,
            friendName: `${user.first_name} ${user.last_name}`,
            userName: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
            compositeId: `${loggedInUserId}&${userId}`

        }

        dispatch(createFriendship(friendship))
    }


    useEffect(() => {
        dispatch(fetchUserAsync(userId))
        dispatch(asyncFetchComments())
        dispatch(asyncFetchPostLikes())
    }, [dispatch, userId])


    // !FIXME: this button is working but it is not updating the user's ban status on first click.
    const handleBan = (e) => {
        e.preventDefault();
        const banUpdate = {
            id: userId,
            is_banned: !banned,
            ban_status: bannedType
          }
        console.log('-------------',banUpdate)
        if(bannedType === banStatus[0]) {
            setBannedType(banStatus[1])
            console.log('------------------',bannedType)
        } else {
            setBannedType(banStatus[0])
        }
        console.log('banUpdate', banUpdate)
        dispatch(banUserAsync(banUpdate))
        navigate(`/users/${userId}`)
    }

    console.log(userId, loggedInUserId, "userId and loggedinuserId")
console.group(user.img_url)




    return (
        <div style={{display: 'flex' }}>
            <div style={{width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px'}}>
            <ButtonGroup color='primary' theme={theme} variant='text' style={{width: '100%', height: '55px'}}>
                    {user.id !== loggedInUserId ? <Button theme={theme} color='primary' onClick={handleCreateFriendRequest} style={{width: '100%'}}>Add Friend</Button>  : <Button disabled style={{width: '100%'}}>Add Friend</Button> }
                   {isAdmin && user.id !== loggedInUserId ? <Button theme={theme} color='primary' onClick={(handleBan)} style={{width: '100%'}}>Ban</Button>  : <Button disabled style={{width: '100%'}}>Ban</Button> }
                   {user.id !== loggedInUserId ? <Button theme={theme} color='primary' href={`/users/${userId}/reportUser`} style={{width: '100%'}}>Report</Button>  : <Button disabled style={{width: '100%'}}>Report</Button> }
                    
                </ButtonGroup>
                <img
                width='90%'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%'}} 
                src={user.img_url === 'default_user.jpg' ? '/default_user.jpg' : user.img_url} />
                <Typography variant='h4'>{user.first_name}</Typography>
                <Typography variant='h4'>{user.last_name}</Typography>
              
             

                <Typography> Username: {user.username}</Typography>
               
                <Typography> Email: {user.email}</Typography>
                <Typography> Skill Level: {user.skill_level}</Typography>

                <Divider style={{width: '100%', marginTop: '10px', marginBottom: '10px'}} ></Divider>
                <Typography>{user.about_me}</Typography>
                     
                       
               
          
            </div>
            <div style={{width: '50%', marginTop: '45px'}}>


            <UserFeed profileId={userId} />
            </div>
            <div  style={{width: '25%'}}>
            <FriendList/>
            </div>
        </div>
    )
}

export default SingleUser;
