import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaBook, FaEdit } from "react-icons/fa";

const SalaryInformation = () => {
  const inputfields = {
    city: '',
    jdate: '',
    cdate: '',
    probmonth: '',
    noticedays: '',
    salary: '',
    sourcing: '',
    skillset: '',
    pan: '',
    uanno: '',
    voterno: '',
    adhar: '',
    passportno: '',
    passportvalidupto: '',
    dlno: '',
    dlvalidupto: ''
  }

  const esiinputfields = {
    esiappl: '',
    pfappl: '',
    proftax: '',
    lwfapplicable: '',
    esino: '',
    esistartdate: '',
    pfno: '',
    pfstartdate: ''
  }

  const bankinputfields = {
    bank: '',
    branch: '',
    bankAcc: '',
    ifsccode: '',
    acholdername: ''
  }
  // .max(6, "Max length").min(2, "Min length")

  const validationSchema = Yup.object({
    jdate: Yup.string().required('Joining Date is required'),
    cdate: Yup.string().required('Confirmation Date is required'),
    probmonth: Yup.string().required('Probation month is required'),
    noticedays: Yup.string().required('Notice days is required'),
    salary: Yup.string().required('Salary is required'),
    // sourcing: Yup.string().required('Confirmation Date is required'),
    skillset: Yup.string().required('Skillset is required'),
    pan: Yup.string().required('Pan number is required'),
    uanno: Yup.string().required('UAN No is required'),
    voterno: Yup.string().required('Voter Id No is required'),
    adhar: Yup.string().required('Adhar card No is required'),
    passportno: Yup.string().required('Passport No is required'),
    passportvalidupto: Yup.string().required('Passport Valid Upto is required'),
    dlno: Yup.string().required('DL no is required'),
    dlvalidupto: Yup.string().required('DL valid upto is required')
  })

  const esivalidationSchema = Yup.object({
    // esiappl: Yup.string().required('Joining Date is required'),
    pfappl: Yup.string().required('PF application is required'),
    proftax: Yup.string().required('Profession tax apllicable is required'),
    lwfapplicable: Yup.string().required('LWF applicable is required'),
    esino: Yup.string().required('ESI no is required'),
    esistartdate: Yup.string().required('ESI start date is required'),
    pfno: Yup.string().required('PF no is required'),
    pfstartdate: Yup.string().required('PF start date is required')
  })

  const bankvalidationSchema = Yup.object({
    bank: Yup.string().required('Bank name is required'),
    branch: Yup.string().required('branch is required'),
    bankAcc: Yup.string().required('Account is required'),
    ifsccode: Yup.string().required('Ifsc code is required'),
    acholdername: Yup.string().required(
      'Please provide the account holder name'
    )
  })

  const handleSubmit = values => {
    console.log(values)
  }

  const esihandleSubmit = values => {
    console.log(values)
  }

  const bankhandleSubmit = values => {
    console.log(values)
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
              initialValues={inputfields}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className='mt-3'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='row'>
                        <label
                          htmlFor='staticEmail'
                          className='col-sm-4 col-form-label'
                        >
                          City Type
                        </label>
                        <div className='col-sm-8'>
                          <Field
                            name='city'
                            as='select'
                            className='form-select form-select-sm'
                            disabled
                          >
                            <option value='metro'>Metro</option>
                          </Field>
                          <ErrorMessage name='city' />
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
                            name='jdate'
                            type='date'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='jdate' />
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
                            name='cdate'
                            type='date'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='cdate' />
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
                            name='probmonth'
                            type='number'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='probmonth' />
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
                            name='noticedays'
                            type='number'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='noticedays' />
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
                            name='salary'
                            as='select'
                            className='form-select form-select-sm'
                          >
                            <option value=''>Select</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </Field>
                          <ErrorMessage name='salary' />
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
                            name='sourcing'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='sourcing' />
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
                            name='skillset'
                            as='select'
                            className='form-select form-select-sm'
                          >
                            <option value=''>Select</option>
                            <option value='html'>HTML</option>
                            <option value='css'>Css</option>
                            <option value='js'>Javascript</option>
                            <option value='react'>React</option>
                          </Field>
                          <ErrorMessage name='skillset' />
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
                            name='pan'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='pan' />
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
                            name='uanno'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='uanno' />
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
                            name='voterno'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='voterno' />
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
                            name='adhar'
                            type='number'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='adhar' />
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
                            name='passportno'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='passport' />
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
                            name='passportvalidupto'
                            type='date'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='passportvalidupto' />
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
                            name='dlno'
                            type='text'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage name='dlno' />
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
                            name='dlvalidupto'
                            type='date'
                            className='form-control form-control-sm'
                          />
                          <ErrorMessage
                            name='dlvalidupto'
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
              <Form className='mt-3'>
                <h5>ESI/PF Information</h5>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='esiappl'
                        className='col-sm-6 col-form-label'
                      >
                        ESI Application
                      </label>
                      <div className='col-sm-6'>
                        <Field
                          className='form-check-input mt-3'
                          type='checkbox'
                          name='esiappl'
                        />
                        <ErrorMessage name='esiappl' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='pfappl'
                        className='col-sm-6 col-form-label'
                      >
                        PF Application
                      </label>
                      <div className='col-sm-6'>
                        <Field
                          className='form-check-input mt-3'
                          type='checkbox'
                          name='pfappl'
                        />
                        <ErrorMessage name='pfappl' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='proftaxapplicable'
                        className='col-sm-6 col-form-label'
                      >
                        Prof. Tax Applicable
                      </label>
                      <div className='col-sm-6'>
                        <Field
                          className='form-check-input mt-3'
                          type='checkbox'
                          name='proftax'
                        />
                        <ErrorMessage name='proftax' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='lwfapplicable'
                        className='col-sm-6 col-form-label'
                      >
                        LWF Applicable
                      </label>
                      <div className='col-sm-6'>
                        <Field
                          className='form-check-input mt-3'
                          type='checkbox'
                          name='lwfapplicable'
                        />
                        <ErrorMessage name='lwfapplicable' />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='esino'
                        className='col-sm-4 col-form-label'
                      >
                        ESI No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          name='esino'
                          type='text'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='esino' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='esistartdate'
                        className='col-sm-4 col-form-label'
                      >
                        ESI Start Date
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='date'
                          name='esistartdate'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='esistartdate' />
                      </div>
                    </div>
                    <div className='row'>
                      <label htmlFor='pfno' className='col-sm-4 col-form-label'>
                        PF No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          name='pfno'
                          type='text'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='pfno' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='pfstartdate'
                        className='col-sm-4 col-form-label'
                      >
                        PF Start Date
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='date'
                          name='pfstartdate'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='pfstartdate' />
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
              <Form className='mt-3'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label htmlFor='bank' className='col-sm-4 col-form-label'>
                        Bank
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          as='select'
                          name='bank'
                          className='form-select form-select-sm'
                        >
                          <option selected>Select...</option>
                          <option value='1'>One</option>
                          <option value='2'>Two</option>
                          <option value='3'>Three</option>
                        </Field>
                        <ErrorMessage name='bank' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='branch'
                        className='col-sm-4 col-form-label'
                      >
                        Branch
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='branch'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='branch' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='bankAcc'
                        className='col-sm-4 col-form-label'
                      >
                        Bank Account No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='bankAcc'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='bankAcc' />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <label
                        htmlFor='swiftcode'
                        className='col-sm-4 col-form-label'
                      >
                        IFSC Code
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='ifsccode'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='ifsccode' />
                      </div>
                    </div>
                    <div className='row'>
                      <label
                        htmlFor='acholdername'
                        className='col-sm-4 col-form-label'
                      >
                        A/c holder Name
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='acholdername'
                          className='form-control form-control-sm'
                        />
                        <ErrorMessage name='acholdername' />
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
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryInformation
