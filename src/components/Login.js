import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

const Login = ({ handleChange }) => {

    const navigate = useNavigate();
    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = async (values) => {
        const res = await fetch('http://18.223.0.104:5000/login/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })

        const data = await res.json()
        if (data.status === 200) {
            //console.log(data)
            navigate('/allusers')
            
        } else {
            alert('error found')
            
        }
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>SP</Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth >{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography >
                    <Link href="/forgotpassword" >
                        Forgot password ?
                    </Link>
                    <br></br>
                    <Link href="/resetpassword" >
                        Reset password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="/Signup" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login