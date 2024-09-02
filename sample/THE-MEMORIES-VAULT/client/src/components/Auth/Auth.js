import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { AUTH } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }

    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = jwt_decode(res.credential);
        const token = res.credential;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    return (
        <>

            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockPersonIcon />
                    </Avatar>
                    <Typography component="h1" variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color='primary'
                                    fullWidth onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} startIcon={<Icon />}
                                    variant='contained '>Google Sign In</Button>
                            )}
                            onSuccess={googleSuccess} onError={googleFailure}
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

        </>
    )
}

export default Auth 