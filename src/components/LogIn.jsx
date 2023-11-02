import React, { useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import TextFieldStyling from './TextFieldStyling.jsx';
import MyButton from './MyButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const postReq = await axios
                .post('http://localhost:5000/login', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Logged In successful!', {
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
            toast.error('Log In failed!', {
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
        passwordRef.current.value = '';
    };

    return (
        <Box>
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
                    Log In
                </Typography>
                <TextField
                    required
                    inputRef={emailRef}
                    label='Email'
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
        </Box>
    );
}

export default LogIn;
