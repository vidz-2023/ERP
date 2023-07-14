import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getLeaveMaster } from '../../../../services/LeaveMasterService';

function LeaveMasterTable() {
    const [leave, setLeave] = useState([])
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
    const column = [
        {
            headerName: "Description",
            field: "Description"
        },
        {
            headerName: "LeaveCode",
            field: "LeaveCode"
        },
        {
            headerName: "LeaveType",
            field: "LeaveType"
        }, {
            headerName: "Applicable",
            field: "Applicable"
        }, {
            headerName: "NoOfLeaves",
            field: "NoOfLeaves"
        }, {
            headerName: "Transferrable",
            field: "Transferrable"
        }, {
            headerName: "Cashable",
            field: "Cashable"
        },
    ]
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }


    useEffect(() => {
        getLeaveMaster().then((res) => {
            console.log(res.data)
            setLeave(res.data)
        })

    }, [])
    return (
        <>
            <div className='input-group'>
                <button className='btn btn-info' > Add </button> 
            </div>
            <div className="ag-theme-alpine my-3" style={{ width: 1500, height: 300 }}>
                <AgGridReact rowData={leave} columnDefs={column} defaultColDef={defaultColDef} />
            </div>
        </>
    )
}

export default LeaveMasterTable
