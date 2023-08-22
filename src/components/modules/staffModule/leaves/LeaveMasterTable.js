import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getLeaveMaster } from '../../../../services/LeaveMasterService';
import { useNavigate } from 'react-router-dom';
import LeaveMaster from './LeaveMaster';
import LeaveEditDelete from './LeaveEditDelete';

function LeaveMasterTable() {
    const [leave, setLeave] = useState([]);
    const navigate = useNavigate();

    // const leaveMaster = [
    //     {
    //         Description: "EMergency Leave",
    //         LeaveCode: "0001",
    //         LeaveType: "Casual Leave",
    //         Applicable: "Monthly",
    //         NoOfLeaves: 1,
    //         Transferrable: "Yes",
    //         Cashable: " Yes"
    //     }
    // ]

    useEffect(() => {
        gettingTableMasterData()
    }, [])

    const gettingTableMasterData = () => {
        getLeaveMaster().then((res) => {
            console.log(res.data)
            setLeave(res.data)
        })
    }
    const column = [
        {
            headerName: "Description",
            field: "description"
        },
        {
            headerName: "LeaveCode",
            field: "leaveCode"
        },
        {
            headerName: "LeaveType",
            field: "leaveType"
        },
        {
            headerName: "Applicable",
            field: "applicable"
        },
        {
            headerName: "NoOfLeaves",
            field: "noOfLeave"
        },
        {
            headerName: "Transferable",
            field: "transferable"
        },
        {
            headerName: "Cashable",
            field: "cashable"
        },
        {
            headerName: "Action",
            cellRenderer: LeaveEditDelete,
            cellRendererParams: {
                GetMaster: gettingTableMasterData
            }
        }
    ]
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        flex: 1
    }

    const onAdd = () => {
        navigate('/leaveMaster')
    }

    return (
        <>
            <div className='input-group'>
                <button
                    type="button"
                    class="btn btn-info mb-2 mt-5"
                    style={{ position: 'relative', left: '600px' }}
                    onClick={() => onAdd()} >
                    Add Leave Master
                </button>
            </div>
            <div className="ag-theme-alpine my-3 mx-auto" style={{ width: 1200, height: 300 }}>
                <AgGridReact
                    rowData={leave}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                    animateRows={true} />
            </div>

        </>
    )
}

export default LeaveMasterTable
