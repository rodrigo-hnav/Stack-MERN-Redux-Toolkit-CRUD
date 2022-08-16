import {Router} from 'express'
import { getPosts, deletePost, updatePost, createPost, getPost } from '../controllers/posts.controllers.js'



const router = Router()

// router.get('/', (req,res) => res.send('Holapp!'))
router.get('/posts', getPosts)

router.post('/posts', createPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)
router.get('/posts/:id', getPost)

export default router