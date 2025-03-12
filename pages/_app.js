import { AuthProvider } from '../component/context/AuthContext';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
      mode: 'light',  // or 'dark'
    },
  });

function MyApp({ Component, pageProps }) {
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
