import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import DeleteEditButton from './DeleteEditButton';

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getSalaryProcess, searchSalaryProcessAnyField } from '../../../../services/MonthlySalaryService';




export const SalaryProcessTable = () => {

    const [salaryProcess, setSalaryProcess] = useState([])
    const [searchValState, setSearchValState] = useState([])
    const navigate = useNavigate()

const DummyValue =[];

    // const salaryProcess = [{
    //     empcode: "000001",
    //     empname: "Indhu",
    //     paid: "30",
    //     ctc: "5000",
    //     inhand: "4850",
    //     basic: "",
    //     leave: "",
    //     indemnity: "",
    //     bonus: "",
    //     loan: "",
    //     advance: "",
    //     tds: "100",
    //     esi: "",
    //     pf: "",
    //     lwf: "",
    //     pt: "50",
    //     net: "4850",
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
        //     field: "sno"
        // },
        {
            headerName: "Month",
            field: "month"
        },
        {
            headerName: "Year",
            field: "year"
        },
        {
            headerName: 'Employee Info',
            children: [
                { field: 'empcode' },
                { field: 'Name' }
            ]
        },
        {
            headerName: '',
            children: [
                { field: 'paid' },
                { field: 'ctc' },
                { field: 'inhand' }
            ]
        },
        {
            headerName: 'Salary component',
            children: [
                { field: 'basic' }
            ]
        },
        {
            headerName: 'Other Earning',
            children: [
                { field: 'leave' },
                { field: 'othours' },
                { field: 'bonus' }
            ]
        },
        {
            headerName: 'Deductions',
            children: [
                { field: 'loan' },
                { field: 'advance' },
                { field: 'tds' },
                { field: 'esi' },
                { field: 'pf' },
                { field: 'lwf' },
                { field: 'pt' },
            ]
        },
        {
            headerName: 'NetPayable',
            children: [
                { field: 'net' }
            ]
        },
        // {
        //     headerName:'Basic Info',
        //     children:[
        //         {field:'HouseRent'}
        //     ]
        // },
        {
            headerName: 'Employee Details',
            children: [
                { field: 'branch' },
                { field: 'dept' },
                { field: 'designation' },
                { field: 'category' },
                { field: 'date' }
            ]
        },
        // {
        //     headerName: "Action",
        //     field: "empCode",
        //     cellRenderer: DeleteEditButton,
        //     cellRendererParams: {
        //         GetSalary: getSalaryProcess
        //     }
        // }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
    }

    const onRowClickHandler = (e) => {
        alert("Row as Selected")
        console.log(e.data)
        navigate(`/salaryslip/${e.data.empcode}`)
    }

    useEffect(() => {
        getSalaryProcess().then((res) => {
            console.log(res.data)
            setSalaryProcess(res.data)
        })
    }, [])

    const searchFun = (e) => {
        const searchVal = e.target.value
        setSearchValState(searchVal)
        searchSalaryProcessAnyField(searchVal).then((res) => setSalaryProcess(res.data))
    }
    const searchFunThroughBtn = () => {
        searchSalaryProcessAnyField(searchValState).then((res) => setSalaryProcess(res.data))
    }

    return (
        <>

            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-1 form-label'>
                        Month
                    </div>
                    <div className='col-2'>
                        <input type="month" className='form-control' name='month' />
                    </div>


                    <div className='col-1 form-label'>
                        Year
                    </div>
                    <div className='col-2'>
                        <input type="text" className='form-control' onChange={(e) => { searchFun(e) }} name='year' />
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

            <div className="ag-theme-alpine my-3 mb-5 ms-5" style={{ width: 1200, height: 300 }}>
                <AgGridReact
                    rowData={salaryProcess}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    onRowDoubleClicked={e => onRowClickHandler(e)}
                />
            </div>

        </>
    )
}
