import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getBranches } from "../../../../services/masterServices";
import { getStockDataByToBranchName } from "../../../../services/stockService";
import { useParams } from "react-router-dom";
import { generateId } from "../../../../share/generateRandomId";
import PlusSignComponent from "../../../../share/PlusSignComponent";
import { getStockItemsByStockId } from "../../../../services/stockItemsDetailServices";
import moment from 'moment';

function StockConsumption() {

    const initialValue = {

        "stockConsumId": "",
        "branch": "",
        "consumDate": "",
        "remark": "",
        "fileName": "",


    }
    const [branchList, setBranchList] = useState([])
    const [formValues, setFormValue] = useState(initialValue)
    const { stockConsumId } = useParams()
    const [isUpdate, setIsUpdate] = useState(false)
    const [stockData, setStockData] = useState([])
    const [conDate, setDate] = useState("")
    useEffect(() => {

        getData()
        getBranches().then(res => {
            console.log(res.data)
            setBranchList(res.data)
        })

        getTodatDate()

    }, [])

    const getData = async () => {

        console.log(stockConsumId)
        if (stockConsumId != 0) {

            setIsUpdate(true)
        }

        else {
            formValues.stockConsumId = generateId("StComsum00")
            console.log(formValues.stockConsumId)

        }
    }

    const handleChange = (e, setFieldValue) => {

        const { name, value } = e.target
        if (name == "branch") {

            populatedDataOnGrid(value)

        }
        setFormValue({ ...formValues, [name]: value })

        setFieldValue([name], value)
    }

    const populatedDataOnGrid = value => {

        getStockDataByToBranchName(value).then(res => {
            console.log(res.data)
            if (res.data != 0) {
                getStockItemsData(res.data)
            }
            else{
                setStockData([])
            }

        })


    }

    const getStockItemsData = async (arr) => {
        console.log(arr)
        let index = 0
        const obj = {}
        const arr1 = []

            while (index < arr.length) {
                console.log(arr[index].stockId)
    
               await getStockItemsByStockId(arr[index].stockId).then(res => {
                    console.log(res.data)
                    arr1.push(...res.data)
                })
                index++
            }
    
            console.log(arr1)
            if(index == arr.length)
            setStockData(arr1)
        
       
    }

    const getTodatDate = () =>{

        var currentDate = moment().format("yyyy-MM-DD");
        console.log(currentDate)
        setDate(currentDate)
    }


    const columns = [

        {
            headerName: 'S.No', field: '',
            cellRenderer: PlusSignComponent,
        },
        {
            headerName: 'Stock Id', field: 'stockId'
        },
        {
            headerName: 'Material Name', field: 'materialName'
        },

        {
            headerName: 'Consumption Quantity', field: 'availableQty'
        }


    ]

    const defaultColDefs = { flex: 1 }

    return (
        <>
            <div className="container mt-3 mb-5">
                <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
                    <div className="m-2">
                        <FaBook className="me-2" />
                        Stock Consumption
                    </div>
                </h4>

                <Formik initialValues={formValues}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="mt-3">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            To Branch <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="branch"
                                                value={formValues.branch}
                                                className="form-select form-select-sm"
                                                onChange={e => handleChange(e, setFieldValue)}
                                            >
                                                <option value="">Select.......</option>
                                                {branchList.map((item) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.Name}
                                                    >
                                                        {item.Name}
                                                    </option>)}
                                            </Field>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Consumption Date  
                                        </label>
                                        <div className="col-sm-8 text-danger fs-6">

                                            <Field type="date" className="form-control form-control-sm"
                                                name="consumDate"
                                                value={conDate}
                                                id = "consumeDate"
                                                disabled

                                            ></Field>
                                            <ErrorMessage name='consumDate' className="ms-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Remark
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="remark"
                                                value={formValues.remark}
                                                className="form-control form-control-sm"
                                                onChange={e => handleChange(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Attachment
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="file"
                                                name="fileName"
                                                value={formValues.fileName}
                                                className="form-control form-control-sm"
                                                onChange={e => handleChange(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>)}
                </Formik>

                <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                    <AgGridReact
                        rowData={stockData}
                        columnDefs={columns}
                        defaultColDef={defaultColDefs}
                    />
                </div>
            </div>
        </>
    )
}

export default StockConsumption