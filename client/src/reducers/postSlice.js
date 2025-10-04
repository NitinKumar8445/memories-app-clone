import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// Async thunk to fetch posts
export const getPosts = createAsyncThunk('posts/fetchAll', async () => {
  try {
    const { data } = await api.getPosts();
    return data;

  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw the error to be handled in the slice

  }
});

// Async thunk to create post
export const createPost = createAsyncThunk('posts/create', async (post) => {
  try {
    const { data } = await api.createPost(post);
    return data;

  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Re-throw the error to be handled in the slice

  }
});

// Async thunk to update post
export const updatePost = createAsyncThunk('posts/update', async ({ id, post }) => {
  try {
    const { data } = await api.updatePost(id, post);
    return data; // Return the response data, which can be used in the slice
  } catch (error) {
    console.error('Error updating post:', error);
    throw error; // Re-throw the error to be handled in the slice
  }
});

// Async thunk to delete post
export const deletePost = createAsyncThunk('posts/delete',async (id)=>{
  try {
   await api.deletePost(id);
   return id; // Return the id of the deleted post to be used in the slice
    
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error; // Re-throw the error to be handled in the slice
    
  }
})


export const likePost = createAsyncThunk('posts/like', async (id) =>{
  try {
    const { data } = await api.likePost(id);
    return data; 
  } catch (error) {
    console.error('Error liking post:', error);
    throw error; 
    
  }
} )

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.push(action.payload);
        
       
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        return state.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) =>{
        // action.payload is the id of deleted post
        return state.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled,(state, action)=>{
        // action.payload is the updated post with 'likes' array
        return state.map((post) => {
          if (post._id === action.payload._id) {
            return { ...post, likes: action.payload.likes };
          }
          return post;
        });
      })
  },
});

export default postsSlice.reducer;




