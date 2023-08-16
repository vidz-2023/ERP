import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useNavigate } from 'react-router-dom';
import { getStockData, searchStockDataAnyField } from '../../../services/stockService';
import DeleteEditButtonStock from './DeleteEditButtonStock';

function StockTable() 
{ 
    const [stockData, setStockData] = useState([])
    const navigate = useNavigate()
   
    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
        getStockData().then((res) => {
            console.log(res.data)
            setStockData(res.data)
        })
    }

    const addStockData = () =>{
        navigate('/stock/0')
    }
    
    const searchFun = (e) => {
        const searchVal = e.target.value
         searchStockDataAnyField(searchVal).then((res) => setStockData(res.data))
     }

    const columns = [
        {
            headerName: 'StockItem Id', field: 'stockId'
        },
       
        {
            headerName: 'Category', field: 'category'
        },
        {
            headerName: 'RequestDate', field: 'requestDate'
        },
        {
            headerName: 'RequestNo', field: 'requestNo'
        },
        {
            headerName: 'NoOfPack', field: 'noOfPack'
        },
        {
            headerName: 'ShippingCompany', field: 'shippingCompany'
        },
        {
            headerName: "Action",
            field: "empCode",
            cellRenderer: DeleteEditButtonStock,
            cellRendererParams: {
                funGetInfo: handleGettingTableData
            }
        }
      
       
    ]
    const defaultColDefs = { sortable: true, filter: true, flex:1}
    return(
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-4 ms-3 '>
                    <button type="button" className='btn btn-info'
                    onClick={() => addStockData()}>
                        Add Row
                    </button>
                </div>
                <div className='row col-8'>
                <div className='col-8'>
                        <input type="text" className='form-control' onChange={(e) => { searchFun(e) }} placeholder='Search'/>
                    </div>
                   
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                    rowData={stockData}
                    columnDefs={columns}
                    defaultColDef={defaultColDefs}
                      
                />
            </div>
        </div>
    )
}
export default StockTable