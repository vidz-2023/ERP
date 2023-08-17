
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

 

//Import Formik and Yup

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup'

import { addPlantMaster, getPlantMasterByID, updatePlantMaster } from '../../../../services/PlantMasterServices';

 

 

function PlantMaster() {

 

  // Intial Value for Formik

 

  const inputFields = {

    companyname: '',

    companycategory: '',

    companycode:'',

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

 

  const [isPlantUpdate, setIsplantUpdate] = useState(false);

  console.log(isPlantUpdate)

  const {id} = useParams();

  console.log(id)

  const navigate = useNavigate()

 

 

  const [plantMasterValue, setPlantMasterValue] = useState(inputFields)

 

  // ------------------- It is for Yup ---------------------------//

  const validateyupSchema = Yup.object({

    companyname: Yup.string().required('Required'),

    companycategory: Yup.string().required('Required'),

    companycode: Yup.string().required('Required'),

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

      getPlantMasterByID(id).then(res => {

        console.log(res)

        setPlantMasterValue(res)

      })

      setIsplantUpdate(true)

    }

  }, [])

 

  //Submit the data

 

  const handleSubmit = () => {

    console.log(isPlantUpdate)

    if (!isPlantUpdate) {

      addPlantMaster(plantMasterValue)

      navigate('/PlantMasterTable')

    } else {

      updatePlantMaster(plantMasterValue, id)

      navigate('/PlantMasterTable')

    }

  }

 

  //onchange data

  const onPlantMasterChange = (e, setFieldValue) => {

    const { name, value } = e.target

    setPlantMasterValue({ ...plantMasterValue, [name]: value })

    setFieldValue([name], value)

  }

 

  return (

    <>

 

      <div className='contianer mx-auto'>

        <fieldset>

          <div className='m-5'>

 

            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>

              <div className='m-2'>

                Plant Master

              </div>

            </h4>

            <Formik

              initialValues={plantMasterValue}

              validationSchema={validateyupSchema}

              onSubmit={handleSubmit}

              enableReinitialize

            >

              {({ isSubmitting, setFieldValue }) => (

                <Form>

                  <div className='w-75 mx-auto'>

                    <div className='row mb-1 '>

                      <div className='col-2 form-label'>

                        PlantName

                      </div>

                      <div className='col-3 '>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='companyname'

                            value={plantMasterValue.companyname}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='companyname' />

                        </div>

                      </div>

                      <div className='col-2'></div>

                      <div className='col-2 form-label'>

                        Plant Category

                      </div>

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-select fw-light"

                            component="select"

                            name="companycategory"

                            value={plantMasterValue.companycategory}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

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

                      <div className='col-2 form-label'>

                        GST no

                      </div>

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='gstno'

                            value={plantMasterValue.gstno}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='gstno' />

                        </div>

                      </div>

                      <div className='col-2'></div>

                      <div className='col-2 form-label'>

                        ISO No

                      </div>

                      <div className='col-3'>

 

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='isono'

                            value={plantMasterValue.isono}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='isono' />

                        </div>

                      </div>

                    </div>

 

                    <div className='row mb-1'>

                      <div className='col-2 form-label'>

                        Pan No

                      </div>

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='panno'

                            value={plantMasterValue.panno}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='panno' />

                        </div>

                      </div>

 

                      <div className='col-2'></div>

                      <div className='col-2 form-label'>

                        CIN No

                      </div>

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='cinno'

                            value={plantMasterValue.cinno}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='cinno' />

                        </div>

                      </div>

                    </div>

 

                    <div className='row mb-1'>

                      <div className='col-2 form-label'>

                        Class Company

                      </div>

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-select fw-light"

                            component="select"

                            name="classcompany"

                            value={plantMasterValue.classcompany}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          >

                            <option value=""> Choose ...</option>

                            <option value="Private">Private</option>

                            <option value="Public"> Public</option>

                          </Field>

                          <ErrorMessage name='classcompany' />

                        </div>

                      </div>

 

                      <div className='col-2'></div>

                      <div className='col-2 form-label'>

                        No of employees

                      </div>

 

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='noofemp'

                            value={plantMasterValue.noofemp}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='noofemp' />

                        </div>

                      </div>

                    </div>

 

                    <div className='row mb-1'>

                      <div className='col-2 form-label'>

                        Date of Begin

                      </div>

 

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='begindate'

                            value={plantMasterValue.begindate}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='begindate' />

                        </div>

                      </div>

 

                      <div className='col-2'></div>

 

                      <div className='col-2 form-label'>

                        Active status

                      </div>

 

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-select fw-light"

                            component="select"

                            name="active"

                            value={plantMasterValue.active}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          >

                            <option value=""> Select...</option>

                            <option value="Active"> Active</option>

                            <option value="Closed"> Closed</option>

                          </Field>

 

                          <ErrorMessage name='active' />

                        </div>

 

                   

                      </div>

                    </div>

 

                    <div className='row mb-1'>

                      <div className='col-2 form-label'>

                        Plant Code

                      </div>

 

                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='companycode'

                            value={plantMasterValue.companycode}

                            onChange={e => onPlantMasterChange(e, setFieldValue)}

                          />

                          <ErrorMessage name='companycode' />

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

                                <div className='col-2 form-label'>

                                  Flat No:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='flatno'

                                      value={plantMasterValue.flatno}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

                                    />

                                    <ErrorMessage name='flatno' />

                                  </div>

                                </div>

                                <div className='col-2'></div>

                                <div className='col-2 form-label'>

                                  Street:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='street'

                                      value={plantMasterValue.street}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

                                    />

                                    <ErrorMessage name='street' />

                                  </div>

                                </div>

                              </div>

 

                              <div className='row mb-1'>

                                <div className='col-2 form-label'>

                                  Place:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='place'

                                      value={plantMasterValue.place}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

                                    />

                                    <ErrorMessage name='place' />

                                  </div>

                                </div>

                                <div className='col-2'></div>

                                <div className='col-2 form-label'>

                                  State:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='state'

                                      value={plantMasterValue.state}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

                                    />

                                    <ErrorMessage name='state' />

                                  </div>

                                </div>

                              </div>

 

                              <div className='row mb-1'>

                                <div className='col-2 form-label'>

                                  Country:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='country'

                                      value={plantMasterValue.country}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

                                    />

                                    <ErrorMessage name='country' />

                                  </div>

                                </div>

                                <div className='col-2'></div>

                                <div className='col-2 form-label'>

                                  Zipcode:

                                </div>

                                <div className='col-3'>

                                  <div class="mb-2 text-danger">

                                    <Field

                                      className="form-control"

                                      type='text'

                                      name='zipcode'

                                      value={plantMasterValue.zipcode}

                                      onChange={e => onPlantMasterChange(e, setFieldValue)}

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

                              <div className='col-2 form-label'>

                                Email Id

                              </div>

 

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='email'

                                    value={plantMasterValue.email}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  />

                                  <ErrorMessage name='email' />

                                </div>

                              </div>

                              <div className='col-2'></div>

 

                              <div className='col-2 form-label'>

                                Website

                              </div>

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='website'

                                    value={plantMasterValue.website}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  />

 

                                  <ErrorMessage name='website' />

                                </div>

                              </div>

                            </div>

 

                            <div className='row mb-1'>

                              <div className='col-2 form-label'>

                                Mobile No

                              </div>

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='mobileno'

                                    value={plantMasterValue.mobileno}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  />

                                  <ErrorMessage name='mobileno' />

                                </div>

                              </div>

 

                              <div className='col-2'></div>

 

                              <div className='col-2 form-label'>

                                Fax No

                              </div>

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='fax'

                                    value={plantMasterValue.fax}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

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

                              <div className='col-2 form-label'>

                                Industry Type

                              </div>

 

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-select fw-light"

                                    component="select"

                                    name="industrytype"

                                    value={plantMasterValue.industrytype}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  >

                                    <option value=""> Select...</option>

                                    <option value="Govt">Govt</option>

                                    <option value="Non-Govt">Non-Govt</option>

                                  </Field>

 

                                  <ErrorMessage name='industrytype' />

                                </div>

                              </div>

 

                              <div className='col-2'></div>

 

                              <div className='col-2 form-label'>

                                Account Balance

                              </div>

 

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='actbalance'

                                    value={plantMasterValue.actbalance}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  />

                                  <ErrorMessage name='actbalance' />

                                </div>

                              </div>

                            </div>

 

                            <div className='row mb-1'>

                              <div className='col-2 form-label'>

                                Date Of BalanceSheet

                              </div>

 

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-control"

                                    type='text'

                                    name='dateofbalancesheet'

                                    value={plantMasterValue.dateofbalancesheet}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

                                  />

                                  <ErrorMessage name='dateofbalancesheet' />

                                </div>

                              </div>

 

                              <div className='col-2'></div>

 

                              <div className='col-2 form-label'>

                                Financial Year

                              </div>

 

                              <div className='col-3'>

                                <div class="mb-2 text-danger">

                                  <Field

                                    className="form-select fw-light"

                                    component="select"

                                    name="financialyear"

                                    value={plantMasterValue.financialyear}

                                    onChange={e => onPlantMasterChange(e, setFieldValue)}

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

                          onClick={() => setPlantMasterValue(inputFields)}>

                          Clear

                        </button>

                      </div>

 

 

                      <div className='col-3'>

                        <button

                          type="submit"

                          className='w-50 btn btn-info'

                          onClick={() => setPlantMasterValue(inputFields)}>Delete

                        </button>

                      </div>

 

                      <div className='col-3'>

                        <button

                          type="submit"

                          className='w-50 btn btn-info'

                          onClick={() => navigate(`/PlantMasterTable`)}

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

 

export default PlantMaster