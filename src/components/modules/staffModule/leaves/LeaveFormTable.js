import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { getLeaveForm } from '../../../../services/LeaveFormService';
import LeaveFormEditDelete from './LeaveFormEditDelete';

function LeaveFormTable() {

    const navigate = useNavigate()
    const [applyLeave, setApplyLeave] = useState([])
    // const leaveForm = [
    //     {
    //         Employee: '',
    //         Voucherno: '',
    //         Leavecode: '',
    //         FromDate: '',
    //         ToDate: '',
    //         LeaveIn: '',
    //         Days: '',
    //         Rate: '',
    //         Amount: '',
    //         Reason: '',
    //         Remark: '',
    //         RemarkByFinance: ''
    //     }
    // ]
    useEffect(() => {
        gettingTableData()
    }, [])

    const gettingTableData = () => {
        getLeaveForm().then((res) => {
            console.log(res.data)
            setApplyLeave(res.data)
        })
    }
    const column = [
        {
            headerName: "Employee",
            field: "employee",
            width: 85
        },
        {
            headerName: "Branch",
            field: "branch",
            width: 85
        },
        {
            headerName: "LeaveCode",
            field: "leavecode",
            width: 85
        },
        {
            headerName: "AvailableLeaves",
            field: "availableLeaves",
            width: 85
        },
        {
            headerName: "Voucherno",
            field: "voucherno",
            width: 85
        },
        {
            headerName: "FromDate",
            field: "fromDate",
            width: 85
        },
        {
            headerName: "ToDate",
            field: "toDate",
            width: 85
        },
        {
            headerName: "Days",
            field: "days",
            width: 70
        },
        {
            headerName: "LeaveIn",
            field: "leaveIn",
            width: 70
        },
        {
            headerName: "Reason",
            field: "reason",
            width: 70
        },
        {
            headerName: "Action",
            cellRenderer: LeaveFormEditDelete,
            cellRendererParams: {
                GetLeave: gettingTableData
            }
        }
    ]
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        flex: 1,
    }
    const onAdd = () => {
        navigate('/leaveForm')
    }


    return (
        <>
            <button
                type="button"
                class="btn btn-info mb-2 mt-5"
                style={{ position: 'relative', left: '600px' }}
                onClick={() => onAdd()} >
                Apply Leave
            </button>
            <div className="ag-theme-alpine my-3 mx-auto" style={{ width: 1200, height: 300 }}>
                <AgGridReact
                    rowData={applyLeave}
                    columnDefs={column}
                    defaultColDef={defaultColDef} />
            </div>
        </>
    )
}

export default LeaveFormTable
