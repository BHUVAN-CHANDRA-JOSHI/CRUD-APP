import React from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import { Formik, Form, Field,ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'

function ForgotPassword() {
    const navigate=useNavigate();

    //     const [showResults, setShowResults] = React.useState(false)
    //     const onClick = () =>  setShowResults(true);
    // const Results = () => (
    //     <div id="results">
    //      <h1>THANKU</h1> 
    //     </div>
    //   )

    const paperStyle = { padding: 60, height: '50vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password:'',
        newpassword:''

    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
         password: Yup.string().required("Required"),
        newpassword: Yup.string().required("Required")
    })
    const onSubmit = async (values) => {
        const res = await fetch('http://18.223.0.104:5000/resetpassword/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                newpassword: values.newpassword
            })
        })

        const data = await res.json()
        if (data.status === 200) {
            console.log(data)
           // navigate('/')
            
        } else {
            alert('error found')
            
        }
    }
    //     console.log(values)
    //     console.log(props)
    //     setTimeout(() => {

    //         props.resetForm()
    //         props.setSubmitting(false)
    //     }, 2000)
    // }

        



    return (
        <Grid>
            {/* { showResults ? <Results /> :   */}
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>SP</Avatar>
                    <h2>Reset Password</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                             <Field as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />}
                            />
                            <Field as={TextField} label='password' name="password"
                                placeholder='Enter password' fullWidth required
                                helperText={<ErrorMessage name="password" />}
                            />
                             <Field as={TextField} label='newpassword' name="newassword"
                                placeholder='Enter newpassword' fullWidth required
                                helperText={<ErrorMessage name="newpassword" />}
                            />
                                 <Button type='submit' color='primary' variant="contained"
                                style={btnstyle} fullWidth >submit</Button>
                              


                        </Form>
                    )}
                </Formik>
            </Paper> 
        </Grid>


    )
}

export default ForgotPassword;
