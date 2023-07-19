import React, { useEffect, useState } from 'react'
import { deleteSalary, getSalary, searchSalaryStructureAnyField } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import DeleteEditButton from './DeleteEditButton';


const SalaryTable = () => {

    const [salaryStruc, setSalaryStruc] = useState([])
    const [searchValState, setSearchValState] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
        getSalary().then((res) => {
            console.log(res.data)
            setSalaryStruc(res.data)
        })
    }

    const column = [
        {
            headerName: "empCode",
            field: "empCode"
        },
        {
            headerName: "EffectiveFrom",
            field: "EffectiveFrom"
        },
        {
            headerName: "Basic",
            field: "Basic"
        },
        {
            headerName: "ESIEmployeer",
            field: "ESIEmployeer"
        },
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
        {
            headerName: "PFEmployee",
            field: "PFEmployee"
        },
        {
            headerName: "TDS",
            field: "TDS"
        },
        {
            headerName: "Professional Tax",
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
            field: "empCode",
            // cellRenderer: buttonComp
            cellRenderer: DeleteEditButton,
            cellRendererParams: {
                funGetSalary: handleGettingTableData
            }
        }

    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
    }

    const handleAddSalary = () => {
        navigate('/salary-structure/0')
    }

    const searchFun = (e) => {
        const searchVal = e.target.value
        setSearchValState(searchVal)
        searchSalaryStructureAnyField(searchVal).then((res) => setSalaryStruc(res.data))
    }
    const searchFunThroughBtn = () => {
        searchSalaryStructureAnyField(searchValState).then((res) => setSalaryStruc(res.data))
    }
    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-4 ms-3 '>
                    <button type="button" className='btn btn-info' onClick={() => { handleAddSalary() }}>
                        Add Row
                    </button>
                </div>
                <div className='row col-8'>
                    <div className='col-8'>
                        <input type="text" className='form-control' onChange={(e) => { searchFun(e) }} />
                    </div>
                    <div className='col-4'>
                        <button type="button" className='btn btn-info' onClick={searchFunThroughBtn}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                    rowData={salaryStruc}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    )
}

export default SalaryTable