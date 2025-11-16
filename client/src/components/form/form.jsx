import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../reducers/postSlice';
import { useNavigate } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: null,
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setPostData({ ...postData, selectedFile: reader.result });

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: postData.title,
      message: postData.message,
      tags: postData.tags,
      selectedFile: postData.selectedFile,
    };

    try {
      if (currentId) {
        const res = await dispatch(updatePost({ id: currentId, post: payload })).unwrap();
        navigate(`/posts/${res._id}`);
      } else {
        const res = await dispatch(createPost(payload)).unwrap();
        navigate(`/posts/${res._id}`);
      }
      clear();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: null });
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={{
        p: 2, variant: "outlined",
        color: "primary", borderRadius: 1,
      }}
        elevation={6}
      >
        <Typography align="center">
          Please Sign In to create memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, borderRadius: 1, }} elevation={6}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {currentId ? `Editing "${post?.title}"` : 'Create Memory'}
      </Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          sx={{ mb: 2 }}
        />

        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ marginBottom: 16 }} />

        <Button type="submit" variant="contained" fullWidth sx={{ mb: 1 }}>
          Submit
        </Button>
        <Button
          sx={{
            backgroundColor: 'rgb(156, 39, 176)'
          }}
          variant="contained"
          fullWidth onClick={clear}>
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
