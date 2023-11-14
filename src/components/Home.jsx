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
    const [postsArr, setPostsArr] = useState([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const userId = localStorage.getItem('userId');

    const Logout = () => {
        removeCookie('token');
        navigate('/signup');
        localStorage.removeItem('userId');
    };
    useEffect(() => {
        const getPosts = async () => {
            try {
                const postReq = await axios.post(
                    'http://localhost:5000/getposts',
                    {
                        userId: userId,
                    }
                );

                setPostsArr(postReq.data.posts);

                posts.map((post, i) => {
                    console.log('post', post, i);
                });
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, []);

    console.log('postsArr', postsArr);

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

    return postsArr.length > 0 ? (
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {postsArr.length > 0 &&
                        postsArr.map((post, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'primary.grey',
                                    padding: '20px',
                                }}
                            >
                                <Typography
                                    key={i + 1}
                                    sx={{ fontSize: '24px' }}
                                >
                                    {post.title}
                                </Typography>
                                <Typography key={i + 2}>
                                    {post.content}
                                </Typography>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    ) : (
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
        </Box>
    );
};

export default Home;
