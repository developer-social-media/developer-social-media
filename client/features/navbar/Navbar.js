import { AppBar } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';



const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <AppBar position='static'>
              <Container maxWidth="xl">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/landingpage">Landing Page</Link>
              </Container>
            </AppBar>

          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
