import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import Footer from '../features/footer/footer';
import { ThemeProvider, useTheme } from '@mui/material/styles';



const App = () => {

  return (
    <div>
          <Navbar />
          <AppRoutes />
          <Footer />
    </div>

  );
};

export default App;
