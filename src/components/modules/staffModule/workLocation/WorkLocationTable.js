import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { getWorkLocation, searchWorkLocationAnyField } from '../../../../services/workLocationServices';
import DeleteEditButtonWorkLocation from './DeleteEditButtonWorkLocation';


const WorkLocationTable = () => {
    const [workLocationData, setWorkLocationData] = useState([])
    const [workValState, setWorkValState] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
        getWorkLocation().then((res) => {
            console.log(res.data)
            setWorkLocationData(res.data)
        })
    }

    const column = [
        {
            headerName: "empCode",
            field: "empCode"
        },
        {
            headerName: "Effective From",
            field: "EffectiveFrom"
        },
        {
            headerName: "Branch",
            field: "Branch"
        },
        {
            headerName: "Department",
            field: "Department"
        },
        {
            headerName: "LateIn",
            field: "LateIn"
        },
        {
            headerName: "Designation",
            field: "Designation"
        },
        {
            headerName: "Category",
            field: "Category"
        },

        {
            headerName: "EmployeeShift",
            field: "EmployeeShift"
        },
        {
            headerName: "EarlyOut",
            field: "EarlyOut"
        },

        {
            headerName: "LoanAmount",
            field: "LoanAmount"
        },

        {
            headerName: "Action",
            field: "empCode",
            // cellRenderer: buttonComp
            cellRenderer: DeleteEditButtonWorkLocation,
            cellRendererParams: {
                funGetWorkLocation: handleGettingTableData
            }
        }

    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1
    }

    const handleAddWorkLocation = () => {
        navigate('/worklocation/0')
    }

    // searchWorkLocationAnyField

    const searchFun = (e) => {
        const searchVal = e.target.value
        setWorkValState(searchVal)
        searchWorkLocationAnyField(searchVal).then((res) => setWorkLocationData(res.data))
    }
    const searchFunThroughBtn = () => {
        searchWorkLocationAnyField(workLocationData).then((res) => setWorkLocationData(res.data))
    }

    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-4 ms-3 '>
                    <button type="button" className='btn btn-info' onClick={() => { handleAddWorkLocation() }}>
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
                    rowData={workLocationData}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                />
            </div>

        </div>
    )
}

export default WorkLocationTable