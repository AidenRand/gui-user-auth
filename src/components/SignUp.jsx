import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Typography, Link } from '@mui/material';
import MyButton from './MyButton';
import TextFieldStyling from './TextFieldStyling';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const signupReq = await axios.post('http://localhost:5000/signup', {
                email: email,
                password: password,
                username: username,
            });

            if (signupReq.data.success) {
                toast.success('Account created successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                });
                const loginReq = await axios.post(
                    'http://localhost:5000/login',
                    {
                        email: email,
                        password: password,
                    }
                );
                console.log(loginReq.data.token);
                localStorage.setItem('token', loginReq.data.token);
                const authReq = await axios.post('http://localhost:5000/', {
                    email: email,
                    password: password,
                    Headers: { bearer: loginReq.data.token },
                });
                navigate('/');

                console.log(authReq.data);
            }
        } catch (err) {
            toast.error('Account creation failed!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }

        emailRef.current.value = '';
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                bgcolor: 'primary.main',
                boxShadow: '0px 5px 10px 0px #191919',
                marginTop: '15%',
                height: '500px',
                width: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '20px',
            }}
        >
            <Typography sx={{ fontSize: '32px', fontWeight: '900' }}>
                Sign Up
            </Typography>
            <TextField
                required
                inputRef={emailRef}
                label='Email'
                sx={TextFieldStyling}
            />
            <TextField
                required
                inputRef={usernameRef}
                label='Username'
                sx={TextFieldStyling}
            />
            <TextField
                required
                inputRef={passwordRef}
                label='Password'
                sx={TextFieldStyling}
            />

            <MyButton type='submit'>Sign Up</MyButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Typography>Already a member? </Typography>
                <Link
                    href='http://localhost:5173/login'
                    sx={{ color: 'primary.blue' }}
                >
                    {'Login Now'}
                </Link>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default SignUp;
