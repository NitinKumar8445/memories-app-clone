import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Box, Toolbar, Button, Avatar, useMediaQuery } from '@mui/material';
import memories from '../../memories.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/authSlice';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // ✅ phone breakpoint

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setUser(null);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        width: '100%',
        borderRadius: 2,
        mt: 4,
        mb: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        gap: 2,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'rgba(0,183,255, 1)',
            fontWeight: 600,
            fontSize: {
              xs: '1.8rem',
              sm: '2.5rem',
              md: '3rem',
            },
          }}
        >
          <Link to="/" style={{ color: 'rgba(0,183,255, 1)', textDecoration: 'none' }}>
            Memories
          </Link>
        </Typography>

        <Box
          component="img"
          src={memories}
          alt="icon"
          sx={{
            height: { xs: 30, sm: 60 },
            width: { xs: 30, sm: 60 },
          }}
        />
      </div>

      <Toolbar>
        {!user ? (
          <Button variant="contained" color="primary">
            <Link
              to="/auth"
              style={{ color: 'rgba(0,183,255, 1)', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Sign in
            </Link>
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isSmallScreen ? (
              // ✅ small screens → only logout button
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              // ✅ larger screens → avatar + name + logout
              <>
                <Avatar alt={user?.result?.name} src={user?.result?.picture}>
                  {user?.result?.name?.charAt(0)}
                </Avatar>
                <Typography variant="h6">{user?.result?.name}</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
