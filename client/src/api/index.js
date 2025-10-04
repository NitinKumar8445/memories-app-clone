import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getPosts = ()=> API.get('http://localhost:5000/api/posts');
export const createPost = (newPost) => API.post('/api/posts', newPost);
export const updatePost = ( id, updatePost ) => API.patch(`${'/api/posts'}/${id}`, updatePost);


export const likePost = (id) => API.patch(`${'/api/posts'}/${id}/likePost`);
export const deletePost =(id)=> API.delete(`${'/api/posts'}/${id}`);



//---------------- AUTHENTICATION----------------//

export const signIn = (formData) => API.post('/api/auth/signin', formData);

export const signUp = (formData) => API.post('/api/auth/signup', formData);




