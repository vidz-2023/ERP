import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExpenseApproveTable = () => {
    const data = [
        {
            sno: 1,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },
        {
            sno: 2,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },
        {
            sno: 3,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },
        {
            sno: 4,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },
        {
            sno: 5,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },
        {
            sno: 6,
            expensehead: "",
            amount: "",
            approveamount: "",
            approveremark: "",
            costcenter: ""
        },

    ]
    const column = [{
        headerName: "S No",
        field: "sno",
        checkboxSelection: true
        // sortable: true,
        // filter: true,
        // editable: true
    },
    {
        headerName: "Expense Head", field: "expensehead", sortable: true
    },
    {
        headerName: "Amount", field: "amount", sortable: true
    },
    {
        headerName: "Approve Amount", field: "approveamount", sortable: true
    },
    {
        headerName: "Approve Remark", field: "approveremark", sortable: true
    },
    {
        headerName: "Cost Center", field: "costcenter", sortable: true
    }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }
    return (
        <div className='justify-content-center'>


            <div className="ag-theme-alpine " style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={data} columnDefs={column} defaultColDef={defaultColDef} />

            </div>
            <div className='row justify-content-center mb-5'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Save</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Clear</button></div>
            </div>
        </div>
    )

}
export default ExpenseApproveTable