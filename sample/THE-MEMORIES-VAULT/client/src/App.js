import React from 'react';
import { Container } from '@mui/material';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
// import Creator from './components/Creator/Creator';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <>
      <GoogleOAuthProvider clientId="645537419272-635iecu7h4eshd267icsfj0e8eeoskp9.apps.googleusercontent.com">
        <BrowserRouter>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path='/' exact Component={() => <Navigate to="/posts" />} />
              <Route path='/posts' exact Component={Home} />
              <Route path='/posts/search' exact Component={Home} />
              <Route path='/posts/:id' exact Component={PostDetails} />
              <Route path='/creators/:name' exact Component={CreatorOrTag} />
              <Route path='/tags/:name' exact Component={CreatorOrTag} />
              {/* <Route path={['/creators/:name', '/tags/:name']} Component={CreatorOrTag} /> */}
              <Route path='/auth' exact Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)} />
            </Routes>

          </Container>
        </BrowserRouter>
      </GoogleOAuthProvider>

    </>
  );
};

export default App;
