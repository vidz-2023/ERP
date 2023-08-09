import React from 'react'

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const TimeSheetTable = () => {

    const TimeSheet = [{
        sno: "1",
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
            width: 90
        },
        {
            headerName: "",
            field: "save",
            width: 90
        },
        {
            headerName: "",
            field: "cancel",
            width: 90,
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
            width: 90
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
        editable: true,
        resizable: true,
        flex: 1
    }

    return (
        <>
            <div className="ag-theme-alpine my-3 ms-5" style={{ width: 1250,height: 300 }}>
                <AgGridReact rowData={TimeSheet} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

            <div className='row mb-5 ms-5 border border-light-secondary' style={{ width: 1250, height: 150 }}>
                <div className='col-2 mt-5 ms-5 form-label'>
                    Remarks
                </div>

                <div className='col-3 mt-3'>
                    <div class="input-group" style={{ width: 600, height: 100 }} >
                        <input className="form-control" type='text' name='remarks' />
                    </div>
                </div>

            </div>
        </>

    )
}
