import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

function Login() {
    const inputfields = {
        userName: "",
        password: ""
    }
    const handleSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Name is required').max(6, "max of 6 words").min(2, "minimum 2 characters"),
        password: Yup.string().required('Password is required').matches(/^[]$/, "not correct")
    })

    return (
        <div>
            <Formik initialValues={inputfields} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div>
                            <label>User</label>
                            <Field type="text" name="username" />
                            <ErrorMessage name='username' />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" />
                        </div>
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login