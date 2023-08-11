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

const PurchasedItemModal = ({ sendDataToParent, propData, propIsUpdate }) => {
    const { pId } = useParams()
    const initialData = {
        pId: "",
        itemId: "",
        description: "",
        unitPrice: 0,
        qty: 0
    }

    const [purchasedItemData, setPurchasedItemData] = useState(initialData)
    const [isUpdate, setIsUpdate] = useState(propIsUpdate)

    useEffect(() => {
        if (propData && isUpdate) {
            if (Object.keys(propData).length !== 0) {
                setPurchasedItemData({ ...purchasedItemData, ...propData })
            }
        }
    }, [propData])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (e.target.name === "qty" || e.target.name === "unitPrice") {
            setPurchasedItemData({ ...purchasedItemData, [name]: Number(value) })
        } else {
            setPurchasedItemData({ ...purchasedItemData, [name]: value })
        }
    }

    const submitPurchsedItemsDetail = () => {
        if (isUpdate) {
            updatePurchasedItems(purchasedItemData).then((res) => {
                getPurchasedItemsByPId(pId).then((res1) => {
                    sendDataToParent(res1.data);
                })
            })
            // setIsUpdate(false)
        } else {
            addPurchasedItemsDetail(purchasedItemData).then((res) => {
                getPurchasedItemsByPId(pId).then((res1) => {
                    sendDataToParent(res1.data);
                })
            })
        }
        // setPurchasedItemData(initialData)
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-info" id="exampleModalLabel">Add/Update Purchase Item</h1>
                            {/*<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>*/}
                        </div>

                        <div className="modal-body">
                            <div className='container'>
                                <div className="row mb-1">
                                    <div className='col-3 form-label'>Purchase ID</div>
                                    <div className='col-9 d-flex'>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="pId"
                                            value={purchasedItemData.pId}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className='col-3 form-label'>Item ID</div>
                                    <div className='col-9 d-flex'>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="itemId"
                                            value={purchasedItemData.itemId}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className='col-3 form-label'>Description</div>
                                    <div className='col-9 d-flex'>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="description"
                                            value={purchasedItemData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className='col-3 form-label'>Unit Price</div>
                                    <div className='col-9 d-flex'>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="unitPrice"
                                            value={purchasedItemData.unitPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className='col-3 form-label'>Quantity</div>
                                    <div className='col-9 d-flex'>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="qty"
                                            value={purchasedItemData.qty}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            // onClick={submitPurchsedItemsDetail}
                            >
                                Close
                            </button>
                            <button type="button"
                                className="btn btn-info"
                                data-bs-dismiss="modal"
                                onClick={submitPurchsedItemsDetail}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchasedItemModal