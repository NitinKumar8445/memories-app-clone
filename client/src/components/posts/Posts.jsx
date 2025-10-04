import React from 'react';
import Post from './post/Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid
        sx={{
          
         
          justifyContent: {
            xs: 'center',
            sm: 'normal'
          }
        }}
        container
        spacing={3}   // ✅ use spacing instead of margin/columnGap
        alignItems="stretch"
      >
        {posts.map((post) => (
          <Grid
            key={post._id}
            size={{
              xs: 12,
              sm: 6,
             
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
