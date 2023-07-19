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
    const column = [
        {
            headerName: "Employee",
            field: "employee",
        },
        {
            headerName: "Designation",
            field: "designation",
        },
        {
            headerName: "Branch",
            field: "branch",
        },
        {
            headerName: "Department",
            field: "department",
        },
        {
            headerName: "LeaveCode",
            field: "leavecode",
        },
        {
            headerName: "FromDate",
            field: "fromDate",
        },
        {
            headerName: "ToDate",
            field: "toDate",
        },
        {
            headerName: "Days",
            field: "days",
        },
        {
            headerName: "LeaveIn",
            field: "leaveIn",
        },
        {
            headerName: "Rate",
            field: "rate",
        },
        {
            headerName: "Amount",
            field: "amount",
        },
        {
            headerName: "Reason",
            field: "reason",
        },
        {
            headerName: "Remark",
            field: "remark",
        },
        {
            headerName: "RemarkByFinance",
            field: "remarkByFinance",
        },
        {
            cellRenderer: LeaveFormEditDelete,
            cellRendererParams: {
                GetLeave: getLeaveForm
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
        alert('DO you want to open the form');
        navigate('/leaveForm')
    }

    useEffect(() => {
        getLeaveForm().then((res) => {
            console.log(res.data)
            setApplyLeave(res.data)
        })
    }, [])
    return (
        <>
            <button
                type="button"
                class="btn btn-info mb-2 mt-5"
                style={{ position: 'relative', left: '600px' }}
                onClick={() => onAdd()} >Add</button>
            <div className="ag-theme-alpine  mb-5 ms-5" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={applyLeave} columnDefs={column} defaultColDef={defaultColDef} />
            </div>
        </>
    )
}

export default LeaveFormTable
