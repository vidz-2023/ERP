import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeader from './CustomHeader';
import HeaderCalender from './HeaderCalender';
import moment from 'moment';


const Attendence = () => {

    const [columnDefs, setColumnDefs] = useState([

        {
            headerName: "Employee Name",
            field: "name",
        },
        {
            headerName: "summary", field: "age"
        },
        {
            headerComponent: HeaderCalender
            , field: "age"
        }
    ])


    const data = [
        {
            name: "Nidhi",
            age: 35,
            date: "24"

        },
        {
            name: "Ankush",
            age: 40,
            date: "24"

        },
        {
            name: "Atishay",
            age: 7,
            date: "24"

        }

    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    const [selMonthYear, setSelMonthYear] = useState(0)
    const selectMonth = () => {

        const numOfDays = moment(selMonthYear, "YYYY-MM").daysInMonth()
        console.log(numOfDays)
    }

    const handleSelectedMonth = (e) => {
        // e.target.value

        setSelMonthYear(e.target.value)
        selectMonth()
    }
    return (
        <>
            <div className='container m-2'>
                <div className='row input-group'>

                    <h6 className='col-3 form-label'>No. of Employees:3</h6>
                    <input
                        className='col-3 form-control'
                        type="month"
                        name="month"

                        onChange={handleSelectedMonth} />

                </div>
            </div >
            <div className="ag-theme-alpine" style={{ height: 500 }}>

                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </>
    )

}

export default Attendence