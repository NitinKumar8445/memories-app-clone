import express from 'express'

import { getPosts, createPosts,updatePost,deletePost,likePost} from '../controllers/posts.js'
//middleware for auth
import auth from '../middleware/authMiddleware.js'
const router = express.Router()


router.get('/', getPosts)
router.post('/',auth, createPosts)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router
