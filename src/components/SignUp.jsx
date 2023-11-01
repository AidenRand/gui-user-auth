import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import MyButton from './MyButton';
import TextFieldStyling from './TextFieldStyling';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const postReq = await axios
                .post('http://localhost:5000/signup', {
                    email: email,
                    password: password,
                    username: username,
                })
                .then((res) => {
                    // console.log(res.data.success);
                    if (res.data.success) {
                        toast.success('Account created successfully!', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                        });
                    }
                });
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

        console.log(status);

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
            <ToastContainer />
        </Box>
    );
}

export default SignUp;
