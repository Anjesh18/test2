import express from 'express'
import { deleteBlogByIdController, getAllBlogsController, getBlogByIdController,  getBlogsBySingleUserController, newBlogController, searchBlogController, updateBlogByIdController } from '../controller/blogController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router=express.Router()

router.post('/newBlog', isAuthenticated,newBlogController)

router.get('/getAllBlogs', getAllBlogsController)

router.get('/blog/:id', getBlogByIdController)

router.put('/updateBlog/:id',isAuthenticated, updateBlogByIdController)

router.delete('/deleteBlog/:id', isAuthenticated, deleteBlogByIdController)

router.get('/allBlogs/user',isAuthenticated, getBlogsBySingleUserController)

router.get('/get', searchBlogController)

export default router;