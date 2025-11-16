import React from 'react';
import Post from './post/Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const {posts,isLoading}  = useSelector((state) => state.posts);

  if(!posts?.length && !isLoading) return 'No posts found';
  return (
    isLoading ? (
      <CircularProgress />
    ) : (
      <Grid
        sx={{
          
         minWidth: '100%',
          justifyContent: {
            xs: 'center',
            sm: 'normal'
          }
        }}
        container
        spacing={2}   // ✅ use spacing instead of margin/columnGap
        alignItems="stretch"
      >
        {posts?.map((post) => (
          <Grid
            key={post._id}
            size={{
              xs: 12,
              sm: 12, // ✅ 4 posts per row on small screens
              md: 6,
              lg: 3
             
            }}  // ✅ 3 posts per row on medium+, 2 per row on small, full width on xs
          >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
