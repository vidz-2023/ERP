import React, { useEffect, useState } from 'react'
// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import LeaveMasterTable from './LeaveMasterTable';
import { addLeaveMaster, getLeaveByNoOfLeave, getLeaveMasterByID, updateLeaveMaster } from '../../../../services/LeaveMasterService';
import { useNavigate, useParams } from 'react-router-dom';

function LeaveMaster() {
    // Intial Value for Formik
    const inputFields = {
        description: '',
        leaveCode: '',
        leaveType: '',
        applicable: '',
        noOfLeave: '',
        transferable: '',
        cashable: '',
    }
    const [isLeaveUpdate, setIsLeaveUpdate] = useState(false);
    console.log(isLeaveUpdate)
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate()


    const [leaveMasterValue, setLeaveMasterValue] = useState(inputFields)
    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        description: Yup.string().required('Description is required'),
        leaveCode: Yup.string().required('Leavecode is rquired'),
        leaveType: Yup.string().required('Leave Type is required'),
        applicable: Yup.string().required('Applicabale si required'),
        noOfLeave: Yup.string().required('No of Leave is required'),
        transferable: Yup.string().required('Transferable si required'),
        cashable: Yup.string().required('Cashable is required'),
    })
    useEffect(() => {

        if (id >= 0) {
            getLeaveMasterByID(id).then(res => {
                console.log(res)
                setLeaveMasterValue(res)
            })
            setIsLeaveUpdate(true)
        }
    }, [])

    // ------------------- For Submit the Function ---------------------------//

    const handleSubmit = () => {
        if (!isLeaveUpdate) {
            addLeaveMaster(leaveMasterValue)
            navigate('/leaveMasterTable')
        } else {
            updateLeaveMaster(leaveMasterValue, id)
            navigate('/leaveMasterTable')
        }
    }
    // ------------------- On Change Function Declaration ---------------------------//
    const onLeaveMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setLeaveMasterValue({ ...leaveMasterValue, [name]: value })
        setFieldValue([name], value)
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
                        <Formik
                            initialValues={leaveMasterValue}
                            validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize>
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1 '>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Description
                                            </div>
                                            <div className='col-3 '>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='description'
                                                        value={leaveMasterValue.description}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='description' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Leave Code
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field as="select"
                                                        name="leaveCode"
                                                        className="form-select form-select-sm fw-light"
                                                        value={leaveMasterValue.leaveCode}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value=""> Select...</option>
                                                        <option value="0001"> 0001</option>
                                                        <option value="0002"> 0002</option>
                                                        <option value="0003"> 0003</option>
                                                    </Field>                                                       <ErrorMessage name='leaveCode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Leave Type
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field as="select"
                                                        name="leaveType"
                                                        className="form-select form-select-sm fw-light"
                                                        value={leaveMasterValue.leaveType}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value=""> Select...</option>
                                                        <option value="CL"> Casual Leave</option>
                                                        <option value="EL"> Earned Leave</option>
                                                        <option value="PL"> Paid Leave</option>
                                                    </Field>
                                                    <ErrorMessage name='leaveType' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Applicable
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field as="select"
                                                        name="applicable"
                                                        className="form-select form-select-sm fw-light"
                                                        value={leaveMasterValue.applicable}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value=""> Select...</option>
                                                        <option value="Yes"> Yes</option>
                                                        <option value="No"> No</option>
                                                    </Field>
                                                    <ErrorMessage name='applicable' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                No of Leave
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='number'
                                                        name='noOfLeave'
                                                        value={leaveMasterValue.noOfLeave}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='noOfLeave' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Transferable
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='transferable'
                                                        value={leaveMasterValue.transferable}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='transferable' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2  col-form-label col-form-label-sm'>
                                                Cashable
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cashable'
                                                        value={leaveMasterValue.cashable}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cashable' />
                                                </div>
                                            </div>
                                            {/* <div className='col-2'></div>
                                             <div className='col-2  col-form-label col-form-label-sm'>
                                                Leave Balance
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='leaveBalance'
                                                        value={leaveMasterValue.leaveBalance}
                                                        onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)}                                                        
                                                    />
                                                    <ErrorMessage name='leaveBalance' />
                                                </div>
                                            </div>  */}

                                        </div>


                                        <div className=' row mt-3'>
                                            <div className='col-3'>
                                                <button
                                                    type="submit"
                                                    className='w-50 btn btn-info'
                                                >Save
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setLeaveMasterValue(inputFields)}>
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setLeaveMasterValue(inputFields)}>
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/leaveMasterTable`)}>Exit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>
                    </div>
                </fieldset>
            </div>

        </>
    )
}

export default LeaveMaster