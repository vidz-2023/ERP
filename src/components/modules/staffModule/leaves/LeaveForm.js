import React from 'react'// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import LeaveFormTable from './LeaveFormTable';

function LeaveForm() {
  // ------------------- Used For Drop Downs ---------------------------//
  const selectOpt = ["EMP0001", "EMP0002", "EMP0003"]
  const selectOpt1 = ["0001", "0002", "0003"]
  const selectOpt2 = ["Daliy", "Weekly", "Monthly"]
  // Intial Value for Formik
  const inputFields = {
    employee: '',
    voucherno: '',
    leavecode: '',
    fromDate: '',
    toDate: '',
    leaveIn: '',
    days: '',
    rate: '',
    amount: '',
    reason: '',
    remark: '',
    remarkByFinance: ''
  }

  const validateyupSchema = Yup.object({
    employee: Yup.string().required('Employee is required'),
    voucherno: Yup.string().required('Voucher no is required'),
    leavecode: Yup.string().required('Leave code is required'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
    leaveIn: Yup.string().required('Data is required'),
    days: Yup.string().required('Days is required'),
    rate: Yup.string().required('Rate is required'),
    amount: Yup.string().required(' AMount is required'),
    remark: Yup.string().required('Remark is required'),
    reason: Yup.string().required('Reason is required'),
    remarkByFinance: Yup.string().required('Remarks are required')
  })

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
                <MdOutlineHolidayVillage className='me-2' />Leave Form
              </div>
            </h4>
            <Formik initialValues={inputFields} validationSchema={validateyupSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className='w-75 mx-auto'>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Employee
                      </div>
                      <div className='col-3 '>
                        <div class="input-group text-danger">
                          <Field as="select" name="employee" className="form-select">
                            {selectOpt.map((item) => <option>{item}</option>)}
                          </Field>
                          <ErrorMessage name='employee' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Voucher No
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='voucherno' />
                          <ErrorMessage name='voucherno' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Leave Code
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field as="select" name="leavecode" className="form-select">
                            {selectOpt1.map((item) => <option>{item}</option>)}
                          </Field>
                          <ErrorMessage name='leavecode' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Leave In
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field as="select" name="leaveIn" className="form-select">
                            {selectOpt2.map((item) => <option>{item}</option>)}
                          </Field>
                          <ErrorMessage name='leaveIn' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        From Date
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='date' name='fromDate' />
                          <ErrorMessage name='fromDate' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        To Date
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='date' name='toDate' />
                          <ErrorMessage name='toDate' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Days
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='days' />
                          <ErrorMessage name='days' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Rate
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='rate' />
                          <ErrorMessage name='rate' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Amount
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='amount' />
                          <ErrorMessage name='amount' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Reason
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='reason' />
                          <ErrorMessage name='reason' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Remark
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='remark' />
                          <ErrorMessage name='remark' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Remark By Finance
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field className="form-control" type='text' name='remarkByFinance' />
                          <ErrorMessage name='remarkByFinance' />
                        </div>
                      </div>

                    </div>


                    <div className=' row mt-3'>
                      <div className='col-3'>
                        <button type="submit" className='w-50 btn btn-info'>Apply</button></div>

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
      <LeaveFormTable/>

    </>
  )
}

export default LeaveForm