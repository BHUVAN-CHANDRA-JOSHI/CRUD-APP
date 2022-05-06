import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import Radio from '@material-ui/core/Radio';
//import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FormHelperText } from '@material-ui/core'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate();

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        username: '',
        age: '',
        address: '',
        password: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        username: Yup.string().email("Enter valid email").required("Required"),
        age: Yup.string().required("Required"),
        address: Yup.string().required("Required"),

        // gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        // phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        //  confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    })
    const onSubmit = async (values, props) => {
        //     console.log(values)
        //     console.log(props)
        //     setTimeout(() => {

        //         props.resetForm()
        //         props.setSubmitting(false)
        //     }, 2000)
        // }
        const res = await fetch('http://18.223.0.104:5000/signup/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: values.age,
                name: values.name,
                address: values.address,
                username: values.username,
                password: values.password,
            })
        })

        const data = await res.json();
        console.log(data)
        if (data.status === 200) {
            navigate('/')
        } else {
            alert('something went wrong')
        }
        // FETCH USING AXIOS :-()

        // const response = await axios.post('http://192.168.34.72:8000/signup/', {
        //         age: values.age,
        //         name: values.name,
        //         address: values.address,
        //         username: values.username,
        //         password: values.password,
        // })
        // .then((response) => {
        //     console.log(JSON.stringify(response.data))
        // })
        // .catch((error) => {
        //   console.log(error)
        // })




        // const data = res.json()

        // if (data.status === 200) {
        //     
        // } else {
        //    
        // }
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>

                            <Field as={TextField} fullWidth name="name" label='name'
                                placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            <Field as={TextField} fullWidth name="username" label='username'
                                placeholder="Enter your username" helperText={<ErrorMessage name="username" />} />
                            <Field as={TextField} fullWidth name="age" label='age'
                                placeholder="Enter your age" helperText={<ErrorMessage name="age" />} />
                            <Field as={TextField} fullWidth name="address" label='address'
                                placeholder="Enter your address" helperText={<ErrorMessage name="address" />} />


                            {/* <FormControl component="fieldset" style={marginTop}>
                                <FormLabel component="legend">Gender</FormLabel>
                                < Field as={RadioGroup} aria-label="gender" name="gender" name="gender" style={{ display: 'initial' }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </ Field>
                            </FormControl>
                            <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                            <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                    placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />*/}
                            <Field as={TextField} fullWidth name='password' type="password"
                                label='password' placeholder="Enter your password"
                                helperText={<ErrorMessage name="password" />} />
                            {/* <Field as={TextField} fullWidth name="confirmPassword" type="password"
                                label='Confirm Password' placeholder="Confirm your password"
                                helperText={<ErrorMessage name="confirmPassword" />} /> */}
                            <FormControlLabel
                                control={<Field as={Checkbox} name="termsAndConditions" />}
                                label="I accept the terms and conditions."
                            />
                            <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                            <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;