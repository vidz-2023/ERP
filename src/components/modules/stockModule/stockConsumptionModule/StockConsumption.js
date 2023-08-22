import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getBranches } from "../../../../services/masterServices";
import { getStockDataByToBranchName } from "../../../../services/stockService";
import { useNavigate, useParams } from "react-router-dom";
import { generateId } from "../../../../share/generateRandomId";
import PlusSignComponent from "../../../../share/PlusSignComponent";
import { getStockItemsByStockId, updateStockItemData } from "../../../../services/stockItemsDetailServices";
import moment from 'moment';
import { addStockConsumData, getStockConsumeDataById, updateStockConsumeData } from "../../../../services/stockConsumptionService";

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
    const navigate = useNavigate()
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

            getStockConsumeDataById(stockConsumId).then(res => {
                setFormValue(res.data[0])
                populatedDataOnGrid(res.data[0].branch)
            })
            setIsUpdate(true)

        }

        else {
            formValues.stockConsumId = generateId("StComsum00")
            console.log(formValues.stockConsumId)

        }
    }

    const validationSchema = Yup.object({

        branch: Yup.string().required("required"),
        remark: Yup.string().required("required"),

    })
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
            else {
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
        if (index == arr.length)
            setStockData(arr1)


    }

    const getTodatDate = () => {

        var currentDate = moment().format("yyyy-MM-DD");
        console.log(currentDate)
        setDate(currentDate)
    }

    const handleCancel = () => {
        navigate("/stockConsumptionData")
        deleteStockConsumptionQuantity()
    }

    const handleSubmit = () => {

        console.log(formValues)
        formValues.consumDate = conDate
        formValues.fileName = ""
        if (isUpdate) {
            updateStockConsumeData(formValues, formValues.id)
        }
        else {
            addStockConsumData(formValues)
        }

        updateStockItemsDataQty()
        navigate("/stockConsumptionData")
        // document.getElementById("submitBtn").disabled = true;

    }

    const updateStockItemsDataQty = () => {
        console.log(stockData)
        let index = 0
        console.log(stockData[index].leftQty)
        while (index < stockData.length) {
            if (stockData[index].leftQty >=0) {
                stockData[index].availableQty = stockData[index].leftQty
                delete stockData[index].leftQty
                delete stockData[index].conQty


                updateStockItemData(stockData[index], stockData[index].id)
                console.log(stockData)
            }
            index++
        }
    }

    const deleteStockConsumptionQuantity = () => {
        let index = 0
        while (index < stockData.length) {
            if (stockData[index].leftQty) {

                delete stockData[index].leftQty
                delete stockData[index].conQty

                updateStockItemData(stockData[index], stockData[index].id)
                console.log(stockData)
            }
            index++
        }
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
            headerName: 'Stock Item Id', field: 'stockItemId'
        },
        {
            headerName: 'Material Name', field: 'materialName'
        },

        {
            headerName: 'Available Quantity', field: 'availableQty',

            cellStyle: (params) => {
                
                 if(params.value ===0)
                return { color: "red", fontWeight:'bold' }
                if(params.value <=  params.data.minStockAllowed)
                return {color: "yellow" ,fontWeight:'bold'}
               
            }
           
         
        },


        {
            headerName: 'Consumption Quantity', field: 'conQty',
            editable: true,

        },
        {
            headerName: 'Remaining Quantity', field: 'leftQty'

        },




    ]

    const defaultColDefs = { flex: 1 }

    const onEditCell = (e) => {
         
        console.log(e.rowData)
        console.log(stockData[e.rowIndex])
        if (e.newValue <= e.data.availableQty && e.newValue > 0) {
            stockData[e.rowIndex].conQty = e.newValue
            stockData[e.rowIndex].leftQty = e.data.availableQty - e.newValue
            updateStockItemData(stockData[e.rowIndex], stockData[e.rowIndex].id)
            populatedDataOnGrid(formValues.branch)
        }

        else{
            alert("please give valid value")
           
            delete stockData[e.rowIndex].conQty
            updateStockItemData(stockData[e.rowIndex], stockData[e.rowIndex].id)
            populatedDataOnGrid(formValues.branch)
        }



    }


    return (
        <>
            <div className="container mt-3 mb-5 pb-3">
                <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
                    <div className="m-2">
                        <FaBook className="me-2" />
                        Stock Consumption
                    </div>
                </h4>

                <Formik initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="mt-3">
                            <div className="row">

                                <div className="col-md-6">
                                    {!isUpdate && <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Branch <span className="text-danger fw-bold">*</span>
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
                                            <ErrorMessage name='branch' className=" ms-1" />
                                        </div>
                                    </div>}

                                    {isUpdate && <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Branch <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                type="text"
                                                name="branch"
                                                value={formValues.branch}
                                                className="form-control form-control-sm"
                                                disabled
                                            >
                                            </Field>
                                        </div>
                                    </div>}

                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Consumption Date
                                        </label>
                                        <div className="col-sm-8 text-danger fs-6">

                                            <Field type="date" className="form-control form-control-sm"
                                                name="consumDate"
                                                value={conDate}
                                                id="consumeDate"
                                                disabled

                                            ></Field>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">

                                <div className="col-md-6  ">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Remark
                                        </label>
                                        <div className="col-sm-8 text-danger fs-6">
                                            <Field
                                                type="text"
                                                name="remark"
                                                value={formValues.remark}
                                                className="form-control form-control-sm"
                                                onChange={e => handleChange(e, setFieldValue)}
                                            >
                                            </Field>
                                            <ErrorMessage name='remark' className=" ms-1" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Attachment
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="file"
                                                name="fileName"
                                                value={formValues.fileName}
                                                className="form-control form-control-sm"
                                                onChange={e => handleChange(e, setFieldValue)}
                                            >
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                                <AgGridReact
                                    rowData={stockData}
                                    columnDefs={columns}
                                    defaultColDef={defaultColDefs}
                                    onCellEditingStopped={e => onEditCell(e)}


                                />
                            </div>

                            <div className="row mb-5">

                                <div className='col-sm-12 text-center'>
                                    <button type="submit"
                                        className="btn btn-info " id="submitBtn">Submit</button>
                                    <button type="button"
                                        className="btn btn-info ms-3"
                                        onClick={() => handleCancel()}>Cancel</button>
                                </div>


                            </div>



                        </Form>)}
                </Formik>


            </div>
        </>
    )
}

export default StockConsumption