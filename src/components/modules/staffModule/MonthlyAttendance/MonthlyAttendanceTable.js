import React, { useEffect, useState } from 'react'

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getAttendanceProcess, searchAttendanceProcessAnyField } from '../../../../services/MonthlyattendanceService';

export const MonthlyAttendanceTable = () => {

    const [MonthlyAttendance, setMonthlyAttendance] = useState([])
    const [searchValState, setSearchValState] = useState([])

    // const MonthlyAttendance = [{
    //     month: "",
    //     year: "",
    //     empcode: "",
    //     Name: "",
    //     monthdays: "",
    //     HolidayDays: "",
    //     holidays: "",
    //     workingdays: "",
    //     paidleave: "",
    //     unpaidleave: "",
    //     othours: "",
    //     paiddays: "",
    //     branch: "",
    //     dept: "",
    //     designation: "",
    //     category: "",
    //     date: ""
    // }]

    //table header and display the fields
    const column = [
        // {
        //     headerName: "SNo",
        //     field: "sno",
        //     width: 90
        // },
        {
            headerName: 'Employee Info',
            children: [
                { field: 'empcode' },
                { field: 'Name' }
            ]
        },
        {
            headerName: 'Monthly Info',
            children: [
                { field: 'monthdays' },
                { field: 'holidays' },
                { field: 'workingdays' }
            ]
        },
        {
            headerName: 'Leaves',
            children: [
                { field: 'paidleave' },
                { field: 'unpaidleave' },
                { field: 'othours' },
                { field: 'paiddays' }
            ]
        },
        {
            headerName: 'Employee Details',
            children: [
                { field: 'branch' },
                { field: 'dept' },
                { field: 'designation' },
                { field: 'category' },
                { field: 'date' }
            ]
        }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
    }

    useEffect(() => {
        getAttendanceProcess().then((res) => {
            console.log(res.data)
            setMonthlyAttendance(res.data)
        })
    }, [])

    const searchFun = (e) => {
        const searchVal = e.target.value
        setSearchValState(searchVal)
        searchAttendanceProcessAnyField(searchVal).then((res) => setMonthlyAttendance(res.data))
    }
    const searchFunThroughBtn = () => {
        searchAttendanceProcessAnyField(searchValState).then((res) => setMonthlyAttendance(res.data))
    }

    return (
        <>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-1 col-form-label col-form-label-sm'>
                        Month
                    </div>
                    <div className='col-2'>
                        <input type="month" className='form-control form-control-sm' name='month' />
                    </div>


                    <div className='col-1 col-form-label col-form-label-sm'>
                        Year
                    </div>
                    <div className='col-2'>
                        <input type="text" className='form-control form-control-sm' onChange={(e) => { searchFun(e) }} name='year' />
                    </div>
                    <div className='col-2'>
                        <button type="button" className='btn btn-info' onClick={searchFunThroughBtn}>
                            Filter
                        </button>
                    </div>
                    <div className='col-2'>
                        <button type="button" className='btn btn-info'> Display</button>
                    </div>
                    <div className='col-2'>
                        <button type="button" className='btn btn-info'> Process</button>
                    </div>
                </div>

            </div>

            <div className="ag-theme-alpine my-3 ms-5 mb-5" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={MonthlyAttendance} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

        </>



    )
}
