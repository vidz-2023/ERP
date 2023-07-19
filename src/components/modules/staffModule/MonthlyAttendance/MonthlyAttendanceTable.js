import React from 'react'

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const MonthlyAttendanceTable = () => {

    const MonthlyAttendance = [{
        sno:"1",
        empcode: "000001",
        empname: "Indhu",
        monthdays: "30",
        holidays: "0",
        workingdays: "25",
        paidleave: "1",
        unpaidleave: "0",
        othours: "0",
        paiddays: "30",
        branch: "HCL-Bangalore",
        dept: "Development",
        designation: "Software Engineer",
        category: "Project",
        date: "16/02/2023"
    }]

    //table header and display the fields
    const column = [
        {
            headerName: "SNo",
            field: "sno",
            width: 90
        },
        {
            headerName: "Code",
            field: "empcode",
            width: 90
        },
        {
            headerName: "Name",
            field: "empname",
            width: 90
        },
        {
            headerName: "Month Days",
            field: "monthdays",
            width: 90
        },
        {
            headerName: "Holidays",
            field: "holidays",
            width: 90
        },
        {
            headerName: "Working Days",
            field: "workingdays",
            width: 90
        },
        {
            headerName: "Paid Leave",
            field: "paidleave",
            width: 90
        },
        {
            headerName: "Unpaid Leave",
            field: "unpaidleave",
            width: 90
        },
        {
            headerName: "OT Hours",
            field: "othours",
            width: 90
        },
        {
            headerName: "Paid Days",
            field: "paiddays",
            width: 90
        },
        {
            headerName: "Branch",
            field: "branch",
            width: 90
        },
        {
            headerName: "Department",
            field: "dept",
            width: 90
        },
        {
            headerName: "Designation",
            field: "designation",
            width: 90
        },
        {
            headerName: "Category",
            field: "category",
            width: 90
        },
        {
            headerName: "Joining Date",
            field: "date",
            width: 90
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
                <AgGridReact rowData={MonthlyAttendance} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>


        </>

    )
}
