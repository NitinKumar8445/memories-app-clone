import { configureStore } from '@reduxjs/toolkit'
import postsSlice from '../reducers/postSlice.js'
import authSlice from '../reducers/authSlice.js'

export default configureStore({
  reducer: {
    posts: postsSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})