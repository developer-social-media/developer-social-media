import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchGlobalFeed,  selectGlobalFeed, fetchGlobalFeedByPages } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField, FormControl, Typography } from '@mui/material';
import { sizing } from '@mui/system';
import Comments from './Comments';
import PostLikes from './PostLikes';
import { asyncCreateLike, asyncDeleteLike, asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { asyncCreateComment, asyncFetchComments } from './commentslice';
import { asyncFetchCommentLikes } from './commentlikeslice';
import { asyncDeletePost, asyncFetchPosts, asyncUpdatePost } from './postslice';
import { HighlightOff } from '@mui/icons-material';
import { fetchUserFeedById, fetchUserFeedByPages } from './userfeedslice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from "../../app/theme";
/**
 * COMPONENT
 */
const FeedPost = ({feedItem, renderPostLikes, setRenderPostLikes, renderComments, setRenderComments, profileId, pageNumber, userPageNumber}) => {

const [likeButton, setLikeButton] = useState('')
const [edit, setEdit] = useState(false)

// this is for new comments
const [text_field, setText_field] = useState('')

// this is for editing
const [title, setTitle] = useState(feedItem.title)
const [url, setURL] = useState(feedItem.url)
const [description, setDescription] = useState(feedItem.description)

  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch()
  const postLikes = useSelector(selectPostLikes)

  // searches Post Like api for post like with matching userId and Post Id
  const postLikeCheck = postLikes && postLikes.length ? postLikes.filter(postLike => postLike.userId === user.id && postLike.postId === feedItem.id) : null








// Checks if post is liked and manipulates like button text
  useEffect(() => {
    if (postLikeCheck && postLikeCheck.length) {
      setLikeButton('Unlike')
    } else {
      setLikeButton('Like')
    }
    },[dispatch])

  // if Post like Check returns a post like.. it will dispatch asyncDeleteLike.  If it doesn't return a post like, it will create a like
  // dispatch the Createlike with user and post Id
  const handlePostLike = (userId, postId) => {

      const like = {
        userId: userId,
        postId: postId,
        compositeId: `${userId}&${postId}`
      }
      dispatch(asyncCreateLike(like)).then(() => {
        if (profileId) {
          
          dispatch(fetchUserFeedByPages({profileId, userPageNumber}))
          dispatch(asyncFetchPostLikes())
         dispatch(asyncFetchPosts())
        } else {
           dispatch(fetchGlobalFeedByPages(pageNumber))
           dispatch(asyncFetchPostLikes())
           dispatch(asyncFetchPosts())
        }
      })

    }


  const handleDeleteLike = (userId, postId) => {
    let id = postLikeCheck[0].id;
    dispatch(asyncDeleteLike(id)).then(() =>{
      if (profileId) {
        dispatch(fetchUserFeedByPages({profileId, userPageNumber}))
        dispatch(asyncFetchPostLikes())
         dispatch(asyncFetchPosts())
      } else {
        dispatch(fetchGlobalFeedByPages(pageNumber))
         dispatch(asyncFetchPostLikes())
         dispatch(asyncFetchPosts())
      }

    })
  }




  // creates new comment and alters commentrender state to render component
  const handleCreateComment = (e) => {
    e.preventDefault();
    const newComment = {
      userId: user.id,
      postId: feedItem.id,
      text_field: text_field,
    }
    dispatch(asyncCreateComment(newComment))
    if(!!profileId) {
      dispatch(fetchUserFeedById(profileId))
    } else dispatch(fetchGlobalFeed());
    setText_field('')
    dispatch(asyncFetchComments())
  }

  const handleDeletePost = (e) => {
    e.preventDefault();
    dispatch(asyncDeletePost(feedItem.id)).then(() => {
      if(!!profileId) {
        dispatch(fetchUserFeedById(profileId))
      } else  dispatch(fetchGlobalFeedByPages(pageNumber))
    })
    dispatch(asyncFetchComments())
  }

  //!FIXME: handleEditPost does not rerender the feed.
  const handleOpenEdit = (e) => {
    setEdit(!edit)


  }

  const handleEdit = (e) => {
    e.preventDefault()
    const updatedPost = {
      id: feedItem.id,
      title: title,
      url: url,
      description: description,
      userId: feedItem.userId,
      projectId: feedItem.projectId
    }
    dispatch(asyncUpdatePost(updatedPost)).then(() => {
      if(!!profileId) {
        dispatch(fetchUserFeedById(profileId))
      } else  dispatch(fetchGlobalFeedByPages(pageNumber))
    })
    setEdit(!edit)


  }
  return (
    <div>
            <Box className='border' sx={{padding: 1.5}}>
              <div className='flex flex-row w-1'> 
              {/*users can update their own posts*/}
              {edit ? <FormControl >
                <TextField
                id="outlined-multiline-static"
                label="Edit Title"
                rows={4}
                defaultValue={feedItem.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Edit URL"
                rows={4}
                defaultValue={feedItem.url}
                onChange={(e) => setURL(e.target.value)}
              />
                <TextField
                  id="outlined-multiline-static"
                  label="Edit Post"
                  multiline
                  rows={4}
                  defaultValue={feedItem.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button color='primary' theme={theme}  onClick={handleEdit}>Submit</Button>
              </FormControl> : null}
                {feedItem.project && feedItem.project.project_name && !edit ?
                <div style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                   <Link to={`/users/${feedItem.userId}`}> 
                   <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginRight: '10px'}} 
                src={feedItem.user.img_url} 
                />
                    </Link>
                 <Link style={{margin: '5px'}} to={`/users/${feedItem.userId}`}><div>{feedItem.user.first_name} {feedItem.user.last_name} </div> </Link>
                 <ArrowForwardIcon />
                 <Link style={{margin: '5px'}} to={`/project/${feedItem.projectId}`}><div>{feedItem.project.project_name}</div></Link>
                 </div> : !edit ?
                 <div style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                 <Link  to={`/users/${feedItem.userId}`}> 
                 <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginRight: '10px'}} 
                src={feedItem.user.img_url} 
                /> </Link>
                 <Link style={{margin: '5px'}} to={`/users/${feedItem.userId}`}><div>{feedItem.user.first_name} {feedItem.user.last_name} </div></Link> 
                 </div> 
                 : null }
                
                
              </div>

              <Typography variant='h5' sx={{textAlign: 'center', marginTop: '10px'}}>{feedItem.title}</Typography>
              <a href={feedItem.url} style={{textAlign: 'center'}}>
                <Typography sx={{textAlign: 'center'}}>{feedItem.url}</Typography>
                </a>
              <Typography  sx={{marginTop: '10px', marginBottom: '10px'}}>{feedItem.description}</Typography>
              <PostLikes feedItem={feedItem}  />
              <ButtonGroup variant='outlined' aria-label='outlined button group' sx={{ width: 1 }}>
                {postLikeCheck && postLikeCheck.length ? <Button color='primary' theme={theme} onClick={(e) => handleDeleteLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>Unlike</Button>
                :
                 <Button color='primary' theme={theme} onClick={(e) => handlePostLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>Like</Button>}
                  {feedItem.userId === user.id ? <Button color='primary' theme={theme} onClick={handleOpenEdit} sx={{ width: 1/3 }}>Edit</Button> : <Button disabled sx={{ width: 1/3 }}>Edit</Button>}
                  {feedItem.userId === user.id ? <Button  color='primary' theme={theme}onClick={handleDeletePost} sx={{ width: 1/3 }}>Delete</Button> : <Button disabled sx={{ width: 1/3 }}>Delete</Button>}
                </ButtonGroup>
            </Box>
            <Comments feedItem={feedItem} renderComments={renderComments} setRenderComments={setRenderComments}/>
            <FormControl onSubmit={handleCreateComment} sx={{ width: 1 }}>
            <TextField

          id={`commentbox-${feedItem.id}`}
          placeholder='Comment'
          multiline
          rows={2}
          value={text_field}
          onChange={(e) => setText_field(e.target.value)}

        />
        <Button color='primary' theme={theme} onClick={handleCreateComment} type='submit'>Reply</Button>
        </FormControl>

    </div>
  );
};

export default FeedPost;
