import React, { useState } from 'react'
// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
function PersonMaster() {
    // Intial Value for Formik
    const inputFields = {
        master: '',
        title: '',
        firstName: '',
        lastName: '',
        joiningDate: '',
        flatno: '',
        street: '',
        state: '',
        country: '',
        zipcode: '',
        phoneno: '',
        accHolderName: '',
        accno: '',
        branch: '',
        ifceCode: '',
        headOffice: '',
        location: '',
        authorization: '',
        cash:'',
        card:'',
        taxno:'',
        gst:'',
        tin:'',
        panNo:'',
        bflatno: '',
        bstreet: '',
        bstate: '',
        bcountry: '',
        bzipcode: '',
        bphoneno: ''
    }

    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        master: Yup.string().required('Required'),
        title: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        joiningDate: Yup.string().required('Required'),
        flatno: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        zipcode: Yup.string().required('Required'),
        phoneno: Yup.string().required('Required'),
        accHolderName: Yup.string().required('Required'),
        accno:Yup.string().required('Required'),
        branch: Yup.string().required('Required'),
        ifceCode: Yup.string().required('Required'),
        headOffice: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        authorization: Yup.string().required('Required'),
        cash:Yup.string().required('Required'),
        card:Yup.string().required('Required'),
        taxno:Yup.string().required('Required'),
        gst:Yup.string().required('Required'),
        tin:Yup.string().required('Required'),
        panNo:Yup.string().required('Required'),
        bflatno: Yup.string().required('Required'),
        bstreet: Yup.string().required('Required'),
        bstate: Yup.string().required('Required'),
        bcountry:Yup.string().required('Required'),
        bzipcode: Yup.string().required('Required'),
        bphoneno: Yup.string().required('Required')
    })

    const [personMasterValue, setPersonMasterValue] = useState(inputFields)
    
    return (
        <>
            <div className='contianer mx-auto'>
                <fieldset>
                    <div className='m-5'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                               Person Master
                            </div>
                        </h4>
                        <Formik
                         initialValues={personMasterValue}
                         validationSchema={validateyupSchema}
                        // onSubmit={handleSubmit}
                        // enableReinitialize
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2 '>
                                                Master
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 ">
                                                    <Field as="select"
                                                        name="master"
                                                        className="form-select"
                                                        value={personMasterValue.master}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value=""> Select...</option>
                                                        <option value="0001"> Customer</option>
                                                        <option value="0002"> Vendor</option>
                                                    </Field>                                                       <ErrorMessage name='master' />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Title
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='title'
                                                        value={personMasterValue.title}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='title' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Search
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        type="text"
                                                        className='form-control'
                                                        // onChange={(e) => { searchFun(e) }} 
                                                        placeholder='Search'
                                                        name="search" />
                                                    <ErrorMessage name='search' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                First Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='firstName'
                                                        value={personMasterValue.firstName}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='firstName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Last Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='lastName'
                                                        value={personMasterValue.lastName}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='lastName' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Joining Date
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='date'
                                                        name='joiningDate'
                                                        value={personMasterValue.joiningDate}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='joiningDate' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-2 form-label fw-bold'>
                                            Address:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Flat No:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='flatno'
                                                        value={personMasterValue.flatno}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
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
                                                        value={personMasterValue.street}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='street' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                State:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='state'
                                                        value={personMasterValue.state}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='state' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Country:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='country'
                                                        value={personMasterValue.country}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='country' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                ZipCode:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='zipcode'
                                                        value={personMasterValue.zipcode}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='zipcode' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Phoneno:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='phoneno'
                                                        value={personMasterValue.phoneno}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='phoneno' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-2 form-label fw-bold'>
                                            Account Information:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Acc Holder Name:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='accHolderName'
                                                        value={personMasterValue.accHolderName}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accHolderName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Acc Number:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='accno'
                                                        value={personMasterValue.accno}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accno' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Branch:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='branch'
                                                        value={personMasterValue.branch}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                IFSC Code:
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='ifceCode'
                                                        value={personMasterValue.ifceCode}
                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='ifceCode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Office Information
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Head Office:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='headOffice'
                                                                        value={personMasterValue.headOffice}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='headOffice' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Location:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='location'
                                                                        value={personMasterValue.location}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='location' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Authorization:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='authorization'
                                                                        value={personMasterValue.authorization}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='authorization' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Payment Transcation
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Cash:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='cash'
                                                                        value={personMasterValue.cash}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cash' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Card:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='card'
                                                                        value={personMasterValue.card}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='card' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Tax
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                TaxNo:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='taxno'
                                                                        value={personMasterValue.taxno}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='taxno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                GST:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='gst'
                                                                        value={personMasterValue.gst}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='gst' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Tin:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='tin'
                                                                        value={personMasterValue.tin}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='tin' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                PanNo:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='panNo'
                                                                        value={personMasterValue.panNo}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='panNo' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Billing Information
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Flat No:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bflatno'
                                                                        value={personMasterValue.bflatno}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bflatno' />
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
                                                                        name='bstreet'
                                                                        value={personMasterValue.bstreet}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstreet' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                State:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bstate'
                                                                        value={personMasterValue.bstate}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstate' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Country:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bcountry'
                                                                        value={personMasterValue.bcountry}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bcountry' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                ZipCode:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bzipcode'
                                                                        value={personMasterValue.bzipcode}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bzipcode' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Phoneno:
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bphoneno'
                                                                        value={personMasterValue.bphoneno}
                                                                    //onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bphoneno' />
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
                                                //onClick={() => setPersonMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                //onClick={() => setPersonMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                //onClick={() => navigate(`/personMasterTable`)}
                                                >Exit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default PersonMaster
