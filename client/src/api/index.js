import axios from 'axios';
// Use Vite environment variable import.meta.env.VITE_API_URL in the browser
// Fallback to localhost for development
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000';

const API = axios.create({ baseURL: API_BASE });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// Remove the hardcoded localhost URL - use relative paths with baseURL
export const getPosts = () => API.get('/api/posts');
export const createPost = (newPost) => API.post('/api/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/api/posts/${id}`, updatePost);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);

//---------------- AUTHENTICATION----------------//

export const signIn = (formData) => API.post('/api/auth/signin', formData);
export const signUp = (formData) => API.post('/api/auth/signup', formData);