import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function LeaveFormTable() {
    const leaveForm = [
        {
            Employee: '',
            Voucherno: '',
            Leavecode: '',
            FromDate: '',
            ToDate: '',
            LeaveIn: '',
            Days: '',
            Rate: '',
            Amount: '',
            Reason: '',
            Remark: '',
            RemarkByFinance: ''
          }
    ]
    const column = [
        {
            headerName: "Employee",
            field: "empCode"
        }, 
        {
            headerName: "LeaveCode",
            field: "LeaveCode"
        },
        {
            headerName: "FromDate",
            field: "FromDate"
        },{
            headerName: "ToDate",
            field: "ToDate"
        },{
            headerName: "Days",
            field: "Days"
        },{
            headerName: "LeaveIn",
            field: "LeaveIn"
        },{
            headerName: "Rate",
            field: "Rate"
        },{
            headerName: "Amount",
            field: "Amount"
        },{
            headerName: "Reason",
            field: "Reason"
        },{
            headerName: "Remark",
            field: "Remark"
        },{
            headerName: "RemarkByFinance",
            field: "RemarkByFinance"
        },
    ]
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

  return (
    <>
      <div className="ag-theme-alpine my-1" style={{ width:2100, height: 300 }}>
                <AgGridReact rowData={leaveForm} columnDefs={column} defaultColDef={defaultColDef} />
            </div>
    </>
  )
}

export default LeaveFormTable
