import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useNavigate } from 'react-router-dom';
import { getSalaryAdvancesInfo, searchSalAdvancesAnyField } from '../../../../services/salaryAdvancesService';
import DeleteEditButtonSalAdv from './DeleteEditButtonSalAdv';



const SalaryAdvancesTable = () => {

    const [salaryAdvData, setSalaryAdvData] = useState([])
    const navigate = useNavigate()
   
    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
        getSalaryAdvancesInfo().then((res) => {
            console.log(res.data)
            setSalaryAdvData(res.data)
        })
    }

    const addSalAdvInformation = () =>{
        navigate('/salaryAdvances/0')
    }

    const searchFun = (e) => {
       const searchVal = e.target.value
        searchSalAdvancesAnyField(searchVal).then((res) => setSalaryAdvData(res.data))
    }
    

    const columns = [
        {
            headerName: 'Emp Name', field: 'EmpName'
        },
       
        {
            headerName: 'Emp Code', field: 'empCode'
        },
        {
            headerName: 'Loan No', field: 'LoanNo'
        },
        {
            headerName: 'Loan Name', field: 'LoanName'
        },
        {
            headerName: 'Loan Amount', field: 'ApprovedLoanAmt'
        },
        {
            headerName: 'Status', field: 'Status'
        },
        {
            headerName: "Action",
            field: "empCode",
            cellRenderer: DeleteEditButtonSalAdv,
            cellRendererParams: {
                funGetInfo: handleGettingTableData
            }
        }
    
      
       
    ]
    const defaultColDefs = { sortable: true, filter: true, flex:1}

   
   const onRowClickHandler = (e) =>{
    console.log(e.data.LoanNo)
    navigate(`/rePayLoanInfo/${e.data.LoanNo}`)
   }

    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-4 ms-3 '>
                    <button type="button" className='btn btn-info'
                    onClick={() => addSalAdvInformation()}>
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
                    rowData={salaryAdvData}
                    columnDefs={columns}
                    defaultColDef={defaultColDefs}
                    onRowDoubleClicked={e => onRowClickHandler(e)}
                   
                />
            </div>
        </div>
    )
}

export default SalaryAdvancesTable