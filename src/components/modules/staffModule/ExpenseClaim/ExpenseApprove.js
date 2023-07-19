import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FaEdit, FaBook } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ExpenseTable from './ExpenseTable';
import ExpenseApproveTable from './ExpenseApproveTable';
import { addExpenseApproval } from '../../../../services/ExpenseclaimService';


function ExpenseApprove() {

    const inputFields = {
        empcode: "",
        claimno: "",
        branch: "",
        date: "",
        employee: "",
        voucherno: "",
        narration: "",
        expensestatus: "",
        claimdate: "",
        processdate: "",
        approvedby: "",
        creditGL: "",
        totalamount: "",
        chequeno: "",
        NEFTno: "",
        costcenter: ""
    }

    const validationSchema = Yup.object({
        empcode: Yup.string().required('Employee code is required'),
        claimno: Yup.string().required('Claim No is required'),
        branch: Yup.string().required('Branch Name is required'),
        date: Yup.string().required('Date is required'),
        employee: Yup.string().required('Employee is required'),
        voucherno: Yup.string().required('Voucherno is required'),
        narration: Yup.string().required('Narration is required'),
        expensestatus: Yup.string().required('Expensestatus is required'),
        claimdate: Yup.string().required('Claim date is required'),
        processdate: Yup.string().required('Process date is required'),
        approvedby: Yup.string().required('Approved by field is required'),
        creditGL: Yup.string().required('creditGL is required'),
        totalamount: Yup.string().required('Total amount is required'),
        chequeno: Yup.string().required('Cheque no is required'),
        NEFTno: Yup.string().required('NEFT no is required'),
        costcenter: Yup.string().required('Cost center is required'),
    })
    const handleSubmit = (values) => {
        console.log(values)
        addExpenseApproval(values).then((res) => {
            console.log(res)
        })
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
                            <FaBook className='me-2' />Expense Approve Form
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
                                        <div className='col-3 text-danger'>
                                            <div class="input-group">
                                            <Field className="form-control" type='text' name="empcode" />
                                                <ErrorMessage name="empcode" className="text-danger" />
                                                {/* <span class="input-group-btn">
                                                    <button className='btn btn-info'><FaEdit /></button>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Claim No
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="claimno" />
                                            <ErrorMessage name="claimno" className="text-danger" />
                                        </div>

                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Branch
                                        </div>
                                        <div className='col-3'>
                                            <div class="input-group">
                                                <Field className="form-select" as="select"
                                                    name="branch"
                                                    onChange={handleChange}>
                                                    <option>select Branch</option>
                                                    <option>IT</option>
                                                    <option>HR</option>
                                                    <option>Support</option>
                                                </Field>
                                                <ErrorMessage name="branch" className="text-danger" />
                                                {/* <span class="input-group-btn">
                                                    <button className='btn btn-info'><FaEdit /></button>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Date
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='date' name="date" />
                                            <ErrorMessage name="date" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Employee
                                        </div>
                                        <div className='col-3'>
                                            <div class="input-group">
                                                <Field className="form-select" as="select"
                                                    name="employee"
                                                    onChange={handleChange}>
                                                    <option>select employee</option>
                                                </Field>
                                                <ErrorMessage name="employee" className="text-danger" />
                                                {/* <span class="input-group-btn">
                                                    <button className='btn btn-info'><FaEdit /></button>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Voucher No
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="voucherno" />
                                            <ErrorMessage name="voucherno" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Narration
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="narration" />
                                            <ErrorMessage name="narration" className="text-danger" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Expense Status
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="expensestatus" />
                                            <ErrorMessage name="expensestatus" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Claim Date
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='date' name="claimdate" />
                                            <ErrorMessage name="claimdate" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Process Date
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='date' name="processdate" />
                                            <ErrorMessage name="processdate" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Approved By
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="approvedby" />
                                            <ErrorMessage name="approvedby" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Credit GL
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="creditGL" />
                                            <ErrorMessage name="creditGL" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            Total Amount
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="totalamount" />
                                            <ErrorMessage name="totalamount" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Cheque No
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="chequeno" />
                                            <ErrorMessage name="chequeno" />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>
                                            NEFT No
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="NEFTno" />
                                            <ErrorMessage name="NEFTno" />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>
                                            Cost Center
                                        </div>
                                        <div className='col-3'>
                                            <Field className="form-control" type='text' name="costcenter" />
                                            <ErrorMessage name="costcenter" />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </fieldset>
            <div>
                <ExpenseApproveTable></ExpenseApproveTable>
            </div>
        </div>
    )
}

export default ExpenseApprove