import { useState } from 'react';
import { LoginMutation } from '../../types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Avatar, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { facebookLogin, googleLogin, login } from './usersThunks.ts';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginMutation>({
    email: '',
    password: '',
  });


  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const facebookLoginHandler = async (accessToken: string, userID: string) => {
    await dispatch(facebookLogin({accessToken, userID})).unwrap();
    navigate('/');
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{mt: 3, width: '100%'}}>
            {loginError.error}
          </Alert>
        )}

        <Box sx={{pt: 2}}>
          <FacebookLogin
            appId="4035739626713177"
            onSuccess={response => facebookLoginHandler(response.accessToken, response.userID)}
            onFail={() => alert('Facebook Login failed!')}
          />
        </Box>

        <Box sx={{pt: 2}}>
          <GoogleLogin
            onSuccess={(credentialResponse => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            })}
            onError={() => alert('Login failed!')}
          />
        </Box>

        <Box component="form" noValidate onSubmit={submitHandler} sx={{mt: 3}}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={inputChangeHandler}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>

              <NavLink to="/register">
                No account yet? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;