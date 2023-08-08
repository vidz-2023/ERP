import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PlusSignComponent from "../../../share/PlusSignComponent";
import CrossMarkComponent from "../../../share/CrossMarkComponent";
import LogisticsStock from "./LogisticsStock";
import { getStockData } from "../../../services/stockService";

function Stock() {
    
    const initialValue = {
        
            "itemId":"item0001",
            "toBranch": "",
            "fromBranch": "",
            "category": "",
            "toWarehouse": "",
            "fromWarehouse": "",
            "requestDate": "",
            "requestNo": 0,
            "remark": "",
            "instruction": "",
            "fileName": "",
            "destination": "",
            "shippingMode": "",
            "shippingCompany": "",
            "shippingTrackingNo": "",
            "shippingDate": "",
            "shippingCharges": 0,
            "vesselNo": "",
            "chargeType": "",
            "documentThrough": "",
            "noOfPack": 5,
            "weight": "",
            "distance": "",
            "eWayInvoiceNo": "",
            "eWayInvoiceDate": "",
            "irnNo": "",
            "irnCancelDate": "",
            "irnCancelReason": "" 
          }
    
    const [formValues, setFormValue] = useState(initialValue)

    useEffect(() => {
        getStockData().then((res) => {
            console.log(res.data)
            setFormValue(res.data[0])
        })
    }, [])

    const columns = [
        {
            headerName: 'S.No', field: ''
        },
        {
            headerName: '', field: '',
            cellRenderer: PlusSignComponent,
        },

        {
            headerName: '', field: '',
            cellRenderer: CrossMarkComponent,
        },
        {
            headerName: 'Select Item', field: ''
        },
        {
            headerName: 'Description', field: ''
        },
        {
            headerName: 'Sub Item', field: ''
        },
        {
            headerName: 'Pack Unit', field: ''
        },
        {
            headerName: 'Pack Quantity', field: ''
        },
        {
            headerName: 'Unit', field: ''
        },
        {
            headerName: 'Quantity', field: ''
        }

    ]

    const defaultColDefs = { flex: 1 }

    return (
        <>
            <div className="container mt-3 mb-5">
                <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
                    <div className="m-2">
                        <FaBook className="me-2" />
                        Stock Data
                    </div>
                </h4>

                <Formik>
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="mt-3">
                            <div className="row">

                                <div className="col-md-6">

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Branch
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name="toBranch"
                                                value={formValues.toBranch}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Branch1">Branch1</option>
                                                <option value="Branch2">Branch2</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            From Branch
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name="fromBranch"
                                                value={formValues.fromBranch}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Branch1">Branch1</option>
                                                <option value="Branch2">Branch2</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Category
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name="category"
                                                value={formValues.category}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Warehouse
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name="toWarehouse"
                                                value={formValues.toWarehouse}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="aa">aa</option>
                                                <option value="bb">bb</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            From Warehouse
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name="fromWarehouse"
                                                value={formValues.fromWarehouse}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="b">a</option>
                                                <option value="b">b</option>
                                            </Field>

                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Request Date
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="date"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Request No.
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>

                           
                        </Form>)}
                </Formik>

                <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                    <AgGridReact
                        rowData=""
                        columnDefs={columns}
                        defaultColDef={defaultColDefs}
                    />
                </div>

                <div className="row">
                    <button
                        type="submit"
                        className="col-sm-2 mt-2 ms-2mb-4 btn btn-info"
                    >
                        Add Blank Row
                    </button>
                </div>

                <div className="row mt-2">
                    <hr></hr>
                </div>

                <div className="row mb-2">

                    <div className="col-md-6">
                        <div className="row">
                            <label className="col-sm-4 col-form-label">
                                Remark
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name=""
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label for="formFile" className="col-sm-4 col-form-label">
                                Attachment
                            </label>
                            <input className="col-sm-8  form-control" type="file" id="formFile" placeholder="FileName" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <label className="col-sm-4 col-form-label">
                                Instruction
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name=""
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-2">
                    <hr></hr>
                </div>

               <LogisticsStock data = {formValues} />

                <div className="row mt-2">
                    <hr></hr>
                </div>

                <div className="m-2 fs-5 fw-bolder text-info">
                    <FaBook className="me-2" />
                    Attribute
                </div>

                <div className="row ms-2">

                    <div className="col-md-6">

                        <div className="row">
                            <label className="col-sm-4 col-form-label">
                                Cost Center
                            </label>
                            <div className="col-sm-8">
                                <select
                                   
                                    className="form-select form-select-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Center1">Center1</option>
                                    <option value="Center2">Center2</option>
                                </select>

                            </div>
                        </div>

                    </div>

                </div>

                <div className="row mt-2">
                    <hr></hr>
                </div>


            </div>
        </>
    )
}

export default Stock