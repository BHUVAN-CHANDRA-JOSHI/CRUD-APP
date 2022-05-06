import React from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import { Formik, Form, Field,ErrorMessage } from 'formik'

import * as Yup from 'yup'

function ForgotPassword() {

    const paperStyle = { padding: 60, height: '50vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        email: ''
    }
    const validationSchema= Yup.object().shape({
email:Yup.string().email("Enter valid email").required("Required")

    })
    const onSubmit = (values, props) => {
        console.log(values)
        console.log(props)
        setTimeout(() => {

            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }
        



    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>SP</Avatar>
                    <h2>Forgot Password</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Email' name="email"
                                placeholder='Enter a valid Email' helperText={<ErrorMessage name="Email" />} fullWidth required />
                                 <Button type='submit' color='primary' variant="contained"
                                style={btnstyle} fullWidth>Send</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>


    )
}

export default ForgotPassword;
