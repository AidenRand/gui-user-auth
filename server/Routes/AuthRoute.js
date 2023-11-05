import {SignUp, LogIn}  from '../Controllers/AuthControllers.js';
import {createPost, getPosts} from '../Controllers/PostController.js';
import userVerification from '../Middleware/AuthMiddleware.js';
import express from 'express';
const router = express.Router();

router.post('/', userVerification);
router.post('/signup', SignUp);
router.post('/login', LogIn);
router.post('/createpost', createPost);
router.post('/getposts', getPosts);

export default router;
