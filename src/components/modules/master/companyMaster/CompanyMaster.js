import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

//Import Formik and Yup 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { addCompanyMaster, getCompanyMasterByID, updateCompanyMaster } from '../../../../services/CompanyMasterServices';


function CompanyMaster() {

  // Intial Value for Formik 

  const inputFields = {
    companyname: '',
    companycategory: '',
    gstno: '',
    isono: '',
    cinno: '',
    panno: '',
    classcompany: '',
    noofemp: '',
    begindate: '',
    active: '',
    flatno: '',
    street: '',
    place: '',
    state: '',
    country: '',
    zipcode: '',
    email: '',
    website: '',
    mobileno: '',
    fax: '',
    industrytype: '',
    actbalance: '',
    dateofbalancesheet: '',
    financialyear: ''
  }

  //Dropdown
  // const category = ["Single", "Partner"]
  // const classcompany = ["Private", "Public"]
  // const status = ["Active", "Closed"]
  // const Industry = ["Govt", "Non-Govt"]
  // const fyear = ["21-22", "22-23","23-24"]

  const [isCompanyUpdate, setIscompanyUpdate] = useState(false);
  console.log(isCompanyUpdate)
  const {id} = useParams();
  console.log(id)
  const navigate = useNavigate()

  
  const [companyMasterValue, setCompanyMasterValue] = useState(inputFields)

  // ------------------- It is for Yup ---------------------------// 
  const validateyupSchema = Yup.object({
    companyname: Yup.string().required('Required'),
    companycategory: Yup.string().required('Required'),
    gstno: Yup.string().required('Required'),
    isono: Yup.string().required('Required'),
    cinno: Yup.string().required('Required'),
    panno: Yup.string().required('Required'),
    classcompany: Yup.string().required('Required'),
    noofemp: Yup.string().required('Required'),
    begindate: Yup.string().required('Required'),
    active: Yup.string().required('Required'),
    flatno: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    place: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    zipcode: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    website: Yup.string().required('Required'),
    mobileno: Yup.string().required('Required'),
    fax: Yup.string().required('Required'),
    industrytype: Yup.string().required('Required'),
    actbalance: Yup.string().required('Required'),
    dateofbalancesheet: Yup.string().required('Required'),
    financialyear: Yup.string().required('Required')
  })

  useEffect(() => {
    if (id >= 0) {
      getCompanyMasterByID(id).then(res => {
        console.log(res)
        setCompanyMasterValue(res)
      })
      setIscompanyUpdate(true)
    }
  }, [])

  //Submit the data

  const handleSubmit = () => {
    console.log(isCompanyUpdate)
    if (!isCompanyUpdate) {
      addCompanyMaster(companyMasterValue)
      navigate('/CompanyMasterTable')
    } else {
      updateCompanyMaster(companyMasterValue, id)
      navigate('/CompanyMasterTable')
    }
  }

  //onchange data
  const onCompanyMasterChange = (e, setFieldValue) => {
    const { name, value } = e.target
    setCompanyMasterValue({ ...companyMasterValue, [name]: value })
    setFieldValue([name], value)
  }

  return (
    <>

      <div className='contianer mx-auto'>
        <fieldset>
          <div className='m-5'>

            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
              <div className='m-2'>
                Company Master
              </div>
            </h4>
            <Formik
              initialValues={companyMasterValue}
              validationSchema={validateyupSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className='w-75 mx-auto'>
                    <div className='row mb-1 '>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        CompanyName
                      </div>
                      <div className='col-3 '>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='companyname'
                            value={companyMasterValue.companyname}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='companyname' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Company Category
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-select form-select-sm fw-light"
                            component="select"
                            name="companycategory"
                            value={companyMasterValue.companycategory}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          >
                            <option value=""> Choose Category...</option>
                            <option value="Single">Single</option>
                            <option value="Partner">Partner</option>
                          </Field>
                          <ErrorMessage name='companycategory' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        GST no
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='gstno'
                            value={companyMasterValue.gstno}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='gstno' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        ISO No
                      </div>
                      <div className='col-3'>

                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='isono'
                            value={companyMasterValue.isono}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='isono' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Pan No
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='panno'
                            value={companyMasterValue.panno}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='panno' />
                        </div>
                      </div>

                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        CIN No
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='cinno'
                            value={companyMasterValue.cinno}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='cinno' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Class Company
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-select form-select-sm fw-light"
                            component="select"
                            name="classcompany"
                            value={companyMasterValue.classcompany}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          >
                            <option value=""> Choose ...</option>
                            <option value="Private">Private</option>
                            <option value="Public"> Public</option>
                          </Field>
                          <ErrorMessage name='classcompany' />
                        </div>
                      </div>

                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        No of employees
                      </div>

                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='noofemp'
                            value={companyMasterValue.noofemp}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='noofemp' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Date of Begin
                      </div>

                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='begindate'
                            value={companyMasterValue.begindate}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='begindate' />
                        </div>
                      </div>

                      <div className='col-2'></div>

                      <div className='col-2 col-form-label col-form-label-sm'>
                        Active status
                      </div>

                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-select form-select-sm fw-light"
                            component="select"
                            name="active"
                            value={companyMasterValue.active}
                            onChange={e => onCompanyMasterChange(e, setFieldValue)}
                          >
                            <option value=""> Select...</option>
                            <option value="Active"> Active</option>
                            <option value="Closed"> Closed</option>
                          </Field>

                          <ErrorMessage name='active' />
                        </div>
                      </div>
                    </div>

                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Registered Address
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <div className='row mb-1'>
                              <div className='row mb-1'>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  Flat No:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='flatno'
                                      value={companyMasterValue.flatno}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='flatno' />
                                  </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  Street:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='street'
                                      value={companyMasterValue.street}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='street' />
                                  </div>
                                </div>
                              </div>

                              <div className='row mb-1'>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  Place:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='place'
                                      value={companyMasterValue.place}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='place' />
                                  </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  State:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='state'
                                      value={companyMasterValue.state}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='state' />
                                  </div>
                                </div>
                              </div>

                              <div className='row mb-1'>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  Country:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='country'
                                      value={companyMasterValue.country}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='country' />
                                  </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 col-form-label col-form-label-sm'>
                                  Zipcode:
                                </div>
                                <div className='col-3'>
                                  <div class="mb-2 text-danger">
                                    <Field
                                      className="form-control form-control-sm"
                                      type='text'
                                      name='zipcode'
                                      value={companyMasterValue.zipcode}
                                      onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                    />
                                    <ErrorMessage name='zipcode' />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Contact Details
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <div className='row mb-1'>
                              <div className='col-2 col-form-label col-form-label-sm'>
                                Email Id
                              </div>

                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='email'
                                    value={companyMasterValue.email}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />
                                  <ErrorMessage name='email' />
                                </div>
                              </div>
                              <div className='col-2'></div>

                              <div className='col-2 col-form-label col-form-label-sm'>
                                Website
                              </div>
                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='website'
                                    value={companyMasterValue.website}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />

                                  <ErrorMessage name='website' />
                                </div>
                              </div>
                            </div>

                            <div className='row mb-1'>
                              <div className='col-2 col-form-label col-form-label-sm'>
                                Mobile No
                              </div>
                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='mobileno'
                                    value={companyMasterValue.mobileno}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />
                                  <ErrorMessage name='mobileno' />
                                </div>
                              </div>

                              <div className='col-2'></div>

                              <div className='col-2 col-form-label col-form-label-sm'>
                                Fax No
                              </div>
                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='fax'
                                    value={companyMasterValue.fax}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />

                                  <ErrorMessage name='fax' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Account Details
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <div className='row mb-1'>
                              <div className='col-2 col-form-label col-form-label-sm'>
                                Industry Type
                              </div>

                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-select form-select-sm fw-light"
                                    component="select"
                                    name="industrytype"
                                    value={companyMasterValue.industrytype}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  >
                                    <option value=""> Select...</option>
                                    <option value="Govt">Govt</option>
                                    <option value="Non-Govt">Non-Govt</option>
                                  </Field>

                                  <ErrorMessage name='industrytype' />
                                </div>
                              </div>

                              <div className='col-2'></div>

                              <div className='col-2 col-form-label col-form-label-sm'>
                                Account Balance
                              </div>

                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='actbalance'
                                    value={companyMasterValue.actbalance}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />
                                  <ErrorMessage name='actbalance' />
                                </div>
                              </div>
                            </div>

                            <div className='row mb-1'>
                              <div className='col-2 col-form-label col-form-label-sm'>
                                Date Of BalanceSheet
                              </div>

                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-control form-control-sm"
                                    type='text'
                                    name='dateofbalancesheet'
                                    value={companyMasterValue.dateofbalancesheet}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  />
                                  <ErrorMessage name='dateofbalancesheet' />
                                </div>
                              </div>

                              <div className='col-2'></div>

                              <div className='col-2 col-form-label col-form-label-sm'>
                                Financial Year
                              </div>

                              <div className='col-3'>
                                <div class="mb-2 text-danger">
                                  <Field
                                    className="form-select form-select-sm fw-light"
                                    component="select"
                                    name="financialyear"
                                    value={companyMasterValue.financialyear}
                                    onChange={e => onCompanyMasterChange(e, setFieldValue)}
                                  >
                                    <option value=""> Select...</option>
                                    <option value="22-23"> 22-23</option>
                                    <option value="23-24"> 23-24</option>
                                  </Field>

                                  <ErrorMessage name='financialyear' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                          onClick={() => setCompanyMasterValue(inputFields)}>
                          Clear
                        </button>
                      </div>


                      <div className='col-3'>
                        <button
                          type="submit"
                          className='w-50 btn btn-info'
                          onClick={() => setCompanyMasterValue(inputFields)}>Delete
                        </button>
                      </div>

                      <div className='col-3'>
                        <button
                          type="submit"
                          className='w-50 btn btn-info'
                          onClick={() => navigate(`/CompanyMasterTable`)}
                        >Exit
                        </button>
                      </div>
                    </div>
                  </div>

                </Form>)}

            </Formik>
          </div >
        </fieldset >
      </div >

    </>
  )
}

export default CompanyMaster