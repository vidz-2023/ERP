import React, { useState } from 'react'

//import icons
import { BiTime } from "react-icons/bi";
//import {AiOutlineSearch} from "react-icons/ai";

//import formik and yup
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TimeSheetTable } from './TimeSheetTable';

function TimeSheet() {

    //dropdowns
    const Branch = ["BAN", "CHE", "HYD"]

    //setinitialvalue
    const initialValue = {
        branch: " ",
        empname: " ",
        voucherno: "",
        date: "",
        tsfordate: ""
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    //yup declare-display
    const validationSchema = Yup.object({
        branch: Yup.string().required('*Required'),
        empname: Yup.string().required('*Required'),
        voucherno: Yup.string().required('*Required'),
        date: Yup.string().required('*Required'),
        tsfordate: Yup.string().required('*Required')
    })

    return (
        <>

            <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className='contianer mx-auto'>
                            <fieldset>
                                <div className='m-3'>
                                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                                        <div className='m-2'>
                                            <BiTime className='me-2' />TimeSheet Report
                                        </div>
                                    </h4>


                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="branch" class="form-select form-select-sm">
                                                        {Branch.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Voucher No
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control form-control-sm" type='text' name='voucherno' />
                                                    <ErrorMessage name='voucherno' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Employee Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                <Field className="form-control form-control-sm" type='text' name='empname' />
                                                    <ErrorMessage name='empname' />
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Date
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control form-control-sm" type='date' name='date' />
                                                    <ErrorMessage name='date' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>                                          
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">                                              
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 col-form-label col-form-label-sm'>
                                               Ts For Date
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control form-control-sm" type='date' name='tsfordate' />
                                                    <ErrorMessage name='tsfordate' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>                                          
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">                                              
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 col-form-label col-form-label-sm'>
                                               Search
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control form-control-sm" type='text' name='search'/>
                                                    <ErrorMessage name='search' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </Form>

                )}

            </Formik>
<TimeSheetTable />
        </>
    )
}

export default TimeSheet