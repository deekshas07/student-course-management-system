import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import App from './App';

const theme = createTheme({
  palette: {
    primary:   { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    success:   { main: '#2e7d32' },
    error:     { main: '#d32f2f' },
    info:      { main: '#0288d1' },
  },
  typography: {
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
