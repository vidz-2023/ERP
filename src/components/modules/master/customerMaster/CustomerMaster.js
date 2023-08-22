import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { addCustomerMaster, getCustomerMasterByID, searchCustomerMasterAnyField, updateCustomerMaster } from '../../../../services/customerMasterServices';
import pic from '../../../../assets/images/profilepic.png';

function CustomerMaster() {

    // Intial Value for Formik
    const inputFields = {
        ctitle: '',
        cfirstName: '',
        clastName: '',
        cjoiningDate: '',
        cContactPerson: '',
        cinActive: false,
        cflatno: '',
        cstreet: '',
        cstate: '',
        cCity: '',
        cCountry: '',
        czipcode: '',
        cphoneno: '',
        cemail: '',
        caccHolderName: '',
        caccno: '',
        cbankName: '',
        cbranch: '',
        cifceCode: '',
        cheadOffice: '',
        clocation: '',
        cauthorization: '',
        cpayment: '',
        cpaymentTerm: '',
        cpriceCategory: '',
        cpaymentDuration:'',
        ctaxno: '',
        ctaxType: '',
        cCin: '',
        cgst: '',
        cgstCategory: '',
        cgsttdsApp: false,
        ctdsSection: '',
        ctdsApp: false,
        ctin: '',
        cpanNo: '',
        cbflatno: '',
        cbstreet: '',
        cbstate: '',
        cbCity: '',
        cbCountry: '',
        cbzipcode: '',
        cbphoneno: '',
        cbemail: '',
        cwebsite: '',
        cfaceBook: '',
        cskype: '',
        ctwiter: '',
        clinkedIn: '',
        cyouTube: ''
    }

    // ------------------- It is for Yup ---------------------------//
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const urlRegExp = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

    const validateyupSchema = Yup.object({
        ctitle: Yup.string().required('Required'),
        cfirstName: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!').required('Required').matches(/^[A-Za-z]\w*/, "Required only strings"),
        clastName: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!').required('Required').matches(/^[A-Za-z]\w*/, "Required only strings"),
        cjoiningDate: Yup.string().required('Required'),
        cContactPerson: Yup.string().required('Required'),
        cinActive: Yup.string().required('Required'),
        cflatno: Yup.string().required('Required'),
        cstreet: Yup.string().required('Required'),
        cstate: Yup.string().required('Required'),
        cCity: Yup.string().required('Required'),
        cCountry: Yup.string().required('Required'),
        czipcode: Yup.string().required('Required').min(0, "Only positive value").length(6)
            .matches(/^[0-9]{6}/).label('Zip code'),
        cphoneno: Yup.string().required('Required').min(0, "Only positive value").length(10)
            .matches(/^[0-9]{10}/).label('Phone no'),
        cemail: Yup.string().email('Invalid email').required('Required'),
        caccHolderName: Yup.string().required('Required'),
        caccno: Yup.number().required('Required').min(0, "Only positive value"),
        cbankName: Yup.string().required('Required'),
        cbranch: Yup.string().required('Required'),
        cifceCode: Yup.string().required('Required'),
        cheadOffice: Yup.string().required('Required'),
        clocation: Yup.string().required('Required'),
        cauthorization: Yup.string().required('Required'),
        cpayment: Yup.string().required('Required'),
        cpaymentTerm: Yup.string().required('Required'),
        cpriceCategory: Yup.string().required('Required'),
        cpaymentDuration:Yup.string().required('Required'),
        ctaxno: Yup.string().required('Required'),
        ctaxType: Yup.string().required('Required'),
        cCin: Yup.string().required('Required'),
        cgst: Yup.string().required('Required'),
        cgstCategory: Yup.string().required('Required'),
        cgsttdsApp: Yup.string().required('Required'),
        ctdsSection: Yup.string().required('Required'),
        ctdsApp: Yup.string().required('Required'),
        ctin: Yup.string().required('Required'),
        cpanNo: Yup.string().required('Required'),
        cbflatno: Yup.string().required('Required'),
        cbstreet: Yup.string().required('Required'),
        cbstate: Yup.string().required('Required'),
        cbCity: Yup.string().required('Required'),
        cbCountry: Yup.string().required('Required'),
        cbzipcode: Yup.string().required('Required').min(0, "Only positive value").min(6, 'The number must be 6 digits').matches(/^([0-9]{6})*$/, 'Invalid postal code'),
        cbphoneno: Yup.string().required('Required').min(0, "Only positive value").length(10)
        .matches(phoneRegExp, 'Phone number is not valid'),
        cbemail: Yup.string().required('Required'),
        cwebsite: Yup.string().matches(urlRegExp, 'Enter correct url!').required('Please enter website'),
        cfaceBook: Yup.string().email('Invalid email').required('Required'),
        cskype: Yup.string().email('Invalid email').required('Required'),
        ctwiter: Yup.string().email('Invalid email').required('Required'),
        clinkedIn: Yup.string().email('Invalid email').required('Required'),
        cyouTube: Yup.string().email('Invalid email').required('Required'),
    })

    //Declaration
    const [customerMasterValue, setCustomerMasterValue] = useState(inputFields)
    const [isCustomerUpdate, setIsCustomerUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()
    const [customerValState,setCustomerValState]= useState([])
    const [customerMaster,setCustomerMaster]= useState([])

    //Fetching The Data
    useEffect(() => {
        console.log(id)
        if (id >= 0) {
            getCustomerMasterByID(id).then(res => {
                console.log(res)
                setCustomerMasterValue(res)
            })
            setIsCustomerUpdate(true)
        }
    }, [])

    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = () => {
        if (!isCustomerUpdate) {
            addCustomerMaster(customerMasterValue)
            navigate('/customerMasterTable')
        } else {
            updateCustomerMaster(customerMasterValue, id)
            navigate('/customerMasterTable')
        }
    }

    // ------------------- On Change Function Declaration ---------------------------//
    const onCustomerMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setCustomerMasterValue({ ...customerMasterValue, [name]: value })
        setFieldValue([name], value)
    }

    const onCustomerMasterHandlerChange1 = (e, setFieldValue) => {
        const { name, checked } = e.target
        setCustomerMasterValue({ ...customerMasterValue, [name]: checked })
        setFieldValue([name], checked)
    }

    // ------------------- Search VendorMaster Any Field Function Declaration ---------------------------//
    const searchFun = (e) => {
        const searchVal = e.target.value
        setCustomerValState(searchVal)
        searchCustomerMasterAnyField(searchVal).then((res) => {
            setCustomerMaster(res.data)
            console.log(customerMaster)
        })
    }

    return (
        <>
            <div className='contianer mx-auto mb-5'>
                <fieldset>
                    <div className='m-3'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                Customer Master
                            </div>
                        </h4>
                        <Formik
                            initialValues={customerMasterValue}
                            validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitcting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Title
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='ctitle'
                                                        value={customerMasterValue.ctitle}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='ctitle' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Search
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <input
                                                        type="text"
                                                        className='form-control form-control-sm'
                                                        onChange={(e) => { searchFun(e) }}
                                                        placeholder='Search'
                                                        name="search" />
                                                    {/* <ErrorMessage name='search' /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-2 col-form-label col-form-label-sm fw-bold'>
                                            Basic:
                                        </div>
                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                First Name <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cfirstName'
                                                        value={customerMasterValue.cfirstName}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cfirstName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Last Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='clastName'
                                                        value={customerMasterValue.clastName}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='clastName' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Joining Date <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='date'
                                                        name='cjoiningDate'
                                                        value={customerMasterValue.cjoiningDate}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cjoiningDate' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Contact Person <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cContactPerson'
                                                        value={customerMasterValue.cContactPerson}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cContactPerson' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>
                                            <div className='col-2  form-check-label' for="flexCheckDefault">
                                                Upload
                                            </div>
                                            <div className='col-3'>
                                                <div className="border  mx-auto">
                                                    <img src={pic} class="img-fluid" alt="..." />
                                                    <div className="mt-2 ms-2 mb-4"> <button type="button" class="btn btn-info">Browse</button></div>
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                <label
                                                    htmlFor='cinActive'
                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                >
                                                    Inactive
                                                </label>
                                            </div>
                                            <div className='col-3'>
                                                <Field
                                                    className='form-check-input mt-3'
                                                    type='checkbox'
                                                    name='cinActive'
                                                    checked={customerMasterValue.cinActive}
                                                    onChange={e => onCustomerMasterHandlerChange1(e, setFieldValue)}
                                                />
                                                <ErrorMessage name='cinActive' />
                                            </div>
                                        </div>


                                        <div className='col-2 col-form-label col-form-label-sm fw-bold'>
                                            Address:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Flat No
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='number'
                                                        name='cflatno'
                                                        value={customerMasterValue.cflatno}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cflatno' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Street
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cstreet'
                                                        value={customerMasterValue.cstreet}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cstreet' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                State <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cstate'
                                                        value={customerMasterValue.cstate}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cstate' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                City
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cCity'
                                                        value={customerMasterValue.cCity}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cCity' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Country <span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cCountry'
                                                        value={customerMasterValue.cCountry}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cCountry' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Zipcode
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='number'
                                                        name='czipcode'
                                                        value={customerMasterValue.czipcode}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='czipcode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Phoneno<span className='text-danger fs-5'>*</span>
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='number'
                                                        name='cphoneno'
                                                        value={customerMasterValue.cphoneno}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cphoneno' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Email
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='email'
                                                        name='cemail'
                                                        value={customerMasterValue.cemail}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cemail' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-2 col-form-label col-form-label-sm fw-bold'>
                                            Account Information:
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Acc Holder Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='caccHolderName'
                                                        value={customerMasterValue.caccHolderName}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='caccHolderName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Acc Number
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='caccno'
                                                        value={customerMasterValue.caccno}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='caccno' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Bank Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cbankName'
                                                        value={customerMasterValue.cbankName}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cbankName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cbranch'
                                                        value={customerMasterValue.cbranch}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cbranch' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                RTGS/IFSC Code
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='text'
                                                        name='cifceCode'
                                                        value={customerMasterValue.cifceCode}
                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='cifceCode' />
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

                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Head Office
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cheadOffice'
                                                                        value={customerMasterValue.cheadOffice}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cheadOffice' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Location
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='clocation'
                                                                        value={customerMasterValue.clocation}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='clocation' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mb-1'>

                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Authorization
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cauthorization'
                                                                        value={customerMasterValue.cauthorization}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cauthorization' />
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Payment<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="cpayment"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.cpayment}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='cpayment' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Payment Term
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="cpaymentTerm"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.cpaymentTerm}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='cpaymentTerm' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Price Catergory<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="cpriceCategory"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.cpriceCategory}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='cpriceCategory' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Payment Duration
                                                            </div>
                                                            <div className='col-1'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='cpaymentDuration'
                                                                        value={customerMasterValue.cpaymentDuration}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cpaymentDuration' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2 col-form-label col-form-label-sm text-black'>
                                                                Days
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Taxno<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='ctaxno'
                                                                        value={customerMasterValue.ctaxno}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='ctaxno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Tax Type
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="ctaxType"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.ctaxType}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Inclusive</option>
                                                                        <option value="Card"> Exclusive</option>
                                                                    </Field>
                                                                    <ErrorMessage name='ctaxType' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Cin<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cCin'
                                                                        value={customerMasterValue.cCin}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cCin' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                GST<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cgst'
                                                                        value={customerMasterValue.cgst}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cgst' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                GST Catergory
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="cgstCategory"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.cgstCategory}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='cgstCategory' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                <label
                                                                    htmlFor='cgsttdsApp'
                                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                                >
                                                                    GST TDS Applicable
                                                                </label>
                                                            </div>
                                                            <div className='col-3'>
                                                                <Field
                                                                    className='form-check-input mt-3'
                                                                    type='checkbox'
                                                                    name='cgsttdsApp'
                                                                    checked={customerMasterValue.cgsttdsApp}
                                                                    onChange={e => onCustomerMasterHandlerChange1(e, setFieldValue)}
                                                                />
                                                                <ErrorMessage name='cgsttdsApp' />
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                TDS Section
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="ctdsSection"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={customerMasterValue.ctdsSection}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='ctdsSection' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                <label
                                                                    htmlFor='ctdsApp'
                                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                                >
                                                                    TDS Applicable
                                                                </label>
                                                            </div>
                                                            <div className='col-3'>
                                                                <Field
                                                                    className='form-check-input mt-3'
                                                                    type='checkbox'
                                                                    name='ctdsApp'
                                                                    checked={customerMasterValue.ctdsApp}
                                                                    onChange={e => onCustomerMasterHandlerChange1(e, setFieldValue)}
                                                                />
                                                                <ErrorMessage name='ctdsApp' />
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Tin<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='ctin'
                                                                        value={customerMasterValue.ctin}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='ctin' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Pan No<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cpanNo'
                                                                        value={customerMasterValue.cpanNo}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cpanNo' />
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Flat No
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='cbflatno'
                                                                        value={customerMasterValue.cbflatno}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbflatno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Street
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cbstreet'
                                                                        value={customerMasterValue.cbstreet}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbstreet' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                State <span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cbstate'
                                                                        value={customerMasterValue.cbstate}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbstate' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                City
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cbCity'
                                                                        value={customerMasterValue.cbCity}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbCity' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Country <span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cbCountry'
                                                                        value={customerMasterValue.cbCountry}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbCountry' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Zipcode
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='cbzipcode'
                                                                        value={customerMasterValue.cbzipcode}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbzipcode' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Phoneno<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='cbphoneno'
                                                                        value={customerMasterValue.cbphoneno}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbphoneno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Email
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='email'
                                                                        name='cbemail'
                                                                        value={customerMasterValue.cbemail}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cbemail' />
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Website
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cwebsite'
                                                                        value={customerMasterValue.cwebsite}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cwebsite' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                FaceBook
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cfaceBook'
                                                                        value={customerMasterValue.cfaceBook}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cfaceBook' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Skype
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cskype'
                                                                        value={customerMasterValue.cskype}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cskype' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Twiter
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='ctwiter'
                                                                        value={customerMasterValue.ctwiter}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='ctwiter' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Linked In
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='clinkedIn'
                                                                        value={customerMasterValue.clinkedIn}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='clinkedIn' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                YouTube
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cyouTube'
                                                                        value={customerMasterValue.cyouTube}
                                                                        onChange={e => onCustomerMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cyouTube' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className=' row mt-5 ms-5'>
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
                                                    onClick={() => setCustomerMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setCustomerMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/customerMasterTable`)}
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

export default CustomerMaster