import {SignUp, LogIn}  from '../Controllers/SignUp.js';
import express from 'express';
const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', LogIn);

export default router;
