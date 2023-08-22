import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import purchaseStyle from "./purchaseMasterSty.module.css"
import { addPurchasedItemsDetail, getPurchasedItemsByPId, updatePurchasedItems } from '../../../services/purchasedItemsDetailsService';
import { useParams } from 'react-router-dom';
import { getRawMaterialData } from '../../../services/rawMaterialService';

const PurchasedItemModal = ({ sendDataToParent, propData, propIsUpdate, closemodal }) => {
    const { pId } = useParams()
    const initialData = {
        pId: pId,
        uniqueId: "",
        materialId: "",
        materialName: "",
        unitPrice: 0,
        unit: "",
        minimumPurchaseQuantity: 0,
        orderedQty: 0
    }

    const [purchasedItemData, setPurchasedItemData] = useState(initialData)
    const [avaMaterial, setAvaMaterial] = useState([])

    const [isUpdate, setIsUpdate] = useState(propIsUpdate)

    useEffect(() => {

        getRawMaterialTable()

        if (propData && isUpdate) {
            if (Object.keys(propData).length !== 0) {
                setPurchasedItemData({ ...purchasedItemData, ...propData })
            }
        }
    }, [propData])

    const funGetMaterialName = (mId) => {
        const matchData = avaMaterial.find((item) => {
            return mId === item.materialId
        })
        setPurchasedItemData({ ...purchasedItemData, materialId: matchData.materialId, materialName: matchData.materialName, unitPrice: Number(matchData.standardValuePerUnit) })
    }

    const handleChange = (e, setFieldValue) => {
        const { name, value } = e.target
        if (name === "materialId") {
            setFieldValue("materialId", value)

            value && funGetMaterialName(value)
        }

        // if (e.target.name === "orderedQty" || e.target.name === "unitPrice") {
        //     setPurchasedItemData({ ...purchasedItemData, [name]: Number(value) })
        // } else if (e.target.name === "materialId") {

        // } else {
        //     setPurchasedItemData({ ...purchasedItemData, [name]: value })
        // }
    }

    // const submitPurchsedItemsDetail = () => {
    //     if (isUpdate) {
    //         updatePurchasedItems(purchasedItemData).then((res) => {
    //             getPurchasedItemsByPId(pId).then((res1) => {
    //                 sendDataToParent(res1.data);
    //             })
    //         })
    //         // setIsUpdate(false)
    //     } else {
    //         addPurchasedItemsDetail(purchasedItemData).then((res) => {
    //             getPurchasedItemsByPId(pId).then((res1) => {
    //                 sendDataToParent(res1.data);
    //             })
    //         })
    //     }
    //     // setPurchasedItemData(initialData)
    // }


    const getRawMaterialTable = () => {
        getRawMaterialData().then((res) => {
            setAvaMaterial(res.data)
        })
    }

    const handleSubmitPurchasedItem = async (values) => {
        console.log(values)
        if (isUpdate) {
            updatePurchasedItems(values).then((res) => {
                getPurchasedItemsByPId(pId).then((res1) => {
                    sendDataToParent(res1.data);
                })
            })
            // setIsUpdate(false)
        } else {

            console.log(values)
            await addPurchasedItemsDetail(values).then((res) => {

                getPurchasedItemsByPId(pId).then((res1) => {
                    sendDataToParent(res1.data);
                })
            })
        }
    }


    const validationSchema = Yup.object({
        materialId: Yup.string().required('*Required'),
        orderedQty: Yup.number().required('*Required').min(0, "Only positive value")
    })

    return (
        <div>
            <Formik
                initialValues={purchasedItemData}
                onSubmit={handleSubmitPurchasedItem}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                                data-bs-backdrop="static"
                            >

                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5 text-info" id="exampleModalLabel">Add/Update Purchase Item</h1>
                                        </div>

                                        <div className="modal-body">
                                            <div className='container'>
                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Purchase ID</div>
                                                    <div className='col-8 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="text"
                                                            name="pId"
                                                            // value={purchasedItemData.pId}
                                                            // onChange={handleChange}
                                                            disabled
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='pId' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Material ID</div>
                                                    <div className='col-8 d-flex'>

                                                        <Field
                                                            className="form-select fw-light"
                                                            component="select"
                                                            name="materialId"
                                                            onChange={(e) => { handleChange(e, setFieldValue) }}
                                                        >
                                                            <option value="">Select...</option>
                                                            {
                                                                avaMaterial.map((item, index) => {
                                                                    return <option
                                                                        key={index}
                                                                        value={item.materialId}
                                                                    >
                                                                        {item.materialId}
                                                                    </option>
                                                                }
                                                                )}
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='materialId' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Material Name</div>
                                                    <div className='col-8 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="text"
                                                            name="materialName"
                                                            // value={purchasedItemData.materialName}
                                                            // onChange={handleChange}
                                                            disabled
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='materialName' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Unit Price</div>
                                                    <div className='col-8 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="number"
                                                            name="unitPrice"
                                                            // value={purchasedItemData.unitPrice}
                                                            // onChange={handleChange}
                                                            disabled
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='unitPrice' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Min Purchase Qty</div>
                                                    <div className='col-8 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="number"
                                                            name="minimumPurchaseQuantity"
                                                            // value={purchasedItemData.unitPrice}
                                                            // onChange={handleChange}
                                                            disabled
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='minimumPurchaseQuantity' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-4 form-label'>Requested Quantity</div>
                                                    <div className='col-4 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="number"
                                                            name="orderedQty"
                                                        // value={purchasedItemData.orderedQty}
                                                        // onChange={handleChange}
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='orderedQty' />
                                                    </div>
                                                    <div className='col-4 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="text"
                                                            name="unit"
                                                        // value={purchasedItemData.orderedQty}
                                                        // onChange={handleChange}
                                                        />
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='unit' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                                onClick={closemodal}
                                            >
                                                Close
                                            </button>
                                            <button type="submit"
                                                className="btn btn-info"
                                                data-bs-dismiss="modal"
                                            // onClick={submitPurchsedItemsDetail}
                                            >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>)
                }}

            </Formik >
        </div>
    )
}

export default PurchasedItemModal