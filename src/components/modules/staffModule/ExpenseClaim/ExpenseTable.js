import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getExpenseClaimDetail } from '../../../../services/ExpenseclaimService';


const ExpenseTable = () => {

    const [expensedata, setexpensedata] = useState('')
    // const data = [
    //     {
    //         sno: 1,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 2,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 3,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 4,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 5,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
    //         costcenter: ""
    //     },
    //     {
    //         sno: 6,
    //         ledger: "",
    //         panel: "",
    //         invest: "",
    //         amount: 0.00,
    //         remark: "",
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
        headerName: "Employee code", field: "empcode", sortable: true
    },
    {
        headerName: "Expense Claim code", field: "expenseclaimcode", sortable: true
    },
    {
        headerName: "Bill No", field: "billno", sortable: true
    },
    {
        headerName: "Amount Spent", field: "amountSpent", sortable: true
    },
    {
        headerName: "Remark", field: "Remarks", sortable: true
    },
    {
        headerName: "Billimage", field: "billimage", sortable: true
    },
    {
        headerName: "approvedamount", field: "ApprovedAmount", sortable: true
    },
    {
        headerName: "approveremark", field: "ApproveRemark", sortable: true
    },
    {
        headerName: "Cost Center", field: "CostCenter", sortable: true
    }
    ]

    // this way not to repeatedly write with all column
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    useEffect(() => {
        getExpenseClaimDetail().then((res) =>
        setexpensedata(res.data)
        )
    }, [])
    
    return (
        <div>


            <div className="ag-theme-alpine" style={{ width: 1300, height: 300 }}>
                <AgGridReact rowData={expensedata} columnDefs={column} defaultColDef={defaultColDef} />

            </div>
            <div className='row justify-content-center mb-5'>
                <div className='col-4'><button type="button" className='w-50 btn btn-info m-3 '>Add Blank Row</button></div>
            </div>
        </div>
    )

}
export default ExpenseTable