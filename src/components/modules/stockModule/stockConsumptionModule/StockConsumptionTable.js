import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useNavigate } from 'react-router-dom';

function StockConsumptionTable() 
{ 
   
    const navigate = useNavigate()
    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
       
    }

    const add = () =>{
        navigate('/stockConsumption/0')
    }
    
  

    const columns = [
       
       
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
                        <input type="text" className='form-control'  placeholder='Search'/>
                    </div>
                   
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                   
                    defaultColDef={defaultColDefs}
                      
                />
            </div>
        </div>
    )
}
export default StockConsumptionTable
