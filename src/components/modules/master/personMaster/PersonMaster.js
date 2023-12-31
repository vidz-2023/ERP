import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { addPersonMaster, getPersonMasterByID, updatePersonMaster } from '../../../../services/personMasterService';

function PersonMaster() {
    // Intial Value for Formik
    const inputFields = {
        title: '',
        firstName: '',
        lastName: '',
        joiningDate: '',
        contactPerson: '',
        inActive: '',
        flatno: '',
        street: '',
        state: '',
        city: '',
        country: '',
        zipcode: '',
        phoneno: '',
        aemail: '',
        accHolderName: '',
        accno: '',
        bankName: '',
        branch: '',
        ifceCode: '',
        headOffice: '',
        location: '',
        authorization: '',
        payment: '',
        paymentTerm: '',
        priceCategory: '',
        taxno: '',
        taxType: '',
        cin: '',
        gst: '',
        gstCategory: '',
        gstTdsAPP: '',
        tdsSection: '',
        tdsAPP: '',
        tin: '',
        panNo: '',
        bflatno: '',
        bstreet: '',
        bstate: '',
        bcity: '',
        bcountry: '',
        bzipcode: '',
        bphoneno: '',
        bemail: '',
        website: '',
        faceBook: '',
        skype: '',
        twitter: '',
        linkedIn: '',
        youTube: ''
    }

    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        title: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        joiningDate: Yup.string().required('Required'),
        contactPerson: Yup.string().required('Required'),
        inActive: Yup.string().required('Required'),
        flatno: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        zipcode: Yup.string().required('Required'),
        phoneno: Yup.string().required('Required'),
        aemail: Yup.string().required('Required'),
        accHolderName: Yup.string().required('Required'),
        accno: Yup.string().required('Required'),
        bankName: Yup.string().required('Required'),
        branch: Yup.string().required('Required'),
        ifceCode: Yup.string().required('Required'),
        headOffice: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        authorization: Yup.string().required('Required'),
        payment: Yup.string().required('Required'),
        paymentTerm: Yup.string().required('Required'),
        priceCategory: Yup.string().required('Required'),
        taxno: Yup.string().required('Required'),
        taxType: Yup.string().required('Required'),
        cin: Yup.string().required('Required'),
        gst: Yup.string().required('Required'),
        gstCategory: Yup.string().required('Required'),
        gstTdsAPP: Yup.string().required('Required'),
        tdsSection: Yup.string().required('Required'),
        tdsAPP: Yup.string().required('Required'),
        tin: Yup.string().required('Required'),
        panNo: Yup.string().required('Required'),
        bflatno: Yup.string().required('Required'),
        bstreet: Yup.string().required('Required'),
        bstate: Yup.string().required('Required'),
        bcity: Yup.string().required('Required'),
        bcountry: Yup.string().required('Required'),
        bzipcode: Yup.string().required('Required'),
        bphoneno: Yup.string().required('Required'),
        bemail: Yup.string().required('Required'),
        website: Yup.string().required('Required'),
        faceBook: Yup.string().required('Required'),
        skype: Yup.string().required('Required'),
        twitter: Yup.string().required('Required'),
        linkedIn: Yup.string().required('Required'),
        youTube: Yup.string().required('Required'),
    })

    //Declaration
    const [personMasterValue, setPersonMasterValue] = useState(inputFields)
    const [isPersonUpdate, setIsPersonUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

    //Fetching The Data
    useEffect(() => {
        console.log(id)
        if (id >= 0) {
            getPersonMasterByID(id).then(res => {
                console.log(res)
                setPersonMasterValue(res)
            })
            setIsPersonUpdate(true)
        }
    }, [])

    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = () => {
        if (!isPersonUpdate) {
            addPersonMaster(personMasterValue)
            navigate('/personMasterTable')
        } else {
            updatePersonMaster(personMasterValue, id)
            navigate('/personMasterTable')
        }
    }

    // ------------------- On Change Function Declaration ---------------------------//
    const onPersonMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setPersonMasterValue({ ...personMasterValue, [name]: value })
        setFieldValue([name], value)
    }

    return (
        <>
            <div className='contianer mx-auto'>
                <fieldset>
                    <div className='m-3'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                Person Master
                            </div>
                        </h4>
                        <Formik
                            initialValues={personMasterValue}
                            //validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>


                                        {/* <div className='row mb-1'>
                                            <div className='col-2 '>
                                                Master <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 ">
                                                    <Field as="select"
                                                        name="master"
                                                        className="form-select"
                                                        value={personMasterValue.master}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value=""> Select...</option>
                                                        <option value="Customer"> Customer</option>
                                                        <option value="Vendor"> Vendor</option>
                                                    </Field>                                                       <ErrorMessage name='master' />
                                                </div>
                                            </div>

                                        </div> */}

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
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
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
                                        <div className='col-2 form-label fw-bold'>
                                            Basic:
                                        </div>
                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                First Name <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='firstName'
                                                        value={personMasterValue.firstName}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
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
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='lastName' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Joining Date <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='date'
                                                        name='joiningDate'
                                                        value={personMasterValue.joiningDate}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='joiningDate' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Contact Person <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='contactPerson'
                                                        value={personMasterValue.contactPerson}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='contactPerson' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>
                                            <div className='col-2  form-check-label' for="flexCheckDefault">
                                                Inactive
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-check-input"
                                                        type='checkbox'
                                                        name='inActive'
                                                        id="flexCheckDefault"
                                                        value={personMasterValue.inActive}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />                                           <ErrorMessage name='inActive' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='col-2 form-label fw-bold'>
                                            Address:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Flat No
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='flatno'
                                                        value={personMasterValue.flatno}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='flatno' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Street
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='street'
                                                        value={personMasterValue.street}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='street' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                State <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='state'
                                                        value={personMasterValue.state}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='state' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                City
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='city'
                                                        value={personMasterValue.city}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='city' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Country <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='country'
                                                        value={personMasterValue.country}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='country' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                ZipCode
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='zipcode'
                                                        value={personMasterValue.zipcode}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='zipcode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Phoneno<span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='number'
                                                        name='phoneno'
                                                        value={personMasterValue.phoneno}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='phoneno' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Email
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='email'
                                                        name='aemail'
                                                        value={personMasterValue.aemail}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='aemail' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-2 form-label fw-bold'>
                                            Account Information:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Acc Holder Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='accHolderName'
                                                        value={personMasterValue.accHolderName}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accHolderName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Acc Number
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='accno'
                                                        value={personMasterValue.accno}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accno' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Bank Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='bankName'
                                                        value={personMasterValue.bankName}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='bankName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='branch'
                                                        value={personMasterValue.branch}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                RTGS/IFSC Code
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='ifceCode'
                                                        value={personMasterValue.ifceCode}
                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='ifceCode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Office Information
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Head Office
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='headOffice'
                                                                        value={personMasterValue.headOffice}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='headOffice' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Location
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='location'
                                                                        value={personMasterValue.location}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='location' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mb-1'>

                                                            <div className='col-2 form-label'>
                                                                Authorization
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='authorization'
                                                                        value={personMasterValue.authorization}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
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
                                                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Payment Transcation
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Payment<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="payment"
                                                                        className="form-select"
                                                                        value={personMasterValue.payment}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='payment' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Payment Term
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="paymentTerm"
                                                                        className="form-select"
                                                                        value={personMasterValue.paymentTerm}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='paymentTerm' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Price Catergory<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="priceCategory"
                                                                        className="form-select"
                                                                        value={personMasterValue.priceCategory}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='priceCategory' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Tax
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                TaxNo<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='taxno'
                                                                        value={personMasterValue.taxno}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='taxno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Tax Type
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="taxType"
                                                                        className="form-select"
                                                                        value={personMasterValue.taxType}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Inclusive</option>
                                                                        <option value="Card"> Exclusive</option>
                                                                    </Field>
                                                                    <ErrorMessage name='taxType' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                CIN<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='cin'
                                                                        value={personMasterValue.cin}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cin' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                GST<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='gst'
                                                                        value={personMasterValue.gst}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='gst' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                GST Catergory
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="gstCategory"
                                                                        className="form-select"
                                                                        value={personMasterValue.gstCategory}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='gstCategory' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2  form-check-label' for="flexCheckDefault">
                                                                GST TDS Applicable
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-check-input"
                                                                        type='checkbox'
                                                                        name='gstTdsAPP'
                                                                        id="flexCheckDefault"
                                                                        value={personMasterValue.inActive}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />                                           <ErrorMessage name='gstTdsAPP' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                TDS Section
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="tdsSection"
                                                                        className="form-select"
                                                                        value={personMasterValue.tdsSection}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='tdsSection' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2  form-check-label' for="flexCheckDefault">
                                                                TDS Applicable
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-check-input"
                                                                        type='checkbox'
                                                                        name='tdsAPP'
                                                                        id="flexCheckDefault"
                                                                        value={personMasterValue.TdsAPP}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />                                           <ErrorMessage name='TdsAPP' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Tin<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='tin'
                                                                        value={personMasterValue.tin}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='tin' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Pan No<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='panNo'
                                                                        value={personMasterValue.panNo}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
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
                                                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                        Billing Information
                                                    </button>
                                                </h2>
                                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Flat No
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bflatno'
                                                                        value={personMasterValue.bflatno}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bflatno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Street
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bstreet'
                                                                        value={personMasterValue.bstreet}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstreet' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                State <span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bstate'
                                                                        value={personMasterValue.bstate}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstate' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                City
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bcity'
                                                                        value={personMasterValue.bcity}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bcity' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Country <span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='bcountry'
                                                                        value={personMasterValue.bcountry}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bcountry' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                ZipCode
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bzipcode'
                                                                        value={personMasterValue.bzipcode}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bzipcode' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Phoneno<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='number'
                                                                        name='bphoneno'
                                                                        value={personMasterValue.bphoneno}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bphoneno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Email
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='email'
                                                                        name='bemail'
                                                                        value={personMasterValue.bemail}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bemail' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                        Digital Information
                                                    </button>
                                                </h2>
                                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
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
                                                                        value={personMasterValue.website}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='website' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                FaceBook
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='faceBook'
                                                                        value={personMasterValue.faceBook}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='faceBook' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Skype
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='skype'
                                                                        value={personMasterValue.skype}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='skype' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                Twitter
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='twitter'
                                                                        value={personMasterValue.twitter}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='twitter' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 form-label'>
                                                                Linked In
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='linkedIn'
                                                                        value={personMasterValue.linkedIn}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='linkedIn' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 form-label'>
                                                                YouTube
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control"
                                                                        type='text'
                                                                        name='youTube'
                                                                        value={personMasterValue.youTube}
                                                                        onChange={e => onPersonMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='youTube' />
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
                                                    onClick={() => setPersonMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setPersonMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/personMasterTable`)}
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
