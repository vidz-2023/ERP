import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook, FaLastfmSquare } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PlusSignComponent from "../../../share/PlusSignComponent";
import CrossMarkComponent from "../../../share/CrossMarkComponent";
import LogisticsStock from "./LogisticsStock";
import { addStockData, getStockData, getStockDataByItemId, getStockDataByStockId, updateStockData } from "../../../services/stockService";
import { useNavigate, useParams } from 'react-router-dom';
import { getStockItemsByStockId } from "../../../services/stockItemsDetailServices";
import DeleteEditButtonStockItems from "./DeleteEditButtonStockItems";
import StockItemsModal from "./StockItemsModal";
import { generareId, generateId } from "../../../share/generateRandomId";
import { getBranches, getCategories } from "../../../services/masterServices";
import { getStorageLocMasterByBranch } from "../../../services/storageLocationMasterServices";


function Stock() {


    const initialValue = {

        "stockId": "",
        "toBranch": "",
        "fromBranch": "",
        "category": "",
        "toWarehouse": "",
        "fromWarehouse": "",
        "requestDate": "",
        "requestNo": "",
        "remark": "",
        "instruction": "",
        "fileName": "",


    }

    var logictisObj = {
        "destination": "",
        "shippingMode": "",
        "shippingCompany": "",
        "shippingTrackingNo": "",
        "shippingDate": "",
        "shippingCharges": 0,
        "vesselNo": "",
        "chargeType": "",
        "documentThrough": "",
        "noOfPack": "",
        "weight": "",
        "distance": "",
        "eWayInvoiceNo": "",
        "eWayInvoiceDate": "",
        "irnNo": "",
        "irnCancelDate": "",
        "irnCancelReason": ""
    }


    const [formValues, setFormValue] = useState(initialValue)
    const [stockItemsData, setStockItemsData] = useState([])
    const { stockId } = useParams()
    const [isUpdate, setIsUpdate] = useState(false)
    const [isGetLogisticData, setIsLogisticData] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const navigate = useNavigate()
    const [editTtemId, setItemId] = useState("")
    const [isUpdateItemData, setIsUpdateItemData] = useState(false)
    const [totalPackQty, setTotalPackQuantity] = useState()
    const [branchList, setBranchList] = useState([])
    const [categoryList, setCategory] = useState([])
    const [fromWareHouseList, setFromWareHouseList] =  useState([])
    const [toWareHouseList, setToWareHouseList] =  useState([])




    useEffect(() => {
        getData()
        getBranches().then(res => {
            console.log(res.data)
            setBranchList(res.data)
        })

        getCategories().then(res => {
            console.log(res.data)
            setCategory(res.data)

        })

    }, [])

    const getData = async () => {

        console.log(stockId)
        if (stockId != 0) {
            await getStockDataByStockId(stockId).then(res => {
                res.data[0].fileName = ""
                setFormValue(res.data[0])
                console.log(res.data[0])
                getStorageLocMasterByBranch(res.data[0].fromBranch).then(res =>{
                    console.log(res.data)
                    setFromWareHouseList(res.data)
                })
                getStorageLocMasterByBranch(res.data[0].toBranch).then(res =>{
                    console.log(res.data)
                    setToWareHouseList(res.data)
                })
                document.getElementById("addBtn").disabled = false;
            })
            setIsUpdate(true)
            getStockItemsData(stockId)
        }

        else {
            formValues.stockId = generateId("St00")
            console.log(formValues.stockId)
            document.getElementById("addBtn").disabled = true;

        }
    }
    const getStockItemsData = (stockId) => {
        getStockItemsByStockId(stockId).then(res => {
            console.log(res.data)
            setStockItemsData(res.data)
            calculateTotalQuantity(res.data)
        })
    }
    const handleChange = (e, setFieldValue) => {

        const { name, value } = e.target
        console.log(name)
        console.log(value)
        if(name === "fromBranch")
        {
            getStorageLocMasterByBranch(value).then(res =>{
                console.log(res.data)
                setFromWareHouseList(res.data)
            })
        }
        if(name === "toBranch")
        {
            getStorageLocMasterByBranch(value).then(res =>{
                console.log(res.data)
                setToWareHouseList(res.data)
            })
        }
        
        setFormValue({ ...formValues, [name]: value })

        setFieldValue([name], value)
    }

    const handleChange1 = (e) => {

        const { name, value } = e.target
        console.log(name)
        console.log(value)
        setFormValue({ ...formValues, [name]: value })
    }

    //callback function
    const getDataFromLogistic = (setLogisticData) => {

        logictisObj = { ...setLogisticData }
        setIsLogisticData(true)
        console.log(logictisObj)


    }

    const handleStockItemsData = () => {
        getStockItemsData(stockId)
    }

    const openModalForEditData = (id) => {
        setIsOpenModal(true)
        setItemId(id)
        setIsUpdateItemData(true)
    }

    //callback from modal from close modal
    const closeItemModal = (close) => {
        // alert(close)
        setIsOpenModal(close)
        setIsUpdateItemData(false)
        getStockItemsData(stockId)


    }

    const handleCancel = () => {
        navigate("/stockData")
    }

    const handleSubmit = () => {
        document.getElementById("addBtn").disabled = false;
        let objData = {}
        if (isGetLogisticData) {
            objData = { ...formValues, ...logictisObj }
        }
        else {
            objData = { ...formValues }
        }
        console.log(objData)
        if (isUpdate) {
            updateStockData(objData, formValues.id)

        }
        else
            addStockData(objData)

        document.getElementById("submitBtn").disabled = true;

    }
    const validationSchema = Yup.object({

        toBranch: Yup.string().required("required"),
        fromBranch: Yup.string().required("required"),
        category: Yup.string().required("required"),
        toWarehouse: Yup.string().required("required"),
        requestDate: Yup.string().required("required"),
        requestNo: Yup.string().required("required"),

    })

    const calculateTotalQuantity = (arr) => {

        let total = arr.reduce(function (acc, item) { return Number(acc) + Number(item.packQuantity); }, 0);
        setTotalPackQuantity(total)

    }



    const columns = [
        {
            headerName: 'S.No', field: '',
            cellRenderer: PlusSignComponent,
        },

        {
            headerName: 'Material Name', field: 'materialName'
        },
        {
            headerName: 'Pack Quantity', field: 'packQuantity'
        },
        
        {
            headerName: 'Available Quantity', field: 'availableQty'
        },
        {
            headerName: 'Available Unit', field: 'availableUnit'
        },

        {
            headerName: "Action",
            field: "stockId",
            cellRenderer: DeleteEditButtonStockItems,
            cellRendererParams: {
                funGetInfo: handleStockItemsData,
                openModalForEdit: openModalForEditData,
            }
        }

    ]

    const defaultColDefs = { flex: 1 }

    return (
        <div className="container mb-5">
            <div className=" mt-3 mb-5">
                <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
                    <div className="m-2">
                        <FaBook className="me-2" />
                        Stock Transfer
                    </div>
                </h4>

                <Formik initialValues={formValues} validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="mt-3">

                            <div className="row">

                                <div className="col-md-6">
                                   
                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                           From Branch <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="fromBranch"
                                                value={formValues.fromBranch}
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
                                            <ErrorMessage name='fromBranch' className=" ms-1" />
                                        </div>
                                    </div>


                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            From Warehouse  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="fromWarehouse"
                                                value={formValues.fromWarehouse}
                                                onChange={e => handleChange(e, setFieldValue)}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select.......</option>
                                                {fromWareHouseList.map((item) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.Name}
                                                    >
                                                        {item.Name}
                                                    </option>)}
                                            </Field>
                                            <ErrorMessage name='fromWarehouse' className="ms-1" />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Category  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="category"
                                                value={formValues.category}
                                                onChange={e => handleChange(e, setFieldValue)}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select.......</option>
                                                {categoryList.map((item) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.Name}
                                                    >
                                                        {item.Name}
                                                    </option>)}
                                            </Field>
                                            <ErrorMessage name='category' className="ms-1" />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Request No.  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                type="text"
                                                name="requestNo"
                                                value={formValues.requestNo}
                                                onChange={e => handleChange(e, setFieldValue)}
                                                className="form-control form-control-sm"
                                            />
                                            <ErrorMessage name='requestNo' className=" ms-1" />
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            To Branch  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="toBranch"
                                                value={formValues.toBranch}
                                                onChange={e => handleChange(e, setFieldValue)}
                                                className="form-select form-select-sm"
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
                                            <ErrorMessage name='toBranch' className="ms-1" />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            To Warehouse  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8  text-danger fs-6">
                                            <Field
                                                as="select"
                                                name="toWarehouse"
                                                value={formValues.toWarehouse}
                                                onChange={e => handleChange(e, setFieldValue)}
                                                className="form-select form-select-sm"
                                            >
                                                 <option value="">Select.......</option>
                                                {toWareHouseList.map((item) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.Name}
                                                    >
                                                        {item.Name}
                                                    </option>)}
                                            </Field>
                                            <ErrorMessage name='toWarehouse' className="ms-1" />
                                        </div>
                                    </div>


                                    <div className="row mb-2">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Request Date  <span className="text-danger fw-bold">*</span>
                                        </label>
                                        <div className="col-sm-8 text-danger fs-6">

                                            <Field type="date" className="form-control form-control-sm"
                                                name="requestDate"
                                                value={formValues.requestDate}
                                                onChange={e => handleChange(e, setFieldValue)}></Field>
                                            <ErrorMessage name='requestDate' className="ms-1" />
                                        </div>
                                    </div>




                                </div>

                            </div>
                            <div className="row mt-2">
                                <hr></hr>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="button"
                                        id="addBtn"
                                        className="col-sm-2 mt-2 ms-2mb-4 btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setIsOpenModal(true)}
                                    >
                                        Add Row
                                    </button>
                                    <span className="ms-2 ">Total Pack Quantity = {totalPackQty}</span>
                                </div>


                            </div>
                            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                                <AgGridReact
                                    rowData={stockItemsData}
                                    columnDefs={columns}
                                    defaultColDef={defaultColDefs}
                                />
                            </div>



                            <div className="row mt-2">
                                <hr></hr>
                            </div>

                            <div className="row mb-2">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Remark
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="remark"
                                                value={formValues.remark}
                                                onChange={e => handleChange1(e)}
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Attachment
                                        </label>
                                        <input className="col-sm-8  form-control form-control-sm" type="file"
                                            name="fileName"
                                            value={formValues.fileName}
                                            onChange={e => handleChange1(e)}
                                            id="formFile" placeholder="FileName" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label col-form-label-sm">
                                            Instruction
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="instruction"
                                                value={formValues.instruction}
                                                onChange={e => handleChange1(e)}
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row mt-2">
                                <hr></hr>
                            </div>

                            <LogisticsStock id={stockId} sendDataFromLogistics={getDataFromLogistic} />
                            <div className="row">

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
                {isOpenModal && <StockItemsModal sId={stockId} closemodal={closeItemModal} itemId={editTtemId} isEdit={isUpdateItemData} />}

            </div>
        </div>
    )
}

export default Stock