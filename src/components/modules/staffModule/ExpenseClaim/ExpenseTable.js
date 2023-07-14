import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExpenseTable = () => {
    const data = [
        {
            sno: 1,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
            costcenter: ""
        },
        {
            sno: 2,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
            costcenter: ""
        },
        {
            sno: 3,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
            costcenter: ""
        },
        {
            sno: 4,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
            costcenter: ""
        },
        {
            sno: 5,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
            costcenter: ""
        },
        {
            sno: 6,
            ledger: "",
            panel: "",
            invest: "",
            amount: 0.00,
            remark: "",
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
        headerName: "Ledger", field: "ledger", sortable: true
    },
    {
        headerName: "Panel", field: "panel", sortable: true
    },
    {
        headerName: "Invest", field: "invest", sortable: true
    },
    {
        headerName: "Amount", field: "amount", sortable: true
    },
    {
        headerName: "Remark", field: "remark", sortable: true
    },
    {
        headerName: "Cost Center", field: "costcenter", sortable: true
    }
    ]

    // this way not to repeatedly write with all column
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }
    return (
        <div>


            <div className="ag-theme-alpine" style={{ width: 1300, height: 300 }}>
                <AgGridReact rowData={data} columnDefs={column} defaultColDef={defaultColDef} />

            </div>
            <div className='row justify-content-center mb-5'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Add Blank Row</button></div>
            </div>
        </div>
    )

}
export default ExpenseTable