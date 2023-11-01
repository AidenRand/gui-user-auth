import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
        </Routes>
    );
};

export default AppRoutes;
