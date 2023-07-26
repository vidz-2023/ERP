import React, { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import HeaderCalender from './HeaderCalender';
import moment from 'moment';

import { getSalary } from '../../../../services/salaryService';
import { getBasicInfo } from '../../../../services/basicInfoServices';
import { getAttendance, getAttendenceMark } from '../../../../services/attendanceMarkingServices';

const Attendence = () => {


    let currentMonthYear = `${moment().year()}-0${moment().month() + 1}`
    const [monthYear, setMonthYear] = useState(currentMonthYear)
    let numOfDaysCurrent = moment(monthYear, "YYYY-MM").daysInMonth()

    // const [getRowData, setGetRowData] = useState([])
    const days = []
    // const [employees, setEmployees] = useState([])
    const flagAttendanceArr = ["P", "A", "WE", "H", "EHD", "MHD"]

    useEffect(() => {
        // getAllName()
        // let numOfDaysCurrent = moment(monthYear, "YYYY-MM").daysInMonth()
        // getRowDataFunction(numOfDaysCurrent)
    }, [])


    const getRowDataFunction = (numOfDays) => {

        // console.log(numOfDays)
        // let headingRow = { Name: "Nidhi", Attendance: 0 }

        // for (let i = 1;i < numOfDays + 1;i++) {
        //     headingRow = { ...headingRow, [i]: i }
        // }

        // days.push({ headingRow })
        // console.log(days)
        // setGetRowData(days)
    }

    const onGridReady = (params) => {

        let headingRow = { empName: "Nidhi", present: 0 }

        for (let i = 1;i < numOfDaysCurrent + 1;i++) {
            headingRow = { ...headingRow, [i]: "p" }
        }

        const keys = Object.keys(headingRow);
        const alphabeticalKeys = keys.filter(key => isNaN(key));
        const numericalKeys = keys.filter(key => !isNaN(key));
        const sortedKeys = alphabeticalKeys.concat(numericalKeys);
        console.log(sortedKeys)
        params.api.setColumnDefs(sortedKeys.map(item => ({ field: item })))

        days.push(headingRow)
        console.log(days)
        params.api.setRowData(days)

        getAttendance().then((res) => {
            params.api.setRowData(res.data)
        })


    }

    const handleChangeMonth = (e) => {
        setMonthYear(e.target.value)
        // console.log(e.target.value)
        const numOfDays = moment(e.target.value, "YYYY-MM").daysInMonth()
        // console.log(numOfDays)
        // setNumOfDaysForAttendance(numOfDays)
        getRowDataFunction(numOfDays)
    }

    // const getAllAttendanceFlags = () => {
    //     getAttendenceMark().then((res) => { console.log(res.data) })
    // }


    const handleCellClick = (params) => {
        console.log(params)
        params.setDataValue("hi")
    }

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        maxWidth: 120,
        // onCellValueChanged: handleCellValueChanged,
        onCellClicked: handleCellClick,
        // flex: 1,
        cellStyle: (params) => {

            switch (params.value) {
                case "P":
                    return { backgroundColor: "#D0F0C0", color: "#1DB954" }
                case "A":
                    return { backgroundColor: "#FBCEB1", color: "#E52B50" }
                case "WE":
                    return { backgroundColor: "#89CFF0", color: "#00308F" }
                case "H":
                    return { backgroundColor: "#F0E68C", color: "black" }
                case "MHD":
                    return { backgroundColor: "#ADFF2F", color: "#008000" }
                case "EHD":
                    return { backgroundColor: "#20B2AA", color: "#008B8B" }

                default:
                // return { border: "1px solid black" }

            }
        }


    }


    // const getAllName = () => {
    //     getBasicInfo().then((res) => setEmployees(res.data))
    // }
    return (
        <>
            <div className='container m-2'>
                <div className='row input-group'>
                    <h6 className='col-3 form-label'>No. of Employees:3</h6>
                    <input
                        className='col-3 form-control'
                        type="month"
                        name="month"
                        min="2018-03"
                        // value="2018-05"
                        value={monthYear}
                        onChange={handleChangeMonth}
                    />

                </div>
            </div >
            <div className="ag-theme-alpine" style={{ height: 400 }}>
                <AgGridReact
                    // rowData={getRowData}
                    // columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )

}

export default Attendence