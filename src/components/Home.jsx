import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Box, TextField, Typography } from '@mui/material';
import MyButton from './MyButton';
import textFieldStyling from './TextFieldStyling';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState('');
    const postsArr = [];
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const userId = localStorage.getItem('userId');

    const Logout = () => {
        removeCookie('token');
        navigate('/signup');
    };

    const getPosts = async () => {
        try {
            const postReq = await axios.post('http://localhost:5000/getposts', {
                userId: userId,
            });
            const posts = postReq.data.posts;
            posts.map((post) => {
                postsArr.push(post);
            });
        } catch (err) {
            console.log(err);
        }
    };

    console.log(postsArr);

    const createPost = async () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        try {
            const createPostReq = await axios.post(
                'http://localhost:5000/createpost',
                {
                    userId: userId,
                    title: title,
                    content: content,
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    getPosts();

    return (
        <Box>
            <Typography sx={{ fontSize: '36px' }}>Home</Typography>
            <MyButton onClick={Logout}>Logout</MyButton>
            <ToastContainer />

            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ fontSize: '24px' }}>Create Post</Typography>

                <TextField
                    inputRef={titleRef}
                    sx={textFieldStyling}
                    label='Title'
                    variant='outlined'
                    margin='normal'
                />
                <TextField
                    inputRef={contentRef}
                    sx={textFieldStyling}
                    label='Content'
                    variant='outlined'
                    margin='normal'
                />
                <MyButton onClick={createPost}>Create Post</MyButton>
            </Box>

            <Box>
                {postsArr.map((post) => {
                    <Typography>{post}</Typography>;
                })}
            </Box>
        </Box>
    );
};

export default Home;
