import React, { useState } from 'react';
import Input from './Input';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { loginSuccess } from '../../reducers/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Icon from './Icon';

import { signIn, signUp } from '../../reducers/authSlice';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
    navigate('/')
  };

  const googleSuccess = async (res) => {
    const token = res.credential; // JWT
    const decodedUser = jwtDecode(token);

    try {
      // Structure the payload to match our Redux state
      const payload = {
        result: {
          name: decodedUser.name,
          email: decodedUser.email,
          picture: decodedUser.picture,
          sub: decodedUser.sub,
        },
        token,
      };

      dispatch(loginSuccess(payload));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  const googleError = (error) => {
    console.log(error)
    console.log('Google Sign In was unsuccessful. Try again later')
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'secondary.main',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '24px' }} // ✅ converted form styles 
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError}

          />


          <Grid container justifyContent="flex-end">
            <Grid >
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
