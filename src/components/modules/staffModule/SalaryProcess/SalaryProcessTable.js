import React, { useEffect, useState } from 'react'

import DeleteEditButton from './DeleteEditButton';

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

    //table header and display the fields
    const column = [
        {
            headerName: "Code",
            field: "empcode",
            width:90
        },
        {
            headerName: "Name",
            field: "empname",
            width:90
        },
        {
            headerName: "Paid Days",
            field: "paid",
            width:90
        },
        {
            headerName: "CTC",
            field: "ctc",
            width:90
        },
        {
            headerName: "InHand",
            field: "inhand",
            width:90
        },
        {
            headerName: "Basic",
            field: "basic",
            width:90
        },
        {
            headerName: "Leave Salary",
            field: "leave",
            width:90
        },
        {
            headerName: "Indemnity",
            field: "indemnity",
            width:90
        },
        {
            headerName: "Bonus",
            field: "bonus",
            width:90
        },
        {
            headerName: "Loan",
            field: "loan",
            width:90
        },
        {
            headerName: "Advance",
            field: "advance",
            width:90
        },
        {
            headerName: "TDS",
            field: "tds",
            width:90
        },
        
        {
            headerName: "ESI",
            field: "esi",
            width:90
        },
        {
            headerName: "PF",
            field: "pf",
            width:90
        },
        {
            headerName: "LWF",
            field: "lwf",
            width:90
        },
        {
            headerName: "ProfessionalTax",
            field: "pt",
            width:90
        },
        {
            headerName: "NetPayable",
            field: "net",
            width:90
        },
        {
            headerName: "Branch",
            field: "branch",
            width:90
        },
        {
            headerName: "Department",
            field: "dept",
            width:90
        },
        {
            headerName: "Designation",
            field: "designation",
            width:90
        },
        {
            headerName: "Category",
            field: "category",
            width:90
        },
        {
            headerName: "Joining Date",
            field: "date",
            width:90
        },
        {
            headerName: "Action",
            field: "empCode",
            cellRenderer: DeleteEditButton,
            cellRendererParams: {
                GetSalary: getSalaryProcess
            }
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
            <div className="ag-theme-alpine my-3 mb-5 ms-5" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={salaryProcess} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

            
        </>

    )
}
