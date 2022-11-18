import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes';
import { Avatar, Button, Paper, Grid, Typography, Container, Icon } from '@material-ui/core'
import { GoogleLogin } from '@react-oauth/google'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode';
import { signup, signin } from './../../actions/auth'

const initialState = { firstName: '', lastName : '', email : '', password : '', confirmPassword : '' }

const Auth = ({ setIsLogin }) => {
    const navigate = useNavigate()
    const CLIENT_ID = "549408464034-5c1m9kam162p8m4l03fv5blng45vh8ge.apps.googleusercontent.com"
    const classes = useStyles()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState()
    const [isSignUp, setIsSignUp] = useState(true)
    const handleSubmit = (e) => { 
        console.log(formData)
      if(isSignUp){
        dispatch(signup(formData, navigate))
      }else{
        dispatch(signin(formData, navigate))
      }
    };
    const handleChange = (e) => { 
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }
    const googleSuccess = async (res) => {
        const { name, picture, sub } = await jwt_decode(res.credential)
        const result = {
            _type: 'user',
            name: name,
            image: picture,
            _id : sub
        }
        const token = res.credential
        dispatch({type: AUTH, data : { result, token }})
        navigate('/blogs')
    };
    const googleFailure = (error) => console.log("Google sign in was unsuccessful", error);
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />}

                    </Grid>
                </form>
                <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit} className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    render={(renderProps) => (
                        <Button
                            color='primary'
                            className={classes.googleButton}
                            fullWidth onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth