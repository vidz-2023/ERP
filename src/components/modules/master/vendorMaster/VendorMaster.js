import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import { addVendorMaster, getVendorMasterByID, searchVendorMasterAnyField, updateVendorMaster } from '../../../../services/vendorMasterServices';
import pic from '../../../../assets/images/profilepic.png';
import { ValueService } from 'ag-grid-community';

function VendorMaster() {

    // Intial Value for Formik
    const inputFields = {
        title: '',
        firstName: '',
        lastName: '',
        joiningDate: '',
        contactPerson: '',
        inActive: false,
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
        gstTdsAPP: false,
        tdsSection: '',
        tdsAPP: false,
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
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const urlRegExp = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

    const validateyupSchema = Yup.object({
        title: Yup.string().required('Required'),
        firstName: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!').required('Required').matches(/^[A-Za-z]\w*/, "Required only strings"),
        lastName: Yup.string().min(2, 'Too Short!')
            .max(50, 'Too Long!').required('Required').matches(/^[A-Za-z]\w*/, "Required only strings"),
        joiningDate: Yup.string().required('Required'),
        contactPerson: Yup.string().required('Required'),
        inActive: Yup.string().required('Required'),
        flatno: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        zipcode: Yup.string().required('Required').min(0, "Only positive value").length(6)
            .matches(/^[0-9]{6}/).label('Zip code'),
        phoneno: Yup.string().required('Required').min(0, "Only positive value").length(10)
            .matches(phoneRegExp, 'Phone number is not valid'),
        aemail: Yup.string().email('Invalid email').required('Required'),
        accHolderName: Yup.string().required('Required'),
        accno: Yup.number().required('Required').min(0, "Only positive value"),
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
        bzipcode: Yup.string().required('Required').min(0, "Only positive value").min(6, 'The number must be 6 digits').matches(/^([0-9]{6})*$/, 'Invalid postal code'),
        bphoneno: Yup.string().required('Required').min(0, "Only positive value").length(10)
        .matches(phoneRegExp, 'Phone number is not valid'),
        bemail: Yup.string().required('Required'),
        website: Yup.string().matches(urlRegExp, 'Enter correct url!').required('Please enter website'),
        faceBook: Yup.string().email('Invalid email').required('Required'),
        skype: Yup.string().email('Invalid email').required('Required'),
        twitter: Yup.string().email('Invalid email').required('Required'),
        linkedIn: Yup.string().email('Invalid email').required('Required'),
        youTube: Yup.string().email('Invalid email').required('Required'),
    })

    //Declaration
    const [vendorMasterValue, setVendorMasterValue] = useState(inputFields)
    const [isVendorUpdate, setIsVendorUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()
    const [vendorValState,setVendorValState]=useState([])
    const [vendorMaster,setVendorMaster]= useState([])

    //Fetching The Data
    useEffect(() => {
        console.log(id)
        if (id >= 0) {
            getVendorMasterByID(id).then(res => {
                console.log(res)
                setVendorMasterValue(res)
            })
            setIsVendorUpdate(true)
        }
    }, [])

    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = () => {
        if (!isVendorUpdate) {
            addVendorMaster(vendorMasterValue)
            navigate('/vendorMasterTable')
        } else {
            updateVendorMaster(vendorMasterValue, id)
            navigate('/vendorMasterTable')
        }
    }

    // ------------------- On Change Function Declaration ---------------------------//
    const onVendorMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setVendorMasterValue({ ...vendorMasterValue, [name]: value })
        setFieldValue([name], value)
    }
    const onVendorMasterHandlerChange1 = (e, setFieldValue) => {
        const { name, checked } = e.target
        setVendorMasterValue({ ...vendorMasterValue, [name]: checked })
        setFieldValue([name], checked)
    }

    // ------------------- Search VendorMaster Any Field Function Declaration ---------------------------//
    const searchFun = (e) => {
        const searchVal = e.target.value
        setVendorValState(searchVal)
        searchVendorMasterAnyField(searchVal).then((res) =>{
            setVendorMaster(res.data)
            console.log(vendorMaster)
        } )
    }

    return (
        <>
            <div className='contianer mx-auto mb-5'>
                <fieldset>
                    <div className='m-3'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                Vendor Master
                            </div>
                        </h4>
                        <Formik
                            initialValues={vendorMasterValue}
                            validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitting, setFieldValue }) => (
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
                                                        name='title'
                                                        value={vendorMasterValue.title}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='title' />
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
                                                        name='firstName'
                                                        value={vendorMasterValue.firstName}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='firstName' />
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
                                                        name='lastName'
                                                        value={vendorMasterValue.lastName}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='lastName' />
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
                                                        name='joiningDate'
                                                        value={vendorMasterValue.joiningDate}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='joiningDate' />
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
                                                        name='contactPerson'
                                                        value={vendorMasterValue.contactPerson}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='contactPerson' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
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
                                                    htmlFor='inActive'
                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                >
                                                    Inactive
                                                </label>
                                            </div>
                                            <div className='col-3'>
                                                <Field
                                                    className='form-check-input mt-3'
                                                    type='checkbox'
                                                    name='inActive'
                                                    checked={vendorMasterValue.inActive}
                                                    onChange={e => onVendorMasterHandlerChange1(e, setFieldValue)}
                                                />
                                                <ErrorMessage name='inActive' />
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
                                                        name='flatno'
                                                        value={vendorMasterValue.flatno}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='flatno' />
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
                                                        name='street'
                                                        value={vendorMasterValue.street}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='street' />
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
                                                        name='state'
                                                        value={vendorMasterValue.state}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='state' />
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
                                                        name='city'
                                                        value={vendorMasterValue.city}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='city' />
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
                                                        name='country'
                                                        value={vendorMasterValue.country}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='country' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                ZipCode
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type='number'
                                                        name='zipcode'
                                                        value={vendorMasterValue.zipcode}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='zipcode' />
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
                                                        name='phoneno'
                                                        value={vendorMasterValue.phoneno}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='phoneno' />
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
                                                        name='aemail'
                                                        value={vendorMasterValue.aemail}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='aemail' />
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
                                                        name='accHolderName'
                                                        value={vendorMasterValue.accHolderName}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accHolderName' />
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
                                                        name='accno'
                                                        value={vendorMasterValue.accno}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='accno' />
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
                                                        name='bankName'
                                                        value={vendorMasterValue.bankName}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='bankName' />
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
                                                        name='branch'
                                                        value={vendorMasterValue.branch}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='branch' />
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
                                                        name='ifceCode'
                                                        value={vendorMasterValue.ifceCode}
                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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

                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Head Office
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='headOffice'
                                                                        value={vendorMasterValue.headOffice}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='headOffice' />
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
                                                                        name='location'
                                                                        value={vendorMasterValue.location}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='location' />
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
                                                                        name='authorization'
                                                                        value={vendorMasterValue.authorization}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Payment<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="payment"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.payment}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Cash</option>
                                                                        <option value="Card"> Card</option>
                                                                    </Field>
                                                                    <ErrorMessage name='payment' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Payment Term
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="paymentTerm"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.paymentTerm}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Price Catergory<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="priceCategory"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.priceCategory}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                TaxNo<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='taxno'
                                                                        value={vendorMasterValue.taxno}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='taxno' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Tax Type
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="taxType"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.taxType}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                CIN<span className='text-danger fs-5'>*</span>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='cin'
                                                                        value={vendorMasterValue.cin}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='cin' />
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
                                                                        name='gst'
                                                                        value={vendorMasterValue.gst}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='gst' />
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
                                                                        name="gstCategory"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.gstCategory}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='gstCategory' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                <label
                                                                    htmlFor='gstTdsAPP'
                                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                                >
                                                                    GST TDS Applicable
                                                                </label>
                                                            </div>
                                                            <div className='col-3'>
                                                                <Field
                                                                    className='form-check-input mt-3'
                                                                    type='checkbox'
                                                                    name='gstTdsAPP'
                                                                    checked={vendorMasterValue.gstTdsAPP}
                                                                    onChange={e => onVendorMasterHandlerChange1(e, setFieldValue)}
                                                                />
                                                                <ErrorMessage name='gstTdsAPP' />
                                                            </div>
                                                        </div>

                                                        <div className='row mb-1'>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                TDS Section
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field as="select"
                                                                        name="tdsSection"
                                                                        className="form-select form-select-sm fw-light"
                                                                        value={vendorMasterValue.tdsSection}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    >
                                                                        <option value=""> Select...</option>
                                                                        <option value="Cash"> Registered</option>
                                                                        <option value="Card"> Unregistered</option>
                                                                    </Field>
                                                                    <ErrorMessage name='tdsSection' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                <label
                                                                    htmlFor='tdsAPP'
                                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                                >
                                                                    TDS Applicable
                                                                </label>
                                                            </div>
                                                            <div className='col-3'>
                                                                <Field
                                                                    className='form-check-input mt-3'
                                                                    type='checkbox'
                                                                    name='tdsAPP'
                                                                    checked={vendorMasterValue.tdsAPP}
                                                                    onChange={e => onVendorMasterHandlerChange1(e, setFieldValue)}
                                                                />
                                                                <ErrorMessage name='tdsAPP' />
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
                                                                        name='tin'
                                                                        value={vendorMasterValue.tin}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='tin' />
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
                                                                        name='panNo'
                                                                        value={vendorMasterValue.panNo}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Flat No
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='bflatno'
                                                                        value={vendorMasterValue.bflatno}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bflatno' />
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
                                                                        name='bstreet'
                                                                        value={vendorMasterValue.bstreet}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstreet' />
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
                                                                        name='bstate'
                                                                        value={vendorMasterValue.bstate}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bstate' />
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
                                                                        name='bcity'
                                                                        value={vendorMasterValue.bcity}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bcity' />
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
                                                                        name='bcountry'
                                                                        value={vendorMasterValue.bcountry}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bcountry' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                ZipCode
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='number'
                                                                        name='bzipcode'
                                                                        value={vendorMasterValue.bzipcode}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bzipcode' />
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
                                                                        name='bphoneno'
                                                                        value={vendorMasterValue.bphoneno}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='bphoneno' />
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
                                                                        name='bemail'
                                                                        value={vendorMasterValue.bemail}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
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
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Website
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='website'
                                                                        value={vendorMasterValue.website}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='website' />
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
                                                                        name='faceBook'
                                                                        value={vendorMasterValue.faceBook}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='faceBook' />
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
                                                                        name='skype'
                                                                        value={vendorMasterValue.skype}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='skype' />
                                                                </div>
                                                            </div>
                                                            <div className='col-2'></div>
                                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                                Twitter
                                                            </div>
                                                            <div className='col-3'>
                                                                <div class="mb-2 text-danger">
                                                                    <Field
                                                                        className="form-control form-control-sm"
                                                                        type='text'
                                                                        name='twitter'
                                                                        value={vendorMasterValue.twitter}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='twitter' />
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
                                                                        name='linkedIn'
                                                                        value={vendorMasterValue.linkedIn}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='linkedIn' />
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
                                                                        name='youTube'
                                                                        value={vendorMasterValue.youTube}
                                                                        onChange={e => onVendorMasterHandlerChange(e, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage name='youTube' />
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
                                                    onClick={() => setVendorMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setVendorMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/vendorMasterTable`)}
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

export default VendorMaster
