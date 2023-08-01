import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { getBasicInfo } from '../../../../services/basicInfoServices';
import { addAttendance, getAttendance, updateAttendance } from '../../../../services/attendanceMarkingServices';

const Attendence = () => {
    let currentMonthYear = `${moment().year()}-0${moment().month() + 1}`
    const [monthYear, setMonthYear] = useState(currentMonthYear)
    let numOfDaysCurrent = moment(monthYear, "YYYY-MM").daysInMonth()
    const days = []
    const [employeesNumber, setEmployeesNumbers] = useState(0)
    let data = {
        "empName": "",
        "present": 0,
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": "",
        "10": "",
        "11": "",
        "12": "",
        "13": "",
        "14": "",
        "15": "",
        "16": "",
        "17": "",
        "18": "",
        "19": "",
        "20": "",
        "21": "",
        "22": "",
        "23": "",
        "24": "",
        "25": "",
        "26": "",
        "27": "",
        "28": "",
        "29": "",
        "30": "",
        "31": ""
    }
    let attendanceChangeArray = []
    let attendanceNewIdArray = []


    // ================================================= calculating weekends =========================
    const getWeekdaysWeekends = (year, month) => {
        const firstDayOfMonth = moment({ year, month, day: 1 });
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
        let current = moment(firstDayOfMonth);
        let weekdaysList = [];
        let weekendsList = [];
        while (current <= lastDayOfMonth) {
            const dayOfWeek = current.day();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                // 0 represents Sunday and 6 represents Saturday
                weekendsList.push(current.format('D'));
            } else {
                weekdaysList.push(current.format('D'));
            }
            current.add(1, 'day');
        }
        return { weekendsList, weekdaysList }
    }

    // =========================================================Table================================
    const onGridReady = (params, year, month, noOfDaysInCurrentMonth) => {
        console.log(params)
        const { weekendsList, weekdaysList } = getWeekdaysWeekends(year, month)
        // ============================================== heading row ======================== 
        let headingRow = { id: "", empName: "", present: 0, month: "", year: "" }
        for (let i = 1;i < noOfDaysInCurrentMonth + 1;i++) {
            headingRow = { ...headingRow, [i]: "" }
        }
        const keys = Object.keys(headingRow);
        const alphabeticalKeys = keys.filter(key => isNaN(key));
        const numericalKeys = keys.filter(key => !isNaN(key));
        const sortedKeys = alphabeticalKeys.concat(numericalKeys);
        params.api.setColumnDefs(sortedKeys.map(item => {
            let fieldObj = {}
            if (item === "empName") {
                fieldObj = { ...fieldObj, field: item, pinned: "left", maxWidth: 130, editable: false }
            } else if (item === "present") {
                fieldObj = {
                    ...fieldObj,
                    field: item,
                    pinned: "left",
                    maxWidth: 130,
                    editable: false,
                    valueGetter: (params) => {
                        let itemPresent = 0
                        let objVal = Object.values(params.data)
                        objVal.forEach((item) => {
                            if (item === 'P') {
                                itemPresent++
                            }
                        })
                        return itemPresent
                    },
                    valueFormatter: function (present, total = weekdaysList.length) {
                        return present.value + ' / ' + total
                    }
                }
            } else if (item === "id" || item === "month" || item === "year") {
                fieldObj = { ...fieldObj, field: item, pinned: "left", maxWidth: 70, editable: false, hide: true }
            } else {
                fieldObj = { ...fieldObj, field: item, maxWidth: 80, editable: false }
            }
            return (fieldObj)
        }))
        days.push(headingRow)
        params.api.setRowData(days)
        //============================================ populate data in cell =====================================
        getBasicInfo().then((resBasicInfo) => {
            let names = resBasicInfo.data.map((item) => {
                let fullName = item.FirstName + " " + item.LastName
                return fullName
            })
            setEmployeesNumbers(names.length)
            let namePresentInAttendance = []
            getAttendance().then((resAttendance) => {
                let populatedAllData = []
                names.forEach((item) => {
                    data = { ...data, empName: item }
                    // =====================================weekend data================
                    weekendsList.forEach((item) => {
                        data = { ...data, [item]: "WE" }
                    })
                    // =======================================week days data =============
                    resAttendance.data.forEach((itemAttendance) => {
                        if (item === itemAttendance.empName) {
                            namePresentInAttendance.push(itemAttendance.empName)
                            weekdaysList.forEach((weekdaysItem) => {
                                data = {
                                    ...data,
                                    [weekdaysItem]: itemAttendance[weekdaysItem],
                                    id: itemAttendance.id,
                                    month: itemAttendance.month,
                                    year: itemAttendance.year
                                }
                            })
                            populatedAllData.push(data)
                        }
                    })
                    if (!namePresentInAttendance.includes(item)) {
                        weekdaysList.forEach((weekdaysItem) => {
                            data = { ...data, [weekdaysItem]: "", present: 0, id: "" }
                        })
                        populatedAllData.push(data)
                    }
                })
                params.api.setRowData(populatedAllData)
            })
        })
    }
    const handleChangeMonth = (e) => {
        setMonthYear(e.target.value)
        const numOfDays = moment(e.target.value, "YYYY-MM").daysInMonth()
        let mY = e.target.value
        let mYArr = mY.split("-")
        let year = mYArr[0]
        let month = mYArr[1]
        console.log(year, month, numOfDays)
        // onGridReady(2023, 6, numOfDays)
    }

    const handleCellClick = (params) => {
        if (params.value === "P" || params.value === "A" || params.value === "") {
            if (params.data[params.colDef.field] === "A") {
                params.data[params.colDef.field] = "P"
                params.api.setRowData("P");
            } else {
                params.data[params.colDef.field] = "A"
                params.api.setRowData("A");
            }
            if (params.data.id) {
                data = { ...data, ...params.data }
                attendanceChangeArray.push(data)
            } else {
                data = { ...data, ...params.data }
                attendanceNewIdArray.pop()
                attendanceNewIdArray.push(data)
            }
        }
    }

    const submitAttendanceHandle = () => {
        attendanceChangeArray && attendanceChangeArray.forEach((item) => {
            updateAttendance(item).then((res) => {
                if (res.status !== 200) {

                }
            })
        })
        attendanceNewIdArray && attendanceNewIdArray.forEach((item) => {
            addAttendance(item).then((res) => {
                if (res.status !== 200) {

                }
            })
        })
        alert("Attendance submitted successfully ")
    }
    const defaultColDef = {
        sortable: true,
        filter: true,
        lockPinned: true,
        singleClickEdit: true,
        onCellClicked: handleCellClick,
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
            }
        }
    }

    return (
        <>
            <div className='container m-2'>
                <div className='row input-group'>
                    <h6 className='col-3 form-label'>No. of Employees: {employeesNumber}</h6>
                    <input
                        className='col-3 form-control'
                        type="month"
                        name="month"
                        min="2018-03"
                        // value="2018-05"
                        value={monthYear}
                        onChange={handleChangeMonth}
                    />
                    <div className='col-2'></div>
                    <div className='col-4 ms-3 '>
                        <button type="button"
                            className='btn btn-info'
                            onClick={submitAttendanceHandle}
                        >
                            Submit Attendance
                        </button>
                    </div>
                </div>
            </div >
            <div className="ag-theme-alpine" style={{ height: 500 }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    onGridReady={(p) => onGridReady(p, 2023, 6, numOfDaysCurrent)}
                />
            </div>
        </>
    )
}
export default Attendence