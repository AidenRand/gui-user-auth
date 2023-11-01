import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import './index.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#292929',
            grey: '#363636',
            blue: '#1e79e8',
            darkBlue: '#1669c9',
            white: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);
