import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// Async thunk to fetch posts
export const getPosts = createAsyncThunk('posts/fetchAll', async (page) => {
  try {
    const { data } = await api.getPosts(page);
    // console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
});

// Async thunk to fetch single post
export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  try {
    const { data } = await api.fetchPost(id);
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
});

// Async thunk to fetch posts by search
export const getPostsBySearch = createAsyncThunk('posts/fetchBySearch', async (searchQuery) => {
  try {
    const { data } = await api.getPostsBySearch(searchQuery);
    return data;
  } catch (error) {
    console.error('Error fetching posts by search:', error);
    throw error;
  }
});

// Async thunk to create post
export const createPost = createAsyncThunk('posts/create', async (post) => {
  try {
    const { data } = await api.createPost(post);
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
});

// Async thunk to update post
export const updatePost = createAsyncThunk('posts/update', async ({ id, post }) => {
  try {
    const { data } = await api.updatePost(id, post);
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
});

// Async thunk to delete post
export const deletePost = createAsyncThunk('posts/delete', async (id) => {
  try {
    await api.deletePost(id);
    return id;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
})

export const likePost = createAsyncThunk('posts/like', async (id) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: true,
    posts: [],
    post: null,
    currentPage: 1,
    numberOfPages: 1
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      // single post fetch
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        // API returns `numberOfPages` (plural). Fix typo here.
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return { ...post, likes: action.payload.likes };
          }
          return post;
        });
      })
      .addCase(getPostsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        // Make sure this is setting an array
        state.posts = action.payload.data || action.payload || [];
        state.numberOfPages = action.payload.numberOfPages || 1;
      })
      .addCase(getPostsBySearch.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { startLoading, endLoading } = postsSlice.actions;
export default postsSlice.reducer;