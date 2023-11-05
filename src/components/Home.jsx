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
    useEffect(() => {
        const token = localStorage.getItem('token');

        const verifyCookie = async () => {
            if (!token) {
                navigate('/login');
            }
            const { data } = await axios.post(
                'http://localhost:4000',
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                      position: 'top-right',
                  })
                : (removeCookie('token'), navigate('/login'));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
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
