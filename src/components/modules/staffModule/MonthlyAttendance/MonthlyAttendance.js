import React, { useState } from 'react'


//import icons
import { MdCalendarMonth } from "react-icons/md";


//import formik and yup
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MonthlyAttendanceTable } from './MonthlyAttendanceTable';


//import { useParams } from 'react-router-dom';

function MonthlyAttendance() {

    //setinitialvalue
    const initialValue = {
        month: "",
        year: "",
        empcode: "",
        Name: "",
        monthdays: "",
        HolidayDays: "",
        holidays: "",
        workingdays: "",
        paidleave: "",
        unpaidleave: "",
        othours: "",
        paiddays: "",
        branch: "",
        dept: "",
        designation: "",
        category: "",
        date: ""
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    //yup declare-display
    const validationSchema = Yup.object({
        month: Yup.string().required('*Required'),
        year: Yup.string().required('*Required')
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
                                            <MdCalendarMonth className='me-2' />Monthly Attendance Process
                                        </div>
                                    </h4>

                                    <div className='w-100 mx-auto'>
                                        {/* <div className='row mb-1'>
                                            <div className='col-1 form-label'>
                                                Month
                                            </div>
                                            <div className='col-2'>
                                                <Field className="form-control" type='month' name='month' />
                                                <ErrorMessage name='month' />
                                            </div>

                                            <div className='col-1 form-label'>
                                                Year
                                            </div>
                                            <div className='col-2'>
                                                <div class="input-group">
                                                    <Field className="form-control" type="number" placeholder="YYYY" min="1999" max="2023" name='year' />
                                                    <ErrorMessage name='year' />
                                                </div>
                                            </div>

                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Filter</button></div>
                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Display</button></div>
                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Process</button></div>
                                        </div> */}

                                    </div>

                                </div>

                            </fieldset>

                        </div>
                    </Form>

                )}

            </Formik>
            <div className='mt-5'>
                <MonthlyAttendanceTable />
                <div className='row mb-3'>
                    <div className='col-2'><button type="submit" className='w-10 btn btn-info m-3 ms-5'>Save</button></div>
                    <div className='col-2'><button type="button" className='w-10 btn btn-info m-3'>Cancel</button></div>
                </div>
            </div>
        </>
    )
}

export default MonthlyAttendance