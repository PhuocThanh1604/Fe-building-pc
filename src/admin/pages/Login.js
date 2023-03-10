import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {
  getAuth,
  firebaseAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'

import { GoogleButton } from 'react-google-button'
import { UserAuth } from 'src/api/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Form from '@mui/material/FormLabel';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const { user, googleSignIn, accessToken } = UserAuth()
  console.log(user)
  const navigate = useNavigate()
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      if (accessToken) {
        const idToken = await user.getIdToken();
        const response = await axios.post(
          'https://server-buildingpc.herokuapp.com/user/token/google',
         {
             accessToken: accessToken },
             {  headers: {
              Authorization: `Bearer ${idToken}`
         },
         }
        )
        if (response.status == 200) {
          console.log(
            "🚀 ~ file: Login.js:53 ~ handleGoogleSignIn ~ response:",
            response.data.User.roleName
          );
          localStorage.setItem('access_token', JSON.stringify(response.data))
          response.data.User.roleName !== "ROLE_USER"
            ? navigate("/dashbroad")
            : navigate("/");
          // localStorage.setItem('refresh_token', response.data.body.refresh_token)
          // navigate('/dashbroad')
        } else {
          localStorage.removeItem('access_token')
          // localStorage.removeItem('refresh_token')
        }
      } else {
        console.log('Access token not found')
      }
    } catch (error) {
      console.log('error', error)
    }

  }

  useEffect(() => {
    const accessTokenString = localStorage.getItem("access_token");
    let accessToken = null;
    if (typeof accessTokenString === "string" && accessTokenString !== "") {
      accessToken = JSON.parse(accessTokenString);
    }
    let userData = null;
    const userDataString = JSON.parse(localStorage.getItem("access_token"));
    if(typeof userDataString ==="string" && userDataString !== ""){
      userData = JSON.parse(userDataString);
    }
    if (accessToken && userData &&  userData.roleName !=="") {
      navigate("/home");
    } else {
      navigate("");
    }
  }, [navigate]);



  return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//      <div className='login-body'>
//     <div className="container" id="container">
//         <div class="form-container log-in-container">
//             <form action="#">
//             <div className="max-w-[240px] m-auto py-4">
//                       <GoogleButton onClick={handleGoogleSignIn} />
//                     </div>
//             </form >
//         </div>
//         <div className="overlay-container">
//             <div className="overlay">
//                 <div className="overlay-panel overlay-right">
//                     <img src='https://www.tncstore.vn/image/catalog/BAI%20VIET/PC%20Gaming%20m%E1%BB%9Bi/partner01%20(1).jpg' />
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//     </div>
<ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1636489953081-c4ebbd50fa3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleGoogleSignIn}
              >
                Login with google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login
