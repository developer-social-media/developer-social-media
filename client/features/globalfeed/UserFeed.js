import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFeed, fetchGlobalFeed, fetchGlobalFeedByPages, selectGlobalFeed } from './globalfeedslice';
import { asyncFetchComments, selectComments } from './commentslice';
import { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { Box, Container, Stack, Avatar } from '@mui/material';
import FeedPost from './FeedPost';
import FeedProject from './FeedProject';
import { asyncFetchCommentLikes, selectCommentLikes } from './commentlikeslice';
import { BookSharp, ConstructionOutlined } from '@mui/icons-material';
import { restartUserFeed, fetchUserFeedById, selectUserFeed, resetUserFeed, fetchUserFeedByPages } from './userfeedslice'
import { useParams } from 'react-router-dom';




/**
 * COMPONENT
 */
const UserFeed = ({profileId}) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  const allPostLikes = useSelector(selectPostLikes)
  const feed = useSelector(selectUserFeed)
 
  const [userPageNumber, setUserPageNumber] = useState(1)
  const { userId } = useParams();

  

useEffect(() => {
  dispatch(fetchUserFeedByPages({profileId, userPageNumber}))
},[userId])

  useEffect(() => {
      const params = {
        page: userPageNumber,
        limit: 10,
        id: profileId
      } 
      dispatch(fetchUserFeedById(params))
  
  },[userPageNumber])

  const observer = useRef()


  const lastFeedItemref = useCallback(node => {
    if (observer.current) observer.current.disconnect()
  
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
       
        setUserPageNumber(userPageNumber + 1)
      }

    }) 
    if (node) observer.current.observe(node)
    if (feed.length % 10 !== 0) {
      observer.current.disconnect()
    }
    console.log(node)
  })


 
  
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={3}>
      {feed && feed.length ? (
        feed.map((feedItem, index) => (
          feedItem.modelType === 'post' && (feed.length === index + 1) ? 
          <div ref={lastFeedItemref} key={`userfeedItem-${Math.floor(Math.random() * 10000)}`}> 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          userPageNumber={userPageNumber}
          />
          </div>
          : 
          
          feedItem.modelType === 'project' && (feed.length === index + 1) ? 
          <div ref={lastFeedItemref}  key={`userfeedItem-${Math.floor(Math.random() * 10000)}`}>
          <FeedProject ref={lastFeedItemref} key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />
          </div>
 
            : 
          feedItem.modelType === 'post' ? 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          userPageNumber={userPageNumber}
          />
          :
          feedItem.modelType === 'project' ? 
         <FeedProject key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />

           : 
           
           <div key='notloaded'>hello</div>

        ))
      ) : null}
      </Stack>
      </Container>
    </div>
  );
};

export default UserFeed;
