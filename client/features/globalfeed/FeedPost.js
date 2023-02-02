import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField, FormControl } from '@mui/material';
import { sizing } from '@mui/system';
import Comments from './Comments';
import PostLikes from './PostLikes';
import { asyncCreateLike, asyncDeleteLike, asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { asyncCreateComment, asyncFetchComments } from './commentslice';


/**
 * COMPONENT
 */
const FeedPost = ({feedItem}) => {

const [likeButton, setLikeButton] = useState('')
const [text_field, setText_field] = useState('')
const [commentRender, setCommentRender] = useState(false)
 
  
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


    useEffect(() => {
      dispatch(asyncFetchComments())
      },[commentRender])

  // if Post like Check returns a post like.. it will dispatch asyncDeleteLike.  If it doesn't return a post like, it will create a like
  // dispatch the Createlike with user and post Id
  const handlePostLike = (userId, postId) => {
    if (postLikeCheck && postLikeCheck.length) {
      let id = postLikeCheck[0].id;
      dispatch(asyncDeleteLike(id));
      setLikeButton('Like')
    } else {
      const like = {
        userId: userId,
        postId: postId,
      }
      dispatch(asyncCreateLike(like))
      setLikeButton('Unlike')
    }
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
    console.log(newComment)
    setText_field('')
    setCommentRender(!commentRender)
  }

  

  
  return (
    <div>
            <Box className='border'>
              <div className='flex flex-row'> 
                <Avatar src={feedItem.user.img_url} />
                {feedItem.project && feedItem.project.project_name ? <div>{feedItem.user.first_name} {feedItem.user.last_name} {feedItem.project.project_name}</div> : <div>{feedItem.user.first_name} {feedItem.user.last_name} </div> }
                
                
              </div>
             
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
              <PostLikes feedItem={feedItem} />
              <ButtonGroup variant='outlined' aria-label='outlined button group' sx={{ width: 1 }}>
              
                  <Button onClick={(e) => handlePostLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>{likeButton}</Button>
                  <Button sx={{ width: 1/3 }}>Comment</Button>
                  <Button  sx={{ width: 1/3 }}>Share</Button>
                </ButtonGroup>
            </Box>
            <Comments feedItem={feedItem}/> 
            <FormControl onSubmit={handleCreateComment} sx={{ width: 1 }}>
            <TextField
            
          id={`commentbox-${feedItem.id}`}
          placeholder='Comment'
          multiline
          rows={2}
          value={text_field}
          onChange={(e) => setText_field(e.target.value)} 
          
        />
        <Button onClick={handleCreateComment} type='submit'>Reply</Button>
        </FormControl>
        
    </div>
  );
};

export default FeedPost;
