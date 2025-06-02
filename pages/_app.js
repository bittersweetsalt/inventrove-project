import { AuthProvider } from '../component/context/AuthContext';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState, useMemo } from 'react';


function MyApp({ Component, pageProps }) {

    // const user_settings = localStorage.getItem('user_settings')
    // console.log(user_settings)
    const [data, setData] = useState({ theme: 'light' }); // Initialize with default

    const theme = useMemo(() => createTheme({
    palette: {
        mode: data.theme,
    },
    }), [data.theme]);

    useEffect(() => {
    const savedData = localStorage.getItem('user_settings');
    if (savedData) {
        setData(JSON.parse(savedData));
    }
    }, []);

    const saveData = (newData) => {
        localStorage.setItem('user_settings', JSON.stringify(newData));
        setData(newData);
    };

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;
