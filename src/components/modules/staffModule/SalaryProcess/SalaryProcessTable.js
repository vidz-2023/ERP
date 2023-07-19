import React, { useEffect, useState } from 'react'

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getSalaryProcess } from '../../../../services/salaryService';


export const SalaryProcessTable = () => {

    const [salaryProcess, setSalaryProcess] = useState([])

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

    const column = [
        {
            headerName: "Code",
            field: "empcode",
        },
        {
            headerName: "Name",
            field: "empname",
        },
        {
            headerName: "Paid Days",
            field: "paid"
        },
        {
            headerName: "InHand",
            field: "inhand"
        },
        {
            headerName: "Basic Salary",
            field: "basic"
        },
        {
            headerName: "Leave Days",
            field: "leave"
        },
        {
            headerName: "Indemnity",
            field: "indemnity"
        },
        {
            headerName: "Bonus",
            field: "bonus"
        },
        {
            headerName: "Loan",
            field: "loan"
        },
        {
            headerName: "Advance",
            field: "advance"
        },
        {
            headerName: "TDS",
            field: "tds"
        },
        {
            headerName: "CTC",
            field: "ctc"
        },
        {
            headerName: "ESI",
            field: "esi"
        },
        {
            headerName: "PF",
            field: "pf"
        },
        {
            headerName: "LWF",
            field: "lwf"
        },
        {
            headerName: "ProfessionalTax",
            field: "pt"
        },
        {
            headerName: "NetAmount",
            field: "net"
        },
        {
            headerName: "Branch",
            field: "branch"
        },
        {
            headerName: "Department",
            field: "dept"
        },
        {
            headerName: "Designation",
            field: "designation"
        },
        {
            headerName: "Category",
            field: "category"
        },
        {
            headerName: "Joining Date",
            field: "date"
        }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    useEffect(() => {
        getSalaryProcess().then((res) => {
            console.log(res.data)
            setSalaryProcess(res.data)
        })
    }, [])

    return (
        <>
            <div className="ag-theme-alpine my-3" style={{ width: 1500, height: 300 }}>
                <AgGridReact rowData={salaryProcess} columnDefs={column} defaultColDef={defaultColDef} />
            </div>

            <div className='row'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Add</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Delete</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Update</button></div>
            </div>
        </>

    )
}
