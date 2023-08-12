import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FaBook } from "react-icons/fa";
import * as Yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { addItemDetails, getStockItemsByItemId, updateStockItemData } from '../../../services/stockItemsDetailServices';


const StockItemsModal = ({ sId, closemodal, itemId, isEdit }) => {

    const initialValue = {
        "stockId": "",
        "itemId": "",
        "selectItem": "",
        "description": "",
        "subItem": "",
        "packUnit": "",
        "packQuantity": "",
        "unit": "",
        "qty": ""
    }
    const [formValues, setFormValue] = useState(initialValue)

    useEffect(() => {
        console.log(isEdit)

        if (isEdit) {
            getStockItemsByItemId(itemId).then(res => {
                setFormValue(res.data[0])
            })
        }

    }, [])


    const validationSchema = Yup.object({

        itemId: Yup.string().required("required"),
        selectItem: Yup.string().required("required"),
        description: Yup.string().required("required"),
        subItem: Yup.string().required("required"),
        packUnit: Yup.number().required("required"),
        packQuantity: Yup.number().required("required"),
        unit: Yup.number().required("required"),
        qty: Yup.number().required("required"),

    })

    const handleSubmit = () => {

        if(isEdit) {

            updateStockItemData(formValues,formValues.id)
        }
        else{
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
                                    <div className='col-3 form-label'>Item ID</div>
                                    <div className='col-9 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="itemId"
                                            value={formValues.itemId}
                                            onChange={e => handleChange(e)}
                                        >
                                        </Field>
                                        <ErrorMessage className="text-danger ms-2" component="div" name='itemId' />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                                    <div className='col-3 form-label'>selectItem</div>
                                                    <div className='col-9 d-flex'>
                                                        <Field
                                                            as="select"
                                                            name="selectItem"
                                                            value={formValues.selectItem}
                                                            onChange={e => handleChange(e, setFieldValue)}
                                                            className="form-select form-select-sm"
                                                            
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="item1">item1</option>
                                                            <option value="item2">item2</option>
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='selectItem' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-3 form-label'>Description</div>
                                                    <div className='col-9 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="text"
                                                            name="description"
                                                            value={formValues.description}
                                                            onChange={e => handleChange(e, setFieldValue)}
                                                        >
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='description' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-3 form-label'>selectItem</div>
                                                    <div className='col-9 d-flex'>
                                                        <Field
                                                            as="select"
                                                            name="subItem"
                                                            value={formValues.subItem}
                                                            onChange={e => handleChange(e, setFieldValue)}
                                                            className="form-select form-select-sm"
                                                            
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="subItem1">subItem1</option>
                                                            <option value="subItem2">subItem2</option>
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='subItem' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-3 form-label'>Pack unit</div>
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
                                                    <div className='col-3 form-label'>Unit</div>
                                                    <div className='col-9 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="number"
                                                            name="unit"
                                                         value={formValues.unit}
                                                         onChange={e => handleChange(e, setFieldValue)}
                                                        >
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='unit' />
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className='col-3 form-label'>Quantity</div>
                                                    <div className='col-9 d-flex'>
                                                        <Field
                                                            className="form-control"
                                                            type="number"
                                                            name="qty"
                                                        value={formValues.qty}
                                                        onChange={e => handleChange(e, setFieldValue)}
                                                        >
                                                        </Field>
                                                        <ErrorMessage className="text-danger ms-2" component="div" name='qty' />
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