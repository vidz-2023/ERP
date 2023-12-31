import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import goodReceiptStyle from "./goodsReceiptStyle.module.css"
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getPurchaseDetailById } from '../../../services/purchaseMasterService';
import { getGoodsReceiptById, getGoodsReceiptDetail, updateGoodsReceiptDetail } from '../../../services/goodsReceiptService';
import { getStorageLocation } from '../../../services/masterServices';

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

    const paymentStatus = ["Paid", "Pending to be paid", "Transaction in place"]
    const [purchaseData, setPurchaseData] = useState(inputFields)
    const [goodsReceiptData, setGoodsReceiptData] = useState([])
    const [storageLocation, setStorageLocation] = useState([])
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const POUpdateArr = []
    const column = [
        {
            field: "sNo",
            valueGetter: "node.rowIndex + 1",
        },
        {
            field: "orderedQty",
        },
        {
            field: "receivedQty",
            editable: true
        },
        {
            field: "pendingQty",
            valueGetter: ({ data }) => {
                return data.orderedQty - data.receivedQty
            }
        },

        {
            field: "quotedUnitPrice",
            headerName: "Quoted(P.U)",

        },
        {
            field: "billedUnitPrice",
            headerName: "Billed(P.U)",
            editable: true
        },
        {
            field: "billedTotalPrice",
            headerName: "Amt. Billed",
            valueGetter: ({ data }) => {
                return data.billedUnitPrice * data.receivedQty
            }
        },
        {
            field: "differenceAmount",
            headerName: "Diff Amt",
            // headerName: "Billed Amount - Amount (in raw material vendor master)"
            valueGetter: ({ data }) => {
                return (data.quotedUnitPrice * data.receivedQty) - (data.billedUnitPrice * data.receivedQty)
            }
        }
    ]

    useEffect(() => {
        getPurchaseDataByPId(pId)
        getgoodsReceiptData()
        getStorageLoc()

    }, [])

    const getStorageLoc = () => {
        getStorageLocation().then((res) => {
            // console.log(res.data)
            setStorageLocation(res.data)
        })
    }
    const getgoodsReceiptData = () => {
        getGoodsReceiptById(pId).then((res) => {
            setGoodsReceiptData(res.data)
            console.log(res.data)
            let totalPriceTemp = 0
            res.data.forEach((item) => {

                totalPriceTemp = totalPriceTemp + item.billedTotalPrice
                console.log(totalPriceTemp)
                setTotalPrice(totalPriceTemp)

            })
        })
    }
    const handleCancel = () => {
        navigate("/goods-receipt-table")
    }

    const calPriceAfterDiscount = (sp, dis) => {
        let afterDis = sp * ((100 - dis) / 100)
        setPriceAfterDiscount(afterDis)
    }

    const getPurchaseDataByPId = () => {
        if (pId) {
            getPurchaseDetailById(pId).then((res) => {
                delete res.data[0].attachment
                setPurchaseData(res.data[0])
                calPriceAfterDiscount(res.data[0].totalPrice, res.data[0].discount)
                // console.log(res.data)
                // setIsUpdate(true)
            })
            // document.getElementById("addRowBtnId").disabled = false
        }
    }

    const handlePurchaseOrderDetail = () => {
        // console.log(initialPurchaseOrder)
        POUpdateArr.forEach((item) => {
            updateGoodsReceiptDetail(item).then((res) => {
                // console.log(res.data)
            })
        })
        alert("data updated")

    }

    const handleCellClick = (params) => {
        // console.log(params.data)
        POUpdateArr.push(params.data)
        // setTotalPrice(params.totalPrice)
        // let totalPriceTemp = 0
        // POUpdateArr.forEach((item) => {
        //     totalPriceTemp = totalPriceTemp + item.billedTotalPrice
        //     console.log(totalPriceTemp)
        // })
    }

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1,
        editable: false,
        onCellClicked: handleCellClick,
    }

    const handleChange = (e, setFieldValue) => {
        const { name, value } = e.target
        if (name === "discount") {
            setFieldValue("discount", value)
            console.log(value)
            calPriceAfterDiscount(purchaseData.totalPrice, value)

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
                                                <FaBook className='me-2' />Goods Receipt
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                                {/* ====================================form details ==================================================== */}
                                <div className='rounded form-group'>
                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Order No<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Order Date<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm fw-light"
                                                        type='date'
                                                        name="orderDate"
                                                        // value={purchaseData.orderDate}
                                                        // onChange={handleChange}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='orderDate' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>GST Type<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        type="text"
                                                        // component="select"
                                                        name="gstType"
                                                        // value={purchaseData.gstType}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='gstType' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>GST Number<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>
                                    </div>


                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Branch<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="branch"
                                                        // value={purchaseData.branch}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='branch' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Category<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="category"
                                                        // value={purchaseData.category}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='category' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Vendor<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="vendor"
                                                        // value={purchaseData.vendor}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='vendor' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Email<span className='text-danger'>*</span></div>
                                                <div className='col-7 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>
                                    </div>


                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Currency<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="currency"
                                                        // value={purchaseData.currency}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='currency' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Conversion Rate</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Delivery Date<span className='text-danger'>*</span></div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm fw-light"
                                                        type='date'
                                                        name="deliveryDate"
                                                        // value={purchaseData.deliveryDate}
                                                        // onChange={handleChange}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='deliveryDate' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Agent</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>
                                    </div>


                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Ref Number</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="refNumber"
                                                        // value={purchaseData.refNumber}
                                                        // onChange={handleChange}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='refNumber' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Reference Date</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm fw-light"
                                                        type='date'
                                                        name="refDate"
                                                        // value={purchaseData.refDate}
                                                        // onChange={handleChange}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='refDate' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Tax Inclusive</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="taxInc"
                                                        // value={purchaseData.taxInc}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='taxInc' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Tax Exclusive</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="taxExcl"
                                                        // value={purchaseData.taxExcl}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='taxExcl' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`row mb-5 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-6'>
                                            <div className='row mb-1 d-flex align-items-center'>
                                                <div className='col-3 col-form-label col-form-label-sm'>Billing Address</div>
                                                <div className='col-9 d-flex'>
                                                    <Field as="textarea" className={`form-control form-control-sm ${goodReceiptStyle.myAddressPosition}`}
                                                        name="billingAdd"
                                                        // value={purchaseData.billingAdd}
                                                        // onChange={e => handleChange(e, setFieldValue)}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='billingAdd' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='row mb-1 d-flex align-items-center'>
                                                <div className='col-3 col-form-label col-form-label-sm'>Shipping Address</div>
                                                <div className='col-9 d-flex'>
                                                    <Field as="textarea" className={`form-control form-control-sm ${goodReceiptStyle.myAddressPosition}`}
                                                        name="shippingAdd"
                                                        // value={purchaseData.shippingAdd}
                                                        // onChange={e => handleChange(e, setFieldValue)}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='shippingAdd' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Contact Person</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="contactPersonName"
                                                        // value={purchaseData.contactPersonName}
                                                        // onChange={e => handleChange(e, setFieldValue)}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='contactPersonName' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Person Phone</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
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
                                        </div>

                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Payment Type</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        // component="select"
                                                        type="text"
                                                        name="paymentType"
                                                        // value={purchaseData.paymentType}
                                                        // onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='paymentType' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ==================================== AgGRid ==================================================== */}
                                <div className="row mt-2">
                                    <hr></hr>
                                </div>

                                <div className="ag-theme-alpine my-3 mx-auto" style={{ width: 1110, height: 300 }}>
                                    <AgGridReact
                                        rowData={goodsReceiptData}
                                        columnDefs={column}
                                        defaultColDef={defaultColDef}
                                    />
                                </div>


                                <div className="row mt-2">
                                    <div className='col-6 d-flex justify-content-end w-75'>
                                        <div className='form-label'><b>Total Price :</b> </div>
                                        <div className='form-label'>{totalPrice}</div>
                                    </div>
                                    <div className='col-3  d-flex justify-content-center'>
                                        <button
                                            className="btn btn-info"
                                            type='button'
                                            onClick={handlePurchaseOrderDetail}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <hr></hr>
                                </div>
                                {/* ==================================== summary ==================================================== */}
                                <div className='rounded form-group'>
                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-4'>
                                            <div className='row'>
                                                <div className='col-4 col-form-label col-form-label-sm'>Received Date</div>
                                                <div className='col-7 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm fw-light"
                                                        type='date'
                                                        name="receivedDate"
                                                    // value={purchaseData.refDate}
                                                    // onChange={handleChange}
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='receivedDate' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='row'>
                                                <div className='col-4 col-form-label col-form-label-sm'>Payment Status</div>
                                                <div className='col-7 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        component="select"
                                                        name="paymentStatus"
                                                    >
                                                        <option value="">Select...</option>
                                                        {
                                                            paymentStatus.map((item, index) => {
                                                                return <option
                                                                    key={index}
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </option>
                                                            })
                                                        }
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='paymentStatus' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='row'>
                                                <div className='col-5 col-form-label col-form-label-sm'>Storage Location</div>
                                                <div className='col-7 d-flex'>
                                                    <Field
                                                        className="form-select form-select-sm fw-light"
                                                        component="select"
                                                        name="storageLocation"
                                                    >
                                                        <option value="">Select...</option>
                                                        {
                                                            storageLocation.map((item, index) => {
                                                                return <option
                                                                    key={index}
                                                                    value={item.Name}
                                                                >
                                                                    {item.Name}
                                                                </option>
                                                            })
                                                        }
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='storageLocation' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={`row mb-5 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-2 col-form-label col-form-label-sm'>Received Information</div>
                                                <div className='col-9 d-flex'>
                                                    <Field as="textarea"
                                                        className="form-control form-control-sm"
                                                        name="receivedInfo"
                                                    // value={purchaseData.shippingAdd}
                                                    // onChange={e => handleChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='receivedInfo' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='row'>
                                                <div className='col-3 col-form-label col-form-label-sm'>Attachment</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm fw-light"
                                                        type="file"
                                                        name="attachment"
                                                    // value={purchaseData.attachment}
                                                    // onChange={handleChange}
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='attachment' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`row mb-3 ${goodReceiptStyle.myInputfield}`}>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-4 col-form-label col-form-label-sm'>Total Price</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="number"
                                                        name="totalPrice"
                                                        value={totalPrice}
                                                        // onChange={handleChange}
                                                        disabled
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='totalPrice' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-2 col-form-label col-form-label-sm'>GST</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="number"
                                                        name="gst"
                                                    // value={totalPrice}
                                                    // onChange={handleChange}
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='gst' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-3 col-form-label col-form-label-sm'>Discount(%)</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="number"
                                                        name="discount"
                                                        // value={purchaseData.Description}
                                                        onChange={e => handleChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='discount' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-6 col-form-label col-form-label-sm'>Price After Discount</div>
                                                <div className='col-6 d-flex'>
                                                    <Field
                                                        className="form-control form-control-sm"
                                                        type="number"
                                                        name="afterDiscount"
                                                        value={priceAfterDiscount.toFixed(2)}
                                                        // onChange={e => handleChange(e, setFieldValue)}
                                                        disabled
                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='afterDiscount' />
                                                </div>
                                            </div>
                                        </div>
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