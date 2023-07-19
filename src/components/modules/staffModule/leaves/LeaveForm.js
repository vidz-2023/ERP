import React, { useEffect, useState } from 'react'// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import LeaveFormTable from './LeaveFormTable';
import { addLeaveForm, editLeaveForm, getLeaveFormByID } from '../../../../services/LeaveFormService';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBullseye } from 'react-icons/fa';

function LeaveForm() {
  //Declaration
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(isUpdate)
  const { id } = useParams();
  const navigate = useNavigate()

  // InitialValues Value for Formik
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
    remarkByFinance: '',
    branch: '',
    department: '',
    designation: '',
  }
  const [leaveFormValue, setLeveFormValue] = useState(inputFields)

  const validateyupSchema = Yup.object({
    employee: Yup.string().required('Employee is required'),
    voucherno: Yup.string().required('Voucher no is required'),
    leavecode: Yup.string().required('Leave code is required'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
    leaveIn: Yup.string().required('Data is required'),
    days: Yup.string().required('Days is required'),
    rate: Yup.string().required('Rate is required'),
    amount: Yup.string().required(' Amount is required'),
    remark: Yup.string().required('Remark is required'),
    reason: Yup.string().required('Reason is required'),
    remarkByFinance: Yup.string().required('Remarks are required')
  })


  useEffect(() => {
    if (id >= 0) {
      getLeaveFormByID(id).then(res => {
        console.log(res)
        setLeveFormValue(res)
      })
      setIsUpdate(true)
    }
  }, [])


  const handleSubmit = () => {
    if (!isUpdate) {
      addLeaveForm(leaveFormValue)
      navigate('/leaveFormTable')
    } else {
      editLeaveForm(leaveFormValue, id)
      navigate('/leaveFormTable')
    }
  }
  //Function Declration
  const onLeaveHandlerChange = (e, setFieldValue) => {
    const { name, value } = e.target
    setLeveFormValue({ ...leaveFormValue, [name]: value })
    setFieldValue([name], value)
  }

  return (
    <>
      <div className='contianer mx-auto'>
        <fieldset>
          <div className='m-3'>
            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
              <div className='m-2'>
                <MdOutlineHolidayVillage className='me-2' />Leave Form
              </div>
            </h4>
            <Formik
              initialValues={leaveFormValue}
              validationSchema={validateyupSchema}
              onSubmit={handleSubmit}
              enableReinitialize>
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className='w-75 mx-auto'>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Employee
                      </div>
                      <div className='col-3 '>
                        <div class=" mb-2 text-danger">
                          <Field
                            as="select"
                            name="employee"
                            className="form-select"
                            value={leaveFormValue.employee}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}>
                            <option value="00001"> 00001</option>
                            <option value="00002"> 00002</option>
                            <option value="00003"> 00003</option>
                          </Field>
                          <ErrorMessage name='employee' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Designation
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='designation'
                            value={leaveFormValue.designation}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='designation' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Branch
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='branch'
                            value={leaveFormValue.branch}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='branch' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                       Department
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='department'
                            value={leaveFormValue.department}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='department' />
                        </div>
                      </div>                     

                    </div>


                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Leave Code
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            as="select"
                            name="leavecode"
                            className="form-select"
                            value={leaveFormValue.leavecode}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}>
                            <option value="0001"> 0001</option>
                            <option value="0002"> 0002</option>
                            <option value="0003"> 0003</option>
                          </Field>
                          <ErrorMessage name='leavecode' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Leave In
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            as="select"
                            name="leaveIn"
                            className="form-select"
                            value={leaveFormValue.leaveIn}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}>
                            <option value="FullDay"> FullDay</option>
                            <option value="FirstHalf"> FirstHalf</option>
                            <option value="SecondHalf"> SecondHalf</option>
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
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control"
                            type='date'
                            name='fromDate'
                            value={leaveFormValue.fromDate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='fromDate' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        To Date
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control"
                            type='date'
                            name='toDate'
                            value={leaveFormValue.toDate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='toDate' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Days
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='days'
                            value={leaveFormValue.days}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='days' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Rate
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='rate'
                            value={leaveFormValue.rate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='rate' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Amount
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='amount'
                            value={leaveFormValue.amount}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='amount' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Reason
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='reason'
                            value={leaveFormValue.reason}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='reason' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Remark
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='remark'
                            value={leaveFormValue.remark}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='remark' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Remark By Finance
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='remarkByFinance'
                            value={leaveFormValue.remarkByFinance}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='remarkByFinance' />
                        </div>
                      </div>



                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Voucher No
                      </div>
                      <div className='col-3'>
                        <div class="text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='voucherno'
                            value={leaveFormValue.voucherno}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='voucherno' />
                        </div>
                      </div>
                    
                    </div>

                    <div className=' row mt-1'>
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

      {/* Form Editing the data with props */}
      {/* {isForm &&
        <div className='contianer mx-auto'>
        <fieldset>
          <div className='m-5'>
            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
              <div className='m-2'>
                <MdOutlineHolidayVillage className='me-2' />Leave Form
              </div>
            </h4>
            <Formik
              initialValues={inputFields}
              validationSchema={validateyupSchema}
              onSubmit={handleSubmit}
              enableReinitialize>
              {({ isSubmitting, values }) => (
                <Form>
                  <div className='w-75 mx-auto'>

                    <div className='row mb-1'>
                      <div className='col-2 form-label'>
                        Employee
                      </div>
                      <div className='col-3 '>
                        <div class="input-group text-danger">
                          <Field
                            as="select"
                            name="employee"
                            className="form-select"
                            value={values.employee}>
                            <option value="EMP0001"> EMP0001</option>
                            <option value="EMP0002"> EMP0002</option>
                            <option value="EMP0002"> EMP0003</option>
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
                          <Field
                            className="form-control"
                            type='text'
                            name='voucherno'
                            value={values.voucherno} />
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
                          <Field
                            as="select"
                            name="leavecode"
                            className="form-select"
                            value={values.leavecode}>
                            <option value="0001"> 0001</option>
                            <option value="0002"> 0002</option>
                            <option value="0003"> 0003</option>
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
                          <Field
                            as="select"
                            name="leaveIn"
                            className="form-select"
                            value={values.leaveIn}>
                            <option value="FD"> FullDay</option>
                            <option value="FH"> FirstHalf</option>
                            <option value="SH"> SecondHalf</option>
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
                          <Field
                            className="form-control"
                            type='date'
                            name='fromDate'
                            value={values.fromDate} />
                          <ErrorMessage name='fromDate' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        To Date
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field
                            className="form-control"
                            type='date'
                            name='toDate'
                            value={values.toDate} />
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
                          <Field
                            className="form-control"
                            type='text'
                            name='days'
                            value={values.days} />
                          <ErrorMessage name='days' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Rate
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='rate'
                            value={values.rate} />
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
                          <Field
                            className="form-control"
                            type='text'
                            name='amount'
                            value={values.amount} />
                          <ErrorMessage name='amount' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Reason
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='reason'
                            value={values.reason} />
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
                          <Field
                            className="form-control"
                            type='text'
                            name='remark'
                            value={values.remark} />
                          <ErrorMessage name='remark' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Remark By Finance
                      </div>
                      <div className='col-3'>
                        <div class="input-group text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='remarkByFinance'
                            value={values.remarkByFinance} />
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
      </div>}   */}
    </>
  )
}

export default LeaveForm