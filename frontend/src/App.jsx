import { useState, useEffect } from 'react';
import { Box, CircularProgress} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('https://blogdom-backend.onrender.com/'); // Adjust the URL to your backend's health check endpoint
        if (response.ok) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Backend is still waking up', error);
        setTimeout(checkBackend, 3000); // Retry every 3 seconds
      }
    };

    checkBackend();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
      </Box>
  );
  }

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
