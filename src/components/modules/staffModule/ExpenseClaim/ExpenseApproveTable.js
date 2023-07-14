import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getExpenseApproval } from '../../../../services/ExpenseclaimService';

const ExpenseApproveTable = () => {
    // const data = [
    //     {
    //         sno: 1,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 2,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 3,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 4,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 5,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 6,
    //         expensehead: "",
    //         amount: "",
    //         approveamount: "",
    //         approveremark: "",
    //         costcenter: ""
    //     },

    // ]
    const column = [{
        headerName: "S No",
        field: "sno",
        checkboxSelection: true
        // sortable: true,
        // filter: true,
        // editable: true
    },
    {
        headerName: "Employee Code", field: "empCode", sortable: true
    },
    {
        headerName: "Claim No", field: "ClaimNo", sortable: true
    },
    {
        headerName: "Branch", field: "Branch", sortable: true
    },
    {
        headerName: "Date", field: "Date", sortable: true
    },
    {
        headerName: "VoucherNo", field: "VoucherNo", sortable: true
    },
    {
        headerName: "Narration", field: "Narration", sortable: true
    },
    {
        headerName: "ExpenseStatus", field: "expenseStatus", sortable: true
    },
    {
        headerName: "Claimdate", field: "claimdate", sortable: true
    },
    {
        headerName: "Processdate", field: "processdate", sortable: true
    },
    {
        headerName: "ApprovedBy", field: "ApprovedBy", sortable: true
    },
    {
        headerName: "creditGL", field: "creditGL", sortable: true
    },
    {
        headerName: "TotalAmount", field: "TotalAmount", sortable: true
    },
    {
        headerName: "ChequeNo", field: "ChequeNo", sortable: true
    },
    {
        headerName: "NEFTNo", field: "NEFTNo", sortable: true
    },
    {
        headerName: "CostCenter", field: "CostCenter", sortable: true
    },
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    const [approve, setApprove] = useState()

    useEffect(() => {
        getExpenseApproval().then((res) =>
        setApprove(res.data)
        )
    }, [])
    return (
        <div className='justify-content-center'>


            <div className="ag-theme-alpine " style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={approve} columnDefs={column} defaultColDef={defaultColDef} />

            </div>
            <div className='row justify-content-center mb-5'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Save</button></div>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Clear</button></div>
            </div>
        </div>
    )

}
export default ExpenseApproveTable