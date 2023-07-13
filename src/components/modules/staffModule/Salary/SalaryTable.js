import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const SalaryTable = () => {

    const [salaryStruc, setSalaryStruc] = useState([])
    // const initialSal = {
    //     "empCode": "00001",
    //     "EffectiveFrom": "",
    //     "Basic": "",
    //     "ESIEmployeer": "",
    //     "PFEmployeer": "",
    //     "LWFEmployeer": "",
    //     "CTC": "",
    //     "ESIEmployee": "",
    //     "PFEmployee": "",
    //     "TDS": "",
    //     "ProfessionalTax": "",
    //     "LWFEmployee": "",
    //     "InHand": ""
    // }
    const column = [
        {
            headerName: "empCode",
            field: "empCode",
            checkboxSelection: true
        },
        // {
        //     headerName: "EffectiveFrom",
        //     field: "EffectiveFrom"
        // },
        {
            headerName: "Basic",
            field: "Basic"
        },
        // {
        //     headerName: "ESIEmployeer",
        //     field: "ESIEmployeer"
        // },
        // {
        //     headerName: "PFEmployeer",
        //     field: "PFEmployeer"
        // },
        // {
        //     headerName: "LWFEmployeer",
        //     field: "LWFEmployeer"
        // },
        {
            headerName: "CTC",
            field: "CTC"
        },
        // {
        //     headerName: "ESIEmployee",
        //     field: "ESIEmployee"
        // },
        // {
        //     headerName: "PFEmployee",
        //     field: "PFEmployee"
        // },
        {
            headerName: "TDS",
            field: "TDS"
        },
        {
            headerName: "ProfessionalTax",
            field: "ProfessionalTax"
        },
        // {
        //     headerName: "LWFEmployee",
        //     field: "LWFEmployee"
        // },

        {
            headerName: "InHand",
            field: "InHand"
        },
        {
            headerName: "Action",
            field: "InHand",
            cellRendererFramework: (params) => <div>nidhi</div>
        }

    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    useEffect(() => {
        getSalary().then((res) => {
            console.log(res.data)
            setSalaryStruc(res.data)
        })
    }, [])


    return (
        <div className=''>

            <div className="ag-theme-alpine my-3" style={{ width: 1500, height: 300 }}>

                <AgGridReact rowData={salaryStruc} columnDefs={column} defaultColDef={defaultColDef} />
            </div>
            <div className='row'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Add Row</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Delete Row</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3'>Update Row</button></div>
            </div>

        </div>
    )
}

export default SalaryTable