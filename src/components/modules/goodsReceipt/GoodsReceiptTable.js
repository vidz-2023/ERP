import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getPurchaseDetail, searchPurchaseDetailByAnyField } from '../../../services/purchaseMasterService';
import PurchaseView from './PurchaseView';


const GoodsReceiptTable = () => {
    const [purchaseData, setPurchaseData] = useState([])
    const [poVisible, setPOVisible] = useState(true)
    const [searchValState, setSearchValState] = useState([])

    useEffect(() => {
        handlingPurchaseData()
    }, [])

    const handlingPurchaseData = () => {
        getPurchaseDetail().then((res) => {
            console.log(res.data)
            setPurchaseData(res.data)
        })

    }
    const column = [
        {
            field: "pId"
        },
        // {
        //     field: "gstType"
        // },
        {
            field: "gstNumber"
        },
        {
            field: "branch"
        },
        {
            field: "category"
        },
        // {
        //     field: "vendor"
        // },
        {
            field: "email"
        },
        // {
        //     field: "currency"
        // },
        // {
        //     field: "currencyConversionRate"
        // },
        {
            field: "orderDate"
        },
        {
            field: "orderNumber"
        },
        {
            field: "deliveryDate"
        },
        {
            field: "agent"
        },
        // {
        //     field: "refNumber"
        // },
        {
            headerName: "Action",
            field: "pId",
            cellRenderer: PurchaseView,
            cellRendererParams: {
                funGetPurchase: handlingPurchaseData
            }
        }

    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
    }

    const showListPO = () => {
        setPOVisible(true)
    }

    const showGoodsReceived = () => {
        setPOVisible(false)
    }

    const searchFun = (e) => {
        const searchVal = e.target.value
        setSearchValState(searchVal)
        searchPurchaseDetailByAnyField(searchVal).then((res) => setPurchaseData(res.data))
    }
    const searchFunThroughBtn = () => {
        searchPurchaseDetailByAnyField(searchValState).then((res) => setPurchaseData(res.data))
    }


    return (
        <div className='container'>
            <div className='row mt-3 d-flex justify-content-center'>
                <div className='col-4 ms-3'>
                    <button type="button" className='btn btn-info me-2'
                    // onClick={() => { handleAddPurchase() }}
                    >
                        Add Row
                    </button>
                    <button type="button" className='btn btn-info me-2'
                        onClick={() => { showListPO() }}
                    >
                        List PO
                    </button>
                    <button type="button" className='btn btn-info'
                        onClick={() => { showGoodsReceived() }}
                    >
                        List Goods Received
                    </button>

                </div>
                <div className='row col-8'>
                    <div className='col-8'>
                        <input type="text" className='form-control'
                            onChange={(e) => { searchFun(e) }}
                        />
                    </div>
                    <div className='col-4'>
                        <button type="button" className='btn btn-info'
                            onClick={searchFunThroughBtn}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {poVisible &&
                <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                    <AgGridReact
                        rowData={purchaseData}
                        columnDefs={column}
                        defaultColDef={defaultColDef}
                    // onGridReady={onGridReady}
                    />
                </div>
            }
        </div>
    )
}

export default GoodsReceiptTable