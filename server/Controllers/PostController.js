import  Post from '../Models/PostModel.js';

export const createPost = async (req, res, next) => {
    try {
        console.log('req.body', req.body);
    const {userId, title, content} = req.body;
    const post = await Post.create({userId, title, content});
    res.send({message: 'Post created successfully', success: true, post});
    next();
    } catch (error) {
        console.log('error', error)
    }
};

export const getPosts = async (req, res, next) => {
    const userId = req.body.userId;
    console.log(req.body);
    try {
        const posts = await Post.find({userId: userId});
        res.send({message: 'Posts fetched successfully', success: true, posts});
        next();
    } catch (err) {
        console.log('err', err);
    }
};