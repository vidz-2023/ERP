import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FaEdit, FaBook } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ExpenseTable from './ExpenseTable';
import ExpenseApprove from './ExpenseApprove';



function ExpenseClaim() {

    const inputFields = {
        empcode: "",
        expenseclaimcode: "",
        billno: "",
        amountSpent: "",
        remarks: "",
        billimage: "",
        approvedamount: "",
        approveremark: "",
        costcenter: ""
    }

    const validationSchema = Yup.object({
        empcode: Yup.string().required('Employee code is required'),
        expenseclaimcode: Yup.string().required('Expense Claim No is required'),
        billno: Yup.string().required('Bill no is required'),
        amountSpent: Yup.string().required('AmountSpent is required'),
        remarks: Yup.string().required('Remarks is required'),
        billimage: Yup.string().required('Bill image is required'),
        approvedamount: Yup.string().required('Approved Amount is required'),
        approveremark: Yup.string().required('Approve Remark is required'),
        costcenter: Yup.string().required('Cost Center is required'),
        
    })
    const handleSubmit = (values) => {
        console.log(values)
    }
    const handleChange = (values) => {
        console.log(values)
    }


    return (
        <div className="container  mx-auto">
            <fieldset>
                <div className='m-5'>
                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                        <div className='m-2'>
                            <FaBook className='me-2' />Expense Claim Form
                        </div>
                    </h4>
                    <Formik onSubmit={handleSubmit} initialValues={inputFields} validationSchema={validationSchema}>
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className='w-75 mx-auto'>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Employee Code
                                        </div>
                                        <div className='col-3'>
                                            <div class="input-group">
                                                <Field className="form-select" as="select"
                                                    name="empcode" 
                                                    onChange={handleChange}>
                                                    <option>select emp code</option>
                                                </Field>
                                                <ErrorMessage name="empcode" className='text-danger' />
                                                {/* <span class="input-group-btn">
                                                    <button className='btn btn-info'><FaEdit /></button>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                        Claim Code
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="expenseclaimcode" />
                                            <ErrorMessage name="expenseclaimcode" />
                                        </div>

                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                        Bill No
                                        </div>
                                       <div className='col-3'>
                                            <Field className="form-control" type='text' name="billno" />
                                            <ErrorMessage name="billno" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                        Amount Spent
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="amountSpent" />
                                            <ErrorMessage name="amountSpent" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                        Remarks
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="remarks" />
                                            <ErrorMessage name="remarks" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                        Bill Image
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='file' name="billimage" />
                                            <ErrorMessage name="billimage" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                        Approved Amount
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="approvedamount" />
                                            <ErrorMessage name="approvedamount" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                        Approve Remark
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="approveremark" />
                                            <ErrorMessage name="approveremark" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                        Cost Center
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="costCenter" />
                                            <ErrorMessage name="costcenter" />
                                        </div>
                                        <div className='col-2'></div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </fieldset>
            <div>
                <ExpenseTable></ExpenseTable>
                <ExpenseApprove></ExpenseApprove>
            </div>
        </div>
    )
}

export default ExpenseClaim