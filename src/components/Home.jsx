import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Box, TextField, Typography } from '@mui/material';
import MyButton from './MyButton';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState('');
    const userId = localStorage.getItem('userId');

    const getPosts = async () => {
        try {
            const postReq = await axios.post('http://localhost:5000/getposts', {
                userId: userId,
            });
            console.log(postReq.data);
        } catch (err) {
            console.log(err);
        }
    };

    const createPost = async () => {
        try {
            const createPostReq = await axios.post(
                'http://localhost:5000/createpost',
                {
                    userid: userId,
                    title: 'title',
                    content: 'content',
                }
            );

            // console.log(createPostReq.data);
        } catch (err) {
            console.log(err);
        }
    };
    createPost();

    getPosts();

    const Logout = () => {
        removeCookie('token');
        navigate('/signup');
    };
    return (
        <Box>
            <Typography>Home</Typography>
            <MyButton onClick={Logout}>Logout</MyButton>
            <ToastContainer />
        </Box>
    );
};

export default Home;
