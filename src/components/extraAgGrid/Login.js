import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';

function Login() {

    // const [formValue, setFormValue] = useState(null);
    const inputfields = {
        username: "",
    }

    const [user, setUser] = useState(inputfields);

    useEffect(() => {
        // const fetchData = async () => {
        axios.get("http://localhost:3000/del?username=nidhi").then((res) => {
            console.log("fetched data", res.data[0])
            setUser(res.data[0])
        })
        // }
        // fetchData()
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
        // setFormValue(user)
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Name is required')
    })

    const handleNameChange = (e) => {
        // setFieldValue("username", e.target.value)
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Formik initialValues={user}
            // onSubmit={value => { console.log("result:", value) }}

            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ values, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div>
                            <label>User</label>

                            <Field
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleNameChange}
                            />
                            <ErrorMessage name='username' />
                        </div>
                        <button type='submit'>Submit</button>
                    </Form>
                )
            }}
        </Formik >
    )
}

export default Login