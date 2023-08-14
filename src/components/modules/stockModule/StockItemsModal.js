import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { addItemDetails, getStockItemsByItemId, updateStockItemData } from '../../../services/stockItemsDetailServices';
import { getRawMaterialData, getRawMaterialDataByMaterialName } from '../../../services/rawMaterialService';
import { generateId } from '../../../share/generateRandomId';
import { getPurchasedItemsByMaterialId } from '../../../services/purchasedItemsDetailsService';


const StockItemsModal = ({ sId, closemodal, itemId, isEdit }) => {

    const initialValue = {
        "stockId": "",
        "stockItemId": "",
        "materialId": "",
        "materialName": "",
        "packUnit": "",
        "packQuantity": "",
        "availableUnit": "",
        "availableQty": ""
    }
    const [formValues, setFormValue] = useState(initialValue)
    const [materialNameList, setMaterialNameList] = useState([])
    const [materialName, setMaterialName] = useState("")
    const [materialId, setMaterialId] = useState("")
    const [availableQty, setAvailableQty] = useState(0)
    const [availableUnit, setAvailableUnit] = useState("")

    useEffect(() => {
        console.log(isEdit)

        if (isEdit) {
            getStockItemsByItemId(itemId).then(res => {
                setFormValue(res.data[0])
                setMaterialName(res.data[0].materialName)
                setMaterialId(res.data[0].materialId)
                setAvailableQty(res.data[0].availableQty)
            })
        }

        else {
            getRawMaterialData().then(res => {
                console.log(res.data)
                setMaterialNameList(res.data)
            })
            formValues.stockItemId = generateId("StItem00")
            console.log(formValues.stockItemId)
        }

    }, [])


    const validationSchema = Yup.object({

        materialName: Yup.string().required("required"),
        packUnit: Yup.number().required("required"),
        packQuantity: Yup.number().required("required").min(1,"enter valid quantity").max(availableQty,"This is not available"),
       
      

    })

    const handleSubmit = () => {

        if (isEdit) {

            updateStockItemData(formValues, formValues.id)
        }
        else {
            formValues.stockId = sId
            addItemDetails(formValues)
        }
        alert("Submit successfully")
        closemodal()


    }

    const handleChange = (e) => {

        const { name, value } = e.target
        setFormValue({ ...formValues, [name]: value })
       
    }

    const handleMaterialName = (option) => {
     //   setFieldValue("materialName", option.target.value)
        console.log(option.target.value)
        formValues.materialName = option.target.value
        setMaterialName(option.target.value)
        option.target.value && funGetMaterialInfoByName(option.target.value)
    }

    const funGetMaterialInfoByName = (data) => {
        getRawMaterialDataByMaterialName(data).then((res) => {
            const updateMaterialId = res.data[0].materialId
            setMaterialId(updateMaterialId)
            formValues.materialId = updateMaterialId
            getPurchaseItemsDetailsByMaterialId(updateMaterialId)
            getPurchasedItemsByMaterialId(updateMaterialId)

        })
    }

    const getPurchaseItemsDetailsByMaterialId = (data) => {
        getPurchasedItemsByMaterialId(data).then((res) => {
            const availQty = res.data[0].requestedQty
            setAvailableQty(availQty)
             formValues.availableQty = availQty

        })
    }

   
    return (
        <div>
            <div className="modal" id="exampleModal" tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                data-bs-keyboard="false" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <Formik initialValues={formValues} validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-info" id="exampleModalLabel">Add/Update Item in Stock</h1>
                                        <button type="button" className="btn-close" aria-label="Close"
                                            onClick={() => closemodal()}></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className='container'>

                                            <div className="row mb-1">
                                                <div className='col-3 form-label'>Material ID</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="materialId"
                                                        value={materialId}
                                                        disabled

                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='materialId' />
                                                </div>
                                            </div>

                                            {!isEdit && <div className="row mb-1">
                                                <div className='col-3 form-label'>Material Name</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        as="select"
                                                        name="materialName"
                                                        value={materialName}
                                                        onChange={e => handleMaterialName(e, setFieldValue)}
                                                        className="form-select form-select-sm"

                                                    >
                                                        <option value="">Select.......</option>
                                                        {materialNameList.map((item) =>
                                                            <option
                                                                key={item.id}
                                                                value={item.materialName}
                                                            >
                                                                {item.materialName}
                                                            </option>)}
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='materialName' />
                                                </div>
                                            </div> }

                                           {isEdit && <div className="row mb-1">
                                                <div className='col-3 form-label'>Material Name</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        type="text"
                                                        name="materialName"
                                                        value={materialName}
                                                        className="form-select form-select-sm"
                                                        disabled
                                                    > 
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='materialName' />
                                                </div>
                                            </div> }

                                            <div className="row mb-1">
                                                <div className='col-3 form-label'>Pack Quantity</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="number"
                                                        name="packQuantity"
                                                        value={formValues.packQuantity}
                                                        onChange={e => handleChange(e, setFieldValue)}
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='packQuantity' />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <div className='col-3 form-label'>Pack Unit</div>
                                                <div className='col-9 d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="number"
                                                        name="packUnit"
                                                        value={formValues.packUnit}
                                                        onChange={e => handleChange(e, setFieldValue)}
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='packUnit' />
                                                </div>
                                            </div>

                                            

                                            <div className="row mb-1 mt-3">
                                                <div className='col-6 form-label'>
                                                    <div className="row mb-1">
                                                        <div className='col-4 form-label'>Available Quantity</div>
                                                        <div className='col-8 d-flex'>
                                                            <Field
                                                                className="form-control"
                                                                type="number"
                                                                name="availableQty"
                                                                value={availableQty}
                                                                disabled
                                                            >
                                                            </Field>
                                                            <ErrorMessage className="text-danger ms-2" component="div" name='availableQty' />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-6 form-label'>
                                                    <div className="row mb-1">
                                                        <div className='col-4 form-label'>Available Unit</div>
                                                        <div className='col-8 d-flex'>
                                                            <Field
                                                                className="form-control"
                                                                type="number"
                                                                name="availableUnit"
                                                                value={availableUnit}
                                                                disabled
                                                            >
                                                            </Field>
                                                            <ErrorMessage className="text-danger ms-2" component="div" name='availableUnit' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => closemodal()}>Close</button>
                                        <button type="submit"
                                            className="btn btn-info"
                                        // data-bs-dismiss="modal"


                                        >Submit</button>
                                    </div>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
            </div>

        </div >
    )
}

export default StockItemsModal