import React, { useState, useEffect } from 'react';
// import { Grid, Container, Paper } from '@mui/material';
import { AppBar, TextField, Button, Autocomplete, Chip, Box, Grid, Container, Paper } from '@mui/material';
import Form from '../form/form';
import Posts from '../posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../reducers/postSlice';
import Paginate from '../pagination'
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');



  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

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
          sm: 'column-reverse',  // ✅ Added this
          md: 'row',
          lg: 'row'
        },
      }}
      alignItems="stretch"
    >
      {/* Posts Section */}
      <Grid
        size={{
          xs: 12,
          sm: 6,  // ✅ Changed from 7 to 12
          md: 9,   // ✅ Added md size
        }}
        sx={{
          margin: '10px',
          display: 'flex',

          width: {
            xs: '95%',
            sm: '100%',  // ✅ Added sm width
            md: '70%',
          }
        }}
      >
        <Posts setCurrentId={setCurrentId} />
      </Grid>

      {/* Form Section */}
      <Grid
        size={{
          xs: 12,
          sm: 6,  // ✅ Changed from 4 to 12
          md: 4,   // ✅ Added md size
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          width: {
            xs: '100%',
            sm: '100%',  // ✅ Added sm width
            md: '45%',   // ✅ Changed from 45%
            lg: '25%'
          }
        }}
      >
        <AppBar
          position="static"
          color="inherit"
          sx={{
            marginTop: '20px',
            borderRadius: 1,
            mb: '1rem',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <TextField
            onKeyDown={handleKeyPress}
            name="search"
            variant="outlined"
            label="Search Memories"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={tags}

            onChange={(event, newValue) => setTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Search Tags" placeholder="Add a tag" />
            )}
            sx={{ margin: '10px 0' }}
          />


          <Button
            onClick={searchPost}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Search
          </Button>
        </AppBar>
        <Form currentId={currentId} setCurrentId={setCurrentId} />

        {(!searchQuery && !tags.length) && (
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '20px',
              }}
              elevation={6}
            >
              <Paginate page={page} />
            </Paper>
          )}

      </Grid>
    </Grid>
  );
};

export default Home;  