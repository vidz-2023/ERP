import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaBook, FaEdit } from 'react-icons/fa'
import {
  addEsiPfInfo,
  addOfficialInfo,
  addbanckInfo,
  getOfficialInfo,
  getOfficialInfoById,
  updateOfficialInfo
} from '../../../../services/salaryInfoService'
import { useParams } from 'react-router-dom'

const SalaryInformation = () => {
  // const [empcount, setEmpcount] = useState()
  const [allEmpCode, setAllEmpCode] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const { id } = useParams()

  const inputfields = {
    empCode: '',
    CityType: 'Metro Default value',
    JoiningDate: '',
    ConfirmationDate: '',
    ProbationMonths: '',
    NoticeDays: '',
    SalaryWages: '',
    Sourcing: '',
    SkillSet: '',
    PANNo: '',
    UANNo: '',
    VoterIDNo: '',
    AadharCardNo: '',
    PassportNo: '',
    PassportValidUpto: '',
    DLNo: '',
    DLValidupto: ''
  }

  const esiinputfields = {
    ESIApplication: '',
    PFApplication: '',
    ProfTaxApplicable: '',
    LWFApplicable: '',
    ESINo: '',
    ESIStartDate: '',
    PFNo: '',
    PFStartDate: ''
  }

  const bankinputfields = {
    Bank: '',
    Branch: '',
    BankAccountNo: '',
    SwiftCode: '',
    ACHolderName: ''
  }

  const [officialFormValues, setOfficialFormValues] = useState(inputfields)

  useEffect(() => {
    getAllEmpCode()
    console.log(id)
    if (id > 0) {
      console.log('edit')
      getOfficialInfoById(id).then(res => {
        console.log(res)
        setOfficialFormValues(res)
      })
      setIsUpdate(true)
    }
  }, [])

  const getAllEmpCode = () => {
    getOfficialInfo().then(res => {
      //for getting all emp code on select
      const codes = res.data.map(emp => emp.empCode)
      console.log(codes)
      setAllEmpCode(codes)
    })
  }
  // const getlastEmpCode = () => {
  //   getOfficialInfo().then(res => {
  //     //for last emp code
  //     const data = res.data.slice(-1)[0]
  //     console.log(data.empCode)
  //     const prefix = '0000'
  //     const lastempCode = parseInt(data.empCode) + 1
  //     setEmpcount(prefix + lastempCode)
  //     console.log(empcount)
  //   })
  // }

  const validationSchema = Yup.object({
    empCode: Yup.string(),
    CityType: Yup.string(),
    JoiningDate: Yup.string().required('Joining Date is required'),
    ConfirmationDate: Yup.string().required('Confirmation Date is required'),
    ProbationMonths: Yup.string().required('Probation month is required'),
    NoticeDays: Yup.string().required('Notice days is required'),
    SalaryWages: Yup.string().required('Salary is required'),
    // Sourcing: Yup.string().required('Confirmation Date is required'),
    SkillSet: Yup.string().required('Skillset is required'),
    PANNo: Yup.string().required('Pan number is required'),
    UANNo: Yup.string().required('UAN No is required'),
    VoterIDNo: Yup.string().required('Voter Id No is required'),
    AadharCardNo: Yup.string().required('Adhar card No is required'),
    PassportNo: Yup.string().required('Passport No is required'),
    PassportValidUpto: Yup.string().required('Passport Valid Upto is required'),
    DLNo: Yup.string().required('DL no is required'),
    DLValidupto: Yup.string().required('DL valid upto is required')
  })

  const esivalidationSchema = Yup.object({
    // ESIApplication: Yup.string().required('Joining Date is required'),
    PFApplication: Yup.string().required('PF application is required'),
    ProfTaxApplicable: Yup.string().required(
      'Profession tax apllicable is required'
    ),
    LWFApplicable: Yup.string().required('LWF applicable is required'),
    ESINo: Yup.string().required('ESI no is required'),
    ESIStartDate: Yup.string().required('ESI start date is required'),
    PFNo: Yup.string().required('PF no is required'),
    PFStartDate: Yup.string().required('PF start date is required')
  })

  const bankvalidationSchema = Yup.object({
    Bank: Yup.string().required('Bank name is required'),
    Branch: Yup.string().required('Branch is required'),
    BankAccountNo: Yup.string().required('Account is required'),
    SwiftCode: Yup.string().required('Ifsc code is required'),
    ACHolderName: Yup.string().required(
      'Please provide the account holder name'
    )
  })

  const onOfficialHandlerChange = (e, setFieldValue) => {
    const {name, value} = e.target
    setOfficialFormValues({...officialFormValues, [name]: value})
    setFieldValue([name], value)
  }

  const handleSubmit = () => {
    console.log(officialFormValues)
    if (!isUpdate) {
      addOfficialInfo(officialFormValues).then(res => console.log(res.data))
    }else{
      updateOfficialInfo(officialFormValues, id)
      alert("Data updated successfully")
      setOfficialFormValues('')
    }
  }

  const esihandleSubmit = values => {
    console.log(values)
    if (values) {
      addEsiPfInfo(values).then(res => console.log(res.data))
    }
  }

  const bankhandleSubmit = values => {
    console.log(values)
    if (values) {
      addbanckInfo(values).then(res => console.log(res.data))
    }
  }

  return (
    <div>
      <div className='container mt-3 mb-5'>
        <h4 className='text-info w-100 mb-3 text-center border border-2 border-info-subtle'>
          <div className='m-2'>
            <FaBook className='me-2' />
            Salary Information
          </div>
        </h4>

        <ul className='nav nav-tabs' id='myTab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link text-info active'
              id='official-tab'
              data-bs-toggle='tab'
              data-bs-target='#official-tab-pane'
              type='button'
              role='tab'
              aria-controls='official-tab-pane'
              aria-selected='true'
            >
              Official Information
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link text-info'
              id='esi-tab'
              data-bs-toggle='tab'
              data-bs-target='#esi-tab-pane'
              type='button'
              role='tab'
              aria-controls='esi-tab-pane'
              aria-selected='false'
            >
              ESI PF
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link text-info'
              id='bank-tab'
              data-bs-toggle='tab'
              data-bs-target='#bank-tab-pane'
              type='button'
              role='tab'
              aria-controls='bank-tab-pane'
              aria-selected='false'
            >
              Bank Details
            </button>
          </li>
        </ul>

        {/* ---------------official information ------------------------ */}
        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='official-tab-pane'
            role='tabpanel'
            aria-labelledby='official-tab'
            tabIndex='0'
          >
            <Formik
              initialValues={officialFormValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize
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
                            type='number'
                            className='form-control form-control-sm'
                            value={officialFormValues.empCode}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='empCode'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='CityType'
                          className='col-sm-4 col-form-label'
                        >
                          City Type
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='CityType'
                            as='select'
                            className='form-select form-select-sm'
                            value={officialFormValues.CityType}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value='Metro Default only'>
                              Metro Default only
                            </option>
                          </Field>
                          <ErrorMessage
                            name='CityType'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Joining Date
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='JoiningDate'
                            type='date'
                            className='form-control form-control-sm'
                            value={officialFormValues.JoiningDate}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='JoiningDate'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Confirmation Date
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='ConfirmationDate'
                            type='date'
                            className='form-control form-control-sm'
                            value={officialFormValues.ConfirmationDate}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='ConfirmationDate'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Probation Months
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='ProbationMonths'
                            type='number'
                            className='form-control form-control-sm'
                            value={officialFormValues.ProbationMonths}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='ProbationMonths'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Notice Days
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='NoticeDays'
                            type='number'
                            className='form-control form-control-sm'
                            value={officialFormValues.NoticeDays}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='NoticeDays'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Salary/Wages
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='SalaryWages'
                            as='select'
                            className='form-select form-select-sm'
                            value={officialFormValues.SalaryWages}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value=''>Select</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </Field>
                          <ErrorMessage
                            name='SalaryWages'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Sourcing
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='Sourcing'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.Sourcing}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='Sourcing'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Skill Set
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='SkillSet'
                            as='select'
                            className='form-select form-select-sm'
                            value={officialFormValues.SkillSet}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value=''>Select</option>
                            <option value='html'>HTML</option>
                            <option value='css'>Css</option>
                            <option value='js'>Javascript</option>
                            <option value='react'>React</option>
                          </Field>
                          <ErrorMessage name='SkillSet' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          PAN
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='PANNo'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.PANNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='PANNo' />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          UAN No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='UANNo'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.UANNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='UANNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          VoterID No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='VoterIDNo'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.VoterIDNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='VoterIDNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Adhar Card No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='AadharCardNo'
                            type='number'
                            className='form-control form-control-sm'
                            value={officialFormValues.AadharCardNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='AadharCardNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Passport No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='PassportNo'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.PassportNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='PassportNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          Passport Valid Upto
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='PassportValidUpto'
                            type='date'
                            className='form-control form-control-sm'
                            value={officialFormValues.PassportValidUpto}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='PassportValidUpto' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          DL No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='DLNo'
                            type='text'
                            className='form-control form-control-sm'
                            value={officialFormValues.DLNo}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name='DLNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          DL Valid Upto
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='DLValidupto'
                            type='date'
                            className='form-control form-control-sm'
                            value={officialFormValues.DLValidupto}
                            onChange={e =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='DLValidupto'
                            className='text-danger'
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row justify-content-md-center'>
                    <button
                      type='submit'
                      className='w-25 mt-4 mb-4 btn btn-info'
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/*---------------------- ESI PF information-------------- */}
          <div
            className='tab-pane fade'
            id='esi-tab-pane'
            role='tabpanel'
            aria-labelledby='esi-tab'
            tabIndex='0'
          >
            <Formik
              initialValues={esiinputfields}
              onSubmit={esihandleSubmit}
              validationSchema={esivalidationSchema}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className='mt-3'>
                  <h5>ESI/PF Information</h5>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='row'>
                        <label
                          htmlFor='empCode'
                          className='col-sm-6 col-form-label'
                        >
                          Emp Code
                        </label>
                        <div className='col-sm-6'>
                          <Field
                            as='select'
                            name='empCode'
                            type='text'
                            className='form-control form-control-sm'
                          >
                            {allEmpCode &&
                              allEmpCode.map(empcode => (
                                <option key={empcode} value={empcode}>
                                  {empcode}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage
                            name='empCode'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='ESIApplication'
                          className='col-sm-6 col-form-label'
                        >
                          ESI Application
                        </label>
                        <div className='col-sm-6'>
                          <Field
                            className='form-check-input mt-3'
                            type='checkbox'
                            name='ESIApplication'
                          />
                          <ErrorMessage name='ESIApplication' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='PFApplication'
                          className='col-sm-6 col-form-label'
                        >
                          PF Application
                        </label>
                        <div className='col-sm-6'>
                          <Field
                            className='form-check-input mt-3'
                            type='checkbox'
                            name='PFApplication'
                          />
                          <ErrorMessage name='PFApplication' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='ProfTaxApplicableapplicable'
                          className='col-sm-6 col-form-label'
                        >
                          Prof. Tax Applicable
                        </label>
                        <div className='col-sm-6'>
                          <Field
                            className='form-check-input mt-3'
                            type='checkbox'
                            name='ProfTaxApplicable'
                          />
                          <ErrorMessage name='ProfTaxApplicable' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='LWFApplicable'
                          className='col-sm-6 col-form-label'
                        >
                          LWF Applicable
                        </label>
                        <div className='col-sm-6'>
                          <Field
                            className='form-check-input mt-3'
                            type='checkbox'
                            name='LWFApplicable'
                          />
                          <ErrorMessage name='LWFApplicable' />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='row'>
                        <label
                          htmlFor='ESINo'
                          className='col-sm-4 col-form-label'
                        >
                          ESI No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='ESINo'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='ESINo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='ESIStartDate'
                          className='col-sm-4 col-form-label'
                        >
                          ESI Start Date
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            type='date'
                            name='ESIStartDate'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='ESIStartDate' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='PFNo'
                          className='col-sm-4 col-form-label'
                        >
                          PF No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='PFNo'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='PFNo' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='PFStartDate'
                          className='col-sm-4 col-form-label'
                        >
                          PF Start Date
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            type='date'
                            name='PFStartDate'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='PFStartDate' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row justify-content-md-center'>
                    <button
                      type='submit'
                      className='w-25 mt-4 mb-4 btn btn-info'
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/*---------------------- Bank information-------------- */}
          <div
            className='tab-pane fade'
            id='bank-tab-pane'
            role='tabpanel'
            aria-labelledby='bank-tab'
            tabIndex='0'
          >
            <Formik
              initialValues={bankinputfields}
              onSubmit={bankhandleSubmit}
              validationSchema={bankvalidationSchema}
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
                            as='select'
                            name='empCode'
                            type='text'
                            className='form-control form-control-sm'
                          >
                            {allEmpCode &&
                              allEmpCode.map(empcode => (
                                <option key={empcode} value={empcode}>
                                  {empcode}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage
                            name='empCode'
                            className='text-danger'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='Bank'
                          className='col-sm-4 col-form-label'
                        >
                          Bank
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            as='select'
                            name='Bank'
                            className='form-select form-select-sm'
                          >
                            <option selected>Select...</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </Field>
                          <ErrorMessage name='Bank' />
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
                          <ErrorMessage name='Branch' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='BankAccountNo'
                          className='col-sm-4 col-form-label'
                        >
                          Bank Account No
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            type='text'
                            name='BankAccountNo'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='BankAccountNo' />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='row'>
                        <label
                          htmlFor='Swiftcode'
                          className='col-sm-4 col-form-label'
                        >
                          IFSC Code
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            type='text'
                            name='SwiftCode'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='SwiftCode' />
                        </div>
                      </div>
                      <div className='row'>
                        <label
                          htmlFor='ACHolderName'
                          className='col-sm-4 col-form-label'
                        >
                          A/c holder Name
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            type='text'
                            name='ACHolderName'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='ACHolderName' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row justify-content-md-center'>
                    <button
                      type='submit'
                      className='w-25 mt-4 mb-4 btn btn-info'
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryInformation
