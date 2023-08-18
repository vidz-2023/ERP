import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useNavigate } from 'react-router-dom';
import { getStockConsumeData, searchStockConsumeDataAnyField } from '../../../../services/stockConsumptionService';
import DeleteEditButtonStock from './DeleteEditButtonStockConsum';
import DeleteEditButtonStockConsum from './DeleteEditButtonStockConsum';

function StockConsumptionTable() 
{ 
    const [stockConsumData, setStockConsumData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
       getStockConsumeData().then(res=>setStockConsumData(res.data))
    }

    const searchFun = (e) => {
        const searchVal = e.target.value
         searchStockConsumeDataAnyField(searchVal).then((res) => setStockConsumData(res.data))
     }

    const add = () =>{
        navigate('/stockConsumption/0')
    }
    
  
        const columns = [
            {
                headerName: 'stockConsumId', field: 'stockConsumId'
            },
           
            {
                headerName: 'Branch', field: 'branch'
            },
            {
                headerName: 'Consumption Date', field: 'consumDate'
            },
            {
                headerName: 'Remark', field: 'remark'
            },
            {
                headerName: 'Consumption Quantity', field: ''
                
            },
            {
                headerName: "Action",
                field: "",
                cellRenderer: DeleteEditButtonStockConsum,
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
                    onClick={() => add()}>
                        Add Row
                    </button>
                </div>
                <div className='row col-8'>
                <div className='col-8'>
                        <input type="text" className='form-control form-control-sm'  onChange={(e) => { searchFun(e) }} placeholder='Search'/>
                    </div>
                   
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                 rowData={stockConsumData}
                   columnDefs={columns}
                   defaultColDef={defaultColDefs}
                   
                      
                />
            </div>
        </div>
    )
}
export default StockConsumptionTable
