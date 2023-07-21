import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaEdit, FaBook } from 'react-icons/fa'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import pic from '../../../../assets/images/profilepic.png'
import ExpenseTable from './ExpenseTable'
import ExpenseApprove from './ExpenseApprove'
import { addExpenseClaim, addExpenseClaimDetail, updateExpenseClaim } from '../../../../services/ExpenseclaimService'
import { useParams } from 'react-router-dom'

function ExpenseClaim () {
  const [isUpdate, setIsUpdate] = useState(false)
  const {id} = useParams()

  const inputFields = {
    empCode: '',
    ClaimNo: '',
    Branch: '',
    Date: '',
    VoucherNo: '',
    Narration: '',
    expenseStatus: '',
    claimdate: '',
    processdate: '',
    ApprovedBy: '',
    creditGL: '',
    TotalAmount: '',
    ChequeNo: '',
    NEFTNo: '',
    CostCenter: ''
  }

  const expenseDetailInputFields = {
    empcode: '',
    expenseclaimcode: '',
    billno: '',
    amountSpent: '',
    Remarks: '',
    bilimage: '',
    ApprovedAmount: '',
    ApproveRemark: '',
    CostCenter: ''
  }

  const [expenseClaim, setExpenseClaim] = useState(inputFields)
  const [expenseClaimDetail, setExpenseClaimDetail] = useState(
    expenseDetailInputFields
  )

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
    costcenter: Yup.string().required('Cost center is required')
  })

  const expenseDetailValidationSchema = Yup.object({
    empcode: Yup.string().required('Employee code is required'),
    expenseclaimcode: Yup.string().required('Expense Claim No is required'),
    billno: Yup.string().required('Bill no is required'),
    amountSpent: Yup.string().required('AmountSpent is required'),
    remarks: Yup.string().required('Remarks is required'),
    billimage: Yup.string().required('Bill image is required'),
    approvedamount: Yup.string().required('Approved Amount is required'),
    approveremark: Yup.string().required('Approve Remark is required'),
    costcenter: Yup.string().required('Cost Center is required')
  })

  const handleSubmit = () => {
    console.log(expenseClaim)
    if (!isUpdate) {
        addExpenseClaim(inputFields).then(res => console.log(res.data))
        alert("Data added successfully")
    }else{
        updateExpenseClaim(inputFields, id)
        alert("Data updated successfully")
    }
  }

  const expenseDetailhandleSubmit = values => {
    console.log(values)
  }

  const handleChange = values => {
    console.log(values)
  }
  return (
    <div className='container mt-3 mb-5'>
      <h4 className='text-info w-100 mb-3 text-center border border-2 border-info-subtle'>
        <div className='m-2'>
          <FaBook className='me-2' />
          Expense Claim Form
        </div>
      </h4>
      {/* Tabs Section */}
      <ul className='nav nav-tabs' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link text-info active'
            id='expenseclaim-tab'
            data-bs-toggle='tab'
            data-bs-target='#expenseclaim-tab-pane'
            type='button'
            role='tab'
            aria-controls='expenseclaim-tab-pane'
            aria-selected='true'
          >
            Expense Claim
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link text-info'
            id='expenseClaimDetail-tab'
            data-bs-toggle='tab'
            data-bs-target='#expenseclaimDetail-tab-pane'
            type='button'
            role='tab'
            aria-controls='expenseclaimDetail-tab-pane'
            aria-selected='false'
          >
            Expense Claim Details
          </button>
        </li>
      </ul>

      <div className='tab-content' id='myTabContent'>
        <div
          className='tab-pane fade show active'
          id='expenseclaim-tab-pane'
          role='tabpanel'
          aria-labelledby='expenseclaim-tab'
          tabIndex='0'
        >
          <Formik
            onSubmit={handleSubmit}
            initialValues={inputFields}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className='mt-3'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='empCode'
                        className='col-sm-4 col-form-label'
                      >
                        Emp Code
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          name='empCode'
                          type='text'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='empCode' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='claimno'
                        className='col-sm-4 col-form-label'
                      >
                        ClaimNo
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='claimno'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='claimno' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='Branch'
                        className='col-sm-4 col-form-label'
                      >
                        Branch
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='Branch'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='Branch' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label htmlFor='date' className='col-sm-4 col-form-label'>
                        Date
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='date'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='date' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='voucherno'
                        className='col-sm-4 col-form-label'
                      >
                        VoucherNo
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='voucherno'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='voucherno'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='Narration'
                        className='col-sm-4 col-form-label'
                      >
                        Narration
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='Narration'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='Narration'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='expenseStatus'
                        className='col-sm-4 col-form-label'
                      >
                        Expense Status
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='expenseStatus'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='expenseStatus'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='claimdate'
                        className='col-sm-4 col-form-label'
                      >
                        claim date
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='date'
                          name='claimdate'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='claimdate'
                          className='text-danger'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='processdate'
                        className='col-sm-4 col-form-label'
                      >
                        Process Date
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='date'
                          name='processdate'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='processdate'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='ApprovedBy'
                        className='col-sm-4 col-form-label'
                      >
                        Approved By
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='ApprovedBy'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='ApprovedBy'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='creditGL'
                        className='col-sm-4 col-form-label'
                      >
                        credit GL
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='creditGL'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='creditGL' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='TotalAmount'
                        className='col-sm-4 col-form-label'
                      >
                        Total Amount
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='TotalAmount'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='TotalAmount'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='ChequeNo'
                        className='col-sm-4 col-form-label'
                      >
                        ChequeNo
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='ChequeNo'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='ChequeNo' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='NEFTNo'
                        className='col-sm-4 col-form-label'
                      >
                        NEFT No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='NEFTNo'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='NEFTNo' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='CostCenter'
                        className='col-sm-4 col-form-label'
                      >
                        Cost Center
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='CostCenter'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='CostCenter'
                          className='text-danger'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row justify-content-md-center'>
                  <button type='submit' className='w-25 mt-4 mb-4 btn btn-info'>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className='tab-pane fade'
          id='expenseclaimDetail-tab-pane'
          role='tabpanel'
          aria-labelledby='expenseclaimDetail-tab'
          tabIndex='0'
        >
          <Formik
            onSubmit={expenseDetailhandleSubmit}
            initialValues={expenseDetailInputFields}
            validationSchema={expenseDetailValidationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className='mt-3'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='empCode'
                        className='col-sm-4 col-form-label'
                      >
                        Emp Code
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          name='empCode'
                          type='text'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='empCode' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='expenseclaimcode'
                        className='col-sm-4 col-form-label'
                      >
                        Expense Claim Code
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='expenseclaimcode'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='expenseclaimcode'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='billno'
                        className='col-sm-4 col-form-label'
                      >
                        Bill No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='billno'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='billno' className='text-danger' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='bilimage'
                        className='col-sm-4 col-form-label'
                      >
                        Bill Image
                      </label>
                      <div className='col-sm-8'>
                        {/* <Field
                          type='number'
                          name='bilimage'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='bilimage' className='text-danger' /> */}
                        <div className='border w-50 mx-auto'>
                          <img src={pic} className='img-fluid' alt='...' />
                          <div className='mt-2 ms-2 mb-4'>
                            {' '}
                            <button type='button' className='btn btn-info'>
                              Browse
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='amountSpent'
                        className='col-sm-4 col-form-label'
                      >
                        Amount Spent
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='amountSpent'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='amountSpent'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='ApprovedAmount'
                        className='col-sm-4 col-form-label'
                      >
                        Approved Amount
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='ApprovedAmount'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='ApprovedAmount'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='ApproveRemark'
                        className='col-sm-4 col-form-label'
                      >
                        Approve Remark
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='ApproveRemark'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='ApproveRemark'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='CostCenter'
                        className='col-sm-4 col-form-label'
                      >
                        Cost Center
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='number'
                          name='CostCenter'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage
                          name='CostCenter'
                          className='text-danger'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='Remarks'
                        className='col-sm-4 col-form-label'
                      >
                        Remarks
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='Remarks'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='Remarks' className='text-danger' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row justify-content-md-center'>
                  <button type='submit' className='w-25 mt-4 mb-4 btn btn-info'>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className='row'>
            
        </div>
      </div>

      {/* <div>
        {/* <ExpenseTable></ExpenseTable>
                <ExpenseApprove></ExpenseApprove>
      </div> */}
    </div>
  )
}

export default ExpenseClaim
