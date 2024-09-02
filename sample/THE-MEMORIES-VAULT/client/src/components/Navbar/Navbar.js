import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
    }

    // console.log(user);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">

                <NavLink to="/" className={classes.brandContainer}>
                    <img src={memoriesText} alt='icon' height="45px" />
                    <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
                </NavLink>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>

                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6' >{user?.result.name}</Typography>

                            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <NavLink to="/auth"><Button variant='contained' color='primary'>Sign In</Button></NavLink>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;