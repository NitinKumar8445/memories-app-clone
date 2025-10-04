import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../reducers/postSlice.js';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: null, // should be File, not string
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({
 
        title: '',
        message: '',
        tags: '',
        selectedFile: null,
      });
    }
  }, [post, currentId]);

  const MAX_FILE_SIZE = 2000 * 1024; // 50 KB in bytes

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be 2000KB or less');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64String = reader.result;
      setPostData({ ...postData, selectedFile: base64String });
    };

    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
 
      title: postData.title,
      message: postData.message,
      tags: postData.tags,
      selectedFile: postData.selectedFile, // base64 string
    };

    if (currentId) {
      dispatch(updatePost({ id: currentId, post: payload }));
    } else {
      dispatch(createPost(payload));
    }

    clear();
  };



  const clear = () => {
    setCurrentId(null);
    setPostData({
  
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    });
  };


  if (!user?.result?.name) {
    return (
      <Paper sx={{ p: 2, margin: '8px' }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, margin: '8px' }}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          '& .MuiTextField-root': { m: 1 },
        }}
      >
        <Typography variant="h6" sx={{ width: '100%', mb: 2 }}>
          {currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}
        </Typography>

        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({ ...postData, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value })
          }
        />

        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mb: 1 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
