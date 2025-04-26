// Theme Provider
import { CssBaseline, ThemeProvider } from '@mui/material';
import { baselightTheme } from './theme/DefaultColors';
import React from 'react';
// Router Provider
// import { RouterProvider, useRoutes } from 'react-router-dom';
import MERNRouter from './routes/Router';

// Redux Provider
import { Provider } from 'react-redux';
import store from './store';
// Tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer />
        <CssBaseline />
        {/* {routing} */}
        {/* <RouterProvider router={MERNRouter} /> */}
        <MERNRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
