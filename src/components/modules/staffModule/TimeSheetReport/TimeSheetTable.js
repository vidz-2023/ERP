import React from 'react'

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const TimeSheetTable = () => {

    const TimeSheet = [{
        sno:"1",
        save: "+",
        cancel: "X",
        employee: "Indhu",
        date: "16/02/2023",
        hours: "25",
        project: "ERP",
        activity: "",
        customer: ""
    }]

    //table header and display the fields
    const column = [
        {
            headerName: "SNo",
            field: "sno",
            width:90
        },
        {
            headerName: "",
            field: "save",
            width:90
        },
        {
            headerName: "",
            field: "cancel",
            width:90
        },
        {
            headerName: "Employee",
            field: "employee"
        },
        {
            headerName: "Date",
            field: "date"
        },
        {
            headerName: "Hours",
            field: "hours",
            width:90
        },
        {
            headerName: "Project",
            field: "project"
        },
        {
            headerName: "Activity",
            field: "activity"
        },
        {
            headerName: "Customers",
            field: "customers"
        }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    return (
        <>
            <div className="ag-theme-alpine my-3 mb-5 ms-3" style={{ width: 1300, height: 300 }}>
                <AgGridReact rowData={TimeSheet} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>
        </>

    )
}
