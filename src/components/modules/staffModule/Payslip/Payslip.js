import React, { useState } from 'react'


//import icons
import { ImAddressBook } from 'react-icons/im';

//import formik and yup
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Payslip = () => {

    //dropdowns
    const view = ["AB_Payslip", "BC_Payslip"]
    const salarywages = ["Salary", "ABC", "XYZ"]

    //setinitialvalue
    const initialValue = {
        month: " ",
        year: " ",
        dept: "",
        emp: "",
        designation: "",
        branch: "",
        view: "",
        salarywages: ""
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        month: Yup.string().required('*Required'),
        year: Yup.string().required('*Required'),
        dept: Yup.string().required('*Required'),
        emp: Yup.string().required('*Required'),
        designation: Yup.string().required('*Required'),
        branch: Yup.string().required('*Required'),
        view: Yup.string().required('*Required'),
        salarywages: Yup.string().required('*Required')
    })


    return (
        <>

            <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className='contianer mx-auto'>
                            <fieldset>
                                <div className='m-3'>
                                    <h4 className='text-info mb-3 bg-primary'>
                                        <div className='m-2 text-white'>
                                            Generate Payslip
                                        </div>
                                    </h4>

                                    <div>
                                        <h4 className='text-info w-100 mb-3 mt-1 border border-info-subtle'>
                                            <div className='m-2'>
                                                <ImAddressBook className='me-2' />Information

                                            </div>
                                        </h4>


                                        <div className='w-100 mx-auto'>

                                            <div className='row mb-1'>
                                                <div className='col-2 form-label'>
                                                    Month
                                                </div>
                                                <div className='col-3 text-danger'>
                                                    <Field className="form-control" type='month' name='month' />
                                                    <ErrorMessage name='month' />
                                                </div>
                                            </div>

                                            <div className='row mb-1 mt-2'>
                                                <div className='col-2 form-label'>
                                                    Year
                                                </div>
                                                <div className='col-3'>
                                                    <div class="input-group text-danger">
                                                        <Field className="form-control" type="number" placeholder="YYYY" min="1999" max="2023" name='year' />
                                                        <ErrorMessage name='year' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1 mt-2'>
                                            <div className='col-2 form-label'>
                                                Department
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='dept' />
                                                    <ErrorMessage name='dept' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1 mt-2'>

                                            <div className='col-2 form-label'>
                                                Employee
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='emp' />
                                                    <ErrorMessage name='emp' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1 mt-2'>
                                            <div className='col-2 form-label'>
                                                Designation
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='designation' />
                                                    <ErrorMessage name='designation' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1 mt-2'>

                                            <div className='col-2 form-label'>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='branch' />
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='row mb-1 mt-2'>
                                            <div className='col-2 form-label'>
                                                View
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="view" class="form-select">
                                                        {view.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='view' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1 mt-2'>
                                            <div className='col-2 form-label'>
                                                Salary/Wages
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="salarywages" class="form-select">
                                                        {salarywages.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='view' />
                                                </div>
                                            </div>


                                        </div>

                                        <div className='row mb-3 bg-primary'>
                                            <div className='col-1'><button type="submit" className='w-5 btn btn-primary text-white m-3'>Print</button></div>
                                            <div className='col-1'><button type="button" className='w-5 btn btn-primary text-white m-3'>Email</button></div>
                                        </div>

                                    </div>
                                </div>

                            </fieldset>
                        </div>

                    </Form>

                )}


            </Formik>


        </>
    )
}

