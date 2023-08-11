import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import purchaseStyle from "./purchaseMasterSty.module.css"
import { addPurchasedItemsDetail, getPurchasedItemsByPId, getPurchasedItemsDetail } from '../../../services/purchasedItemsDetailsService';
import { useParams } from 'react-router-dom';

const PurchasedItemModal = ({ sendDataToParent, propData }) => {
    const { pId } = useParams()
    const initialData = {
        pId: "",
        itemId: "",
        description: "",
        unitPrice: 0,
        qty: 0
    }
    // console.log(dataSendToChild)

    const [purchasedItemData, setPurchasedItemData] = useState(initialData)

    useEffect(() => {
        if (propData) {
            if (Object.keys(propData).length !== 0) {
                console.log(propData)
                setPurchasedItemData(propData)
            }
        }
    }, [propData])

    // const handleSubmitPurchasedItem = (values) => {
    //     console.log(values)
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (e.target.name === "qty" || e.target.name === "unitPrice") {
            setPurchasedItemData({ ...purchasedItemData, [name]: Number(value) })
        } else {
            setPurchasedItemData({ ...purchasedItemData, [name]: value })
        }
    }

    const submitPurchsedItemsDetail = () => {
        addPurchasedItemsDetail(purchasedItemData).then((res) => {
            getPurchasedItemsByPId(pId).then((res1) => {
                sendDataToParent(res1.data);
            })

        })
        setPurchasedItemData(initialData)
    }

    return (

        <div>
            {console.log(purchasedItemData)}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-info" id="exampleModalLabel">Add/Update Purchase Item</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                className="btn btn-info"
                                data-bs-dismiss="modal"
                                onClick={submitPurchsedItemsDetail}
                            >Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default PurchasedItemModal