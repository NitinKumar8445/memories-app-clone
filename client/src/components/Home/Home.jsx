import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import Form from '../form/form';
import Posts from '../posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../reducers/postSlice';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (

    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        display: 'flex',
        gap: {
          xs: '20px',
          md: '20px'
        },
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
          lg: 'row'

        },
        justifyContent: {
          lg: 'space-around'
        }
      }}
      justifyContent='space-between'
      alignItems="stretch"
    >
      {/* Posts Section */}
      <Grid
         size={{
          xs: 12,
          sm: 7,
        }}

        sx={{
          margin: '10px',
          display:'flex',
          
          width: {
            xs: '100%',
            md: '45%',

          }
        }}
      >
        <Posts setCurrentId={setCurrentId} />
      </Grid>

      {/* Form Section */}
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}

        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',   // ✅ takes full column height
          width: {
            xs: '100%',
            md: '45%',
            lg: '35%'
          }
        }}
      >
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    </Grid>

  );
};

export default Home;
