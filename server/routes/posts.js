import express from 'express'

import {getPost, getPosts,getPostsBySearch, createPosts,updatePost,deletePost,likePost} from '../controllers/posts.js'
//middleware for auth
import auth from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/search', getPostsBySearch) //search route

router.get('/', getPosts)
//route to get single post by id
router.get('/:id', getPost)

router.post('/',auth, createPosts)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router
