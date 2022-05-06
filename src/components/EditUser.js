import React, { useState, useEffect } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const initialValues = {
    name: '',
    username: '',
    age: '',
    address: '',
    password: '',
    termsAndConditions: false
}


const EditUser = () => {
    const { id } = useParams();
    //alert(id);
    const navigate = useNavigate();

    const [user, setUser] = useState(initialValues)
    const { name, username, age, address, password} = user;
    const onValueChange = e => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    };
    useEffect(() => {
        loadUser();
    }, []);
  
    const loadUser = async () => {
        const result = await axios.get(`http://18.223.0.104:5000/userdata/${id}`)
        const data = result.data.udata;              //udata is the unique id data
        setUser(data);
    }
        // const result= await axios.get('http://18.216.47.58:8000/userdata/${id}').then((response) => {
        //     console.log('result');
        //     setUser(result.data);
        // }).catch((error) => {
        //     console.log('error')
        // })
        
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }


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
    const onSubmit= async e =>{
        e.preventDefault();
        await axios.put(`http://18.223.0.104:5000/userdata/${id}`, user);
     navigate("/allusers");
      }; 
    // const onSubmit = async (values, props) => {

    //     const res = await fetch('', {
    //         method: 'put',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },

    //     })

    //     const data = await res.json();
    //     console.log(data)
    //     if (data.status === 200) {
    //         navigate('/EditUser')
    //     } else {
    //         alert('something went wrong')
    //     }
    // }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Edit user</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form onSubmit={e => onSubmit(e)}>

                            <Field as={TextField} fullWidth onChange={(e) => onValueChange(e)} value={name} name="name" label='name'
                                placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            <Field as={TextField} fullWidth onChange={(e) => onValueChange(e)} value={username} name="username" label='username'
                                placeholder="Enter your username" helperText={<ErrorMessage name="username" />} />
                            <Field as={TextField} fullWidth onChange={(e) => onValueChange(e)} value={age} name="age" label='age'
                                placeholder="Enter your age" helperText={<ErrorMessage name="age" />} />
                            <Field as={TextField} fullWidth onChange={(e) => onValueChange(e)} value={address} name="address" label='address'
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
                                color='primary'>{props.isSubmitting ? "Loading" : "update user"}</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default EditUser;