import React, { useEffect, useState } from 'react'

//Import Formik and Yup 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

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
    address: '',
    email: '',
    website: '',
    telno: '',
    mobileno: '',
    fax: '',
    industrytype: '',
    actbalance: '',
    dateofbalancesheet: '',
    finacialyear: ''
  }


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
    address: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    website: Yup.string().required('Required'),
    telno: Yup.string().required('Required'),
    mobileno: Yup.string().required('Required'),
    fax: Yup.string().required('Required'),
    industrytype: Yup.string().required('Required'),
    actbalance: Yup.string().required('Required'),
    dateofbalancesheet: Yup.string().required('Required'),
    finacialyear: Yup.string().required('Required')
  })
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
              validationSchema={validateyupSchema}>
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className='w-75 mx-auto'>
                    <div className='row mb-1 '>
                      <div className='col-2 form-label'>
                        CompanyName
                      </div>
                      <div className='col-3 '>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control"
                            type='text'
                            name='companyname'
                            value={companyMasterValue.companyname}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
                          />
                          <ErrorMessage name='companyname' />
                       </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 form-label'>
                        Company Category
                    </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                         <Field
                            className="form-control"
                            type='text'
                            name='companycategory'
                           value={companyMasterValue.companycategory}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
                          />
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
                            value={companyMasterValue.gstno}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
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
                            value={companyMasterValue.isono}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
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
                            value={companyMasterValue.panno}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
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
                            value={companyMasterValue.cinno}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
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
                            className="form-control"
                            type='text'
                            name='classcompany'
                            value={companyMasterValue.classcompany}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
                          />
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
                            value={companyMasterValue.noofemp}
                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 
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

                            value={companyMasterValue.begindate}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

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

                            className="form-control"

                            type='text'

                            name='active'

                            value={companyMasterValue.active}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='active' />



                        </div>

                      </div>

                    </div>



                    <div className='row mb-1'>



                      <div className='col-2 form-label'>

                        Address

                      </div>



                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='adddress'

                            value={companyMasterValue.adddress}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='address' />

                        </div>

                      </div>



                      <div className='col-2'></div>



                      <div className='col-2 form-label'>

                        Email Id

                      </div>



                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='email'

                            value={companyMasterValue.email}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='email' />



                        </div>

                      </div>

                    </div>



                    <div className='row mb-1'>



                      <div className='col-2 form-label'>

                        Website

                      </div>



                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='website'

                            value={companyMasterValue.website}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='website' />

                        </div>

                      </div>



                      <div className='col-2'></div>



                      <div className='col-2 form-label'>

                        Tel No

                      </div>



                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='telno'

                            value={companyMasterValue.telno}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='telno' />



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

                            value={companyMasterValue.mobileno}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

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

                            value={companyMasterValue.fax}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='fax' />



                        </div>

                      </div>

                    </div>



                    <div className='row mb-1'>



                      <div className='col-2 form-label'>

                        Industry Type

                      </div>



                      <div className='col-3'>

                        <div class="mb-2 text-danger">

                          <Field

                            className="form-control"

                            type='text'

                            name='industrytype'

                            value={companyMasterValue.industrytype}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

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

                            value={companyMasterValue.actbalance}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

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

                            value={companyMasterValue.dateofbalancesheet}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

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

                            className="form-control"

                            type='text'

                            name='finacialyear'

                            value={companyMasterValue.finacialyear}

                          //  onChange={e => onLeaveMasterHandlerChange(e, setFieldValue)} 

                          />

                          <ErrorMessage name='finacialyear' />



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

                          type="submit"

                          className='w-50 btn btn-info'

                        >Delete

                        </button>



                      </div>



                      <div className='col-3'>

                        <button

                          type="submit"

                          className='w-50 btn btn-info'

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