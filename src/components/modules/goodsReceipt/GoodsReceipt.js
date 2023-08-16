import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import purchaseStyle from "../purchase/purchaseMasterSty.module.css"
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getPurchaseDetailById } from '../../../services/purchaseMasterService';
import LogisticsStock from '../stockModule/LogisticsStock';

const GoodsReceipt = () => {
    const { pId } = useParams()

    const navigate = useNavigate()

    const inputFields = {
        pId: "",
        gstType: "",
        gstNumber: "",
        branch: "",
        category: "",
        vendor: "",
        email: "",
        currency: "",
        currencyConversionRate: "",
        orderDate: "",
        orderNumber: "",
        deliveryDate: "",
        agent: "",
        refNumber: "",
        refDate: "",
        taxInc: "",
        taxExcl: "",
        billingAdd: "",
        shippingAdd: "",
        contactPersonName: "",
        contactPersonPhone: "",
        paymentType: "",
        remarks: "",
        attachment: "",
        discount: "",
        totalPrice: ""
    }
    const [purchaseData, setPurchaseData] = useState(inputFields)

    useEffect(() => {

        getPurchaseDataByPId(pId)

    }, [])


    const handleCancel = () => {
        navigate("/goods-receipt-table")
    }

    const getPurchaseDataByPId = () => {
        if (pId) {
            getPurchaseDetailById(pId).then((res) => {
                delete res.data[0].attachment
                setPurchaseData(res.data[0])
                // setIsUpdate(true)
            })
            // document.getElementById("addRowBtnId").disabled = false
        }
    }

    return (


        <div>
            <Formik
                initialValues={purchaseData}
                // onSubmit={handleSubmit}
                // validationSchema={validationSchema}
                enableReinitialize
            >
                {({ isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            <div className='container pb-3 mb-3 mx-auto'>
                                <div className='row mt-3'>
                                    <div className='col-12'>
                                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                                            <div className='m-2'>
                                                <FaBook className='me-2' />Good Receipt
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                                {/* ==================================== form details ==================================================== */}
                                <div
                                    className='rounded form-group'
                                >
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>GST Type<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                type="text"
                                                // component="select"
                                                name="gstType"
                                                // value={purchaseData.gstType}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/* <option value="">Select GST Type...</option>
                                               
                                                    tempData.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            // value={item.FirstName}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='gstType' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>GST Number<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                name="gstNumber"
                                                // value={purchaseData.gstNumber}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='gstNumber' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Branch<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="branch"
                                                // value={purchaseData.branch}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/* <option value="">Select Branch</option>
                                               
                                                    branch.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            value={item.Name}
                                                        >
                                                            {item.Name}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='branch' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Category<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="category"
                                                // value={purchaseData.category}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select Category</option>
                                                
                                                    category.map((item, index) => {
                                                        return <option
                                                    key={index}
                                                    value={item.Name}
                                                >
                                                    {item.Name}
                                                </option>
                                                    }
                                                )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='category' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Vendor<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="vendor"
                                                // value={purchaseData.vendor}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select Vendor</option>
                                                tempData.map((item, index) => {
                                                        return <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='vendor' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Email<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                // value={purchaseData.email}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='email' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Currency<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="currency"
                                                // value={purchaseData.currency}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select Currency</option>
                                                
                                                    tempData.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='currency' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Conversion Rate</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                name="currencyConversionRate"
                                                // value={purchaseData.currencyConversionRate}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='currencyConversionRate' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Order Date<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control fw-light"
                                                type='date'
                                                name="orderDate"
                                                // value={purchaseData.orderDate}
                                                // onChange={handleChange}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='orderDate' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Order Number<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                name="orderNumber"
                                                // value={purchaseData.orderNumber}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='orderNumber' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Delivery Date<span className='text-danger'>*</span></div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control fw-light"
                                                type='date'
                                                name="deliveryDate"
                                                // value={purchaseData.deliveryDate}
                                                // onChange={handleChange}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='deliveryDate' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Agent</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="agent"
                                                // value={purchaseData.agent}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='agent' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Reference Number</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="refNumber"
                                                // value={purchaseData.refNumber}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='refNumber' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Reference Date</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control fw-light"
                                                type='date'
                                                name="refDate"
                                                // value={purchaseData.refDate}
                                                // onChange={handleChange}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='refDate' />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>Tax Inclusive</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="taxInc"
                                                // value={purchaseData.taxInc}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select Inclusive Tax...</option>
                                                
                                                    tempData.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='taxInc' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Tax Exclusive</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="taxExcl"
                                                // value={purchaseData.taxExcl}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select Exclusive Tax...</option>
                                                
                                                    tempData.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='taxExcl' />
                                        </div>
                                    </div>
                                    <div
                                        className='row mb-1 d-flex align-items-center'
                                    >
                                        <div className='col-2 form-label'>Billing Address</div>
                                        <div className='col-3 d-flex'>
                                            <Field as="textarea" className="form-control"
                                                name="billingAdd"
                                                // value={purchaseData.billingAdd}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='billingAdd' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Shipping Address</div>
                                        <div className='col-3 d-flex'>
                                            <Field as="textarea" className="form-control"
                                                name="shippingAdd"
                                                // value={purchaseData.shippingAdd}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='shippingAdd' />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-2 form-label'>Contact Person Name</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="contactPersonName"
                                                // value={purchaseData.contactPersonName}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                disabled
                                            />
                                            <ErrorMessage className="text-danger  ms-2" component="div" name='contactPersonName' />
                                        </div>
                                        <div className='col-2'></div>
                                        <div className='col-2 form-label'>Contact Person Phone</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-control"
                                                type="number"
                                                name="contactPersonPhone"
                                                // value={purchaseData.contactPersonPhone}
                                                // onChange={handleChange}
                                                disabled
                                            >
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='contactPersonPhone' />
                                        </div>
                                    </div>
                                    <div
                                        className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                    >
                                        <div className='col-2 form-label'>Payment Type</div>
                                        <div className='col-3 d-flex'>
                                            <Field
                                                className="form-select fw-light"
                                                // component="select"
                                                type="text"
                                                name="paymentType"
                                                // value={purchaseData.paymentType}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                disabled
                                            >
                                                {/*<option value="">Select...</option>
                                                
                                                    tempData.map((item, index) => {
                                                        return <option
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    }
                                                    )
                                                */}
                                            </Field>
                                            <ErrorMessage className="text-danger ms-2" component="div" name='paymentType' />
                                        </div>
                                    </div>


                                    {/* ==================================== Ag Grid ==================================================== */}
                                    <div className=''>
                                        {/*
                                        <div className='d-flex w-100'>
                                            <div className='d-flex w-50'>
                                                <button type="button"
                                                    className="btn btn-info"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={handleModalAdd}
                                                    id="addRowBtnId"
                                                >
                                                    Add Row
                                                </button>
                                                <div className='form-label m-2'><b>Vendor : </b></div>
                                                <div className='form-label m-2'>{vendorName}</div>
                                            </div>

                                            <div className='d-flex justify-content-end w-50'>
                                                <div className='form-label'><b>Total Qty : </b></div>
                                                <div className='form-label me-5'>{totalQty}</div>
                                                <div className='form-label'><b>Total Price :</b> </div>
                                                <div className='form-label'>{totalPrice}</div>
                                            </div>
                                        </div>
                                    */}
                                        <div className="ag-theme-alpine my-3 mx-auto" style={{ width: 1110, height: 300 }}>
                                            <AgGridReact
                                            // rowData={purchasedItemsData}
                                            // columnDefs={column}
                                            // defaultColDef={defaultColDef}
                                            />
                                        </div>
                                    </div>
                                    {/* ==================================== Logistics ==================================================== */}
                                    <div className="row mt-2">
                                        <hr></hr>
                                    </div>

                                    {/*<LogisticsStock />*/}

                                    <div className="row mt-2">
                                        <hr></hr>
                                    </div>
                                    {/* ==================================== summary ==================================================== */}


                                    <div>
                                        <div
                                            className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                        >
                                            <div className='col-2 form-label'>Remarks</div>
                                            <div className='col-3 d-flex'>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    name="remarks"
                                                // value={purchaseData.remarks}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage className="text-danger  ms-2" component="div" name='remarks' />
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>Attachment</div>
                                            <div className='col-3 d-flex'>
                                                <Field
                                                    className="form-control fw-light"
                                                    type="file"
                                                    name="attachment"
                                                // value={purchaseData.attachment}
                                                // onChange={handleChange}
                                                >
                                                </Field>
                                                <ErrorMessage className="text-danger ms-2" component="div" name='attachment' />
                                            </div>
                                        </div>

                                        <div
                                            className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                        >
                                            <div className='col-2 form-label'>Total Price</div>
                                            <div className='col-2 d-flex'>
                                                <Field
                                                    className="form-control"
                                                    type="number"
                                                    name="totalPrice"
                                                    // value={totalPrice}
                                                    // onChange={handleChange}
                                                    disabled
                                                >
                                                </Field>
                                                <ErrorMessage className="text-danger ms-2" component="div" name='totalPrice' />
                                            </div>
                                            <div className='col-1'></div>
                                            <div className='col-1 form-label'>Discount</div>
                                            <div className='col-2 d-flex'>
                                                <Field
                                                    className="form-control"
                                                    type="number"
                                                    name="discount"
                                                // value={purchaseData.Description}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage className="text-danger  ms-2" component="div" name='discount' />
                                            </div>

                                            <div className='col-2 form-label'>Price After Discount</div>
                                            <div className='col-2 d-flex'>
                                                <Field
                                                    className="form-control"
                                                    type="number"
                                                    name="afterDiscount"
                                                // value={purchaseData.Description}
                                                // onChange={e => handleChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage className="text-danger  ms-2" component="div" name='afterDiscount' />
                                            </div>

                                        </div>
                                        {/*
                                        <div
                                            className={`row mb-3 ${purchaseStyle.myInputfield}`}
                                        >
                                            <div className='col-2 form-label'>Frieght</div>
                                            <div className='col-3 d-flex'>
                                                <Field
                                                    className="form-select fw-light"
                                                    component="select"
                                                    name="frieght"
                                                // value={purchaseData.paymentType}
                                                // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                >
                                                    <option value="">Select...</option>
                                                    
                                                        freight.map((item, index) => {
                                                            return <option
                                                                key={index}
                                                                value={item.Name}
                                                            >
                                                                {item.Name}
                                                            </option>
                                                        }
                                                        )
                                                    
                                                </Field>
                                                <ErrorMessage className="text-danger ms-2" component="div" name='frieght' />
                                            </div>
                                           
                                    </div>
                                     */}

                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button
                                        className="btn btn-info w-25 m-5"
                                        type='button'
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button className="btn btn-info w-25 m-5" type='submit'>Submit</button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div >
    )
}

export default GoodsReceipt