import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { getExpenseClaimDetail } from '../../../../services/ExpenseclaimService'
import PlusSignComponent from '../../../../share/PlusSignComponent'
import RightMarkComponent from '../../../../share/RightMarkComponet'
import CrossMarkComponent from '../../../../share/CrossMarkComponent'

function ExpenseClaimDetailTable () {
  const [expenseDetail, setExpenseDetail] = useState('')

  useEffect(() => {
    handleExpenseDetail()
  }, [])

  const handleExpenseDetail = () => {
    getExpenseClaimDetail().then(res => {
      console.log(res.data)
      setExpenseDetail(res.data)
    })
  }

  const columns = [
    {
      headerName: 'S.No',
      field: 'Sno',
      cellRenderer: PlusSignComponent
    },
    {
      headerName: 'Employee Code',
      field: 'empcode'
    },
    {
      headerName: 'Expense Claim Code',
      field: 'expenseclaimcode'
    },
    {
      headerName: 'Bill No',
      field: 'billno'
    },
    {
      headerName: 'Amount Spent',
      field: 'amountSpent'
    },
    {
      headerName: 'Remarks',
      field: 'Remarks'
    },
    {
      headerName: 'Bill Image',
      field: 'bilimage'
    },
    {
      headerName: 'Approved Amount',
      field: 'ApprovedAmount'
    },
    {
      headerName: 'Cost Center',
      field: 'CostCenter'
    },
    {
      headerName: 'Approve Remark',
      field: 'ApproveRemark',
      cellRendererSelector: p => {
        //console.log(p)
        if (p.value == 'Approved') {
          return { component: RightMarkComponent }
        }
        if (p.value == 'Declined') {
          return { component: CrossMarkComponent }
        }
      }
    }
  ]

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  }

  return (
    <>
      <div className='container-fluid mt-4 mb-5'>
        <div className='ag-theme-alpine' style={{ height: 200 }}>
          <AgGridReact
            rowData={expenseDetail}
            columnDefs={columns}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  )
}

export default ExpenseClaimDetailTable
