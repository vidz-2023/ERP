import React from 'react'
// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import LeaveMasterTable from './LeaveMasterTable';

function LeaveMaster() {

    // ------------------- Used For Drop Downs ---------------------------//
    const selectOpt = ["0001", "0002", "0003"]
    const selectOpt1 = ["Casual Leave", "Earned Leave", "Paid Leave"]
    const selectOpt2 = ["Daliy", "Weekly", "Monthly"]
    // Intial Value for Formik
    const inputFields = {
        description: '',
        leaveCode: '',
        email: '',
        leaveType: '',
        applicable: '',
        noOfLeave: '',
        transferable: '',
        cashable: ''
    }
    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        description: Yup.string().required('Description is required'),
        leaveCode: Yup.string().required('Leavecode is rquired'),
        email: Yup.string().required('Email Id i srequired'),
        leaveType: Yup.string().required('Leave Type is required'),
        applicable: Yup.string().required('Applicabale si required'),
        noOfLeave: Yup.string().required('No of Leave is required'),
        transferable: Yup.string().required('Transferable si required'),
        cashable: Yup.string().required('Cashable is required')
    })
    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <>
            <div className='contianer mx-auto'>
                <fieldset>
                    <div className='m-5'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                <MdOutlineHolidayVillage className='me-2' />Leave Master
                            </div>
                        </h4>
                        <Formik initialValues={inputFields} validationSchema={validateyupSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1 '>
                                            <div className='col-2 form-label'>
                                                Description
                                            </div>
                                            <div className='col-3 '>
                                                <div class="input-group text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='description' />
                                                    <ErrorMessage name='description' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Leave Code
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="leaveCode" className="form-select">
                                                        {selectOpt.map((item) => <option>{item}</option>)}
                                                    </Field>                                                        <ErrorMessage name='leaveCode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Leave Type
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="leaveType" className="form-select">
                                                        {selectOpt1.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='leaveType' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Applicable
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="applicable" className="form-select">
                                                        {selectOpt2.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='applicable' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                No of Leave
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='noOfLeave' />
                                                    <ErrorMessage name='noOfLeave' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Transferable
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='transferable' />
                                                    <ErrorMessage name='transferable' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Cashable
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='cashable' />
                                                    <ErrorMessage name='cashable' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Email ID
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='email' name='email' />
                                                    <ErrorMessage name='email' />
                                                </div>
                                            </div>

                                        </div>


                                        <div className=' row mt-3'>
                                            <div className='col-3'>
                                                <button type="submit" className='w-50 btn btn-info'>Save</button></div>

                                            <div className='col-3'>
                                                <button type="button" className='w-50 btn btn-info'>Clear</button>
                                            </div>

                                            <div className='col-3'>
                                                <button type="button" className='w-50 btn btn-info'>Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button type="button" className='w-50 btn btn-info'>Exit</button>
                                            </div>
                                        </div>

                                    </div>
                                </Form>)}
                        </Formik>
                    </div>
                </fieldset>
            </div>

            <LeaveMasterTable/>
        </>
    )
}

export default LeaveMaster