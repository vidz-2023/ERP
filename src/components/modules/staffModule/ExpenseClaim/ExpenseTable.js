import React, { useEffect, useState } from 'react'
import { getSalary } from '../../../../services/salaryService'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { getExpenseClaim } from '../../../../services/ExpenseclaimService.js'
import DeleteEditExpenseClaim from './DeleteEditExpenseClaim'
import { useNavigate } from 'react-router-dom'

const ExpenseTable = () => {
  const [expensedata, setexpensedata] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    handleExpenseData()
  }, [])

  const handleExpenseData = () => {
    getExpenseClaim().then(res => {
      console.log(res.data)
      setexpensedata(res.data)
    })
  }

  const column = [
    {
      headerName: 'S No',
      field: 'sno',
      checkboxSelection: true
    },
    {
      headerName: 'Employee Code',
      field: 'empCode'
    },
    {
      headerName: 'Claim No',
      field: 'ClaimNo'
    },
    {
      headerName: 'Expense Status',
      field: 'expenseStatus'
    },
    {
      headerName: 'Claim Date',
      field: 'claimdate'
    },
    {
      headerName: 'Process Date',
      field: 'processdate'
    },
    {
      headerName: 'Approved By',
      field: 'ApprovedBy'
    },
    // {
    //   headerName: 'Credit GL',
    //   field: 'creditGL'
    // },
    // {
    //   headerName: 'Total Amount',
    //   field: 'TotalAmount'
    // },
    // {
    //   headerName: 'Cheque No',
    //   field: 'ChequeNo'
    // },
    // {
    //   headerName: 'NEFT No',
    //   field: 'NEFTNo'
    // },
    // {
    //   headerName: 'Cost Center',
    //   field: 'CostCenter'
    // },
    {
      headerName: 'Action',
      field: 'empCode',
      cellRenderer: DeleteEditExpenseClaim,
      cellRendererParams: {
        funGetExpenseClaim: handleExpenseData
      }
    }
  ]

  // this way not to repeatedly write with all column
  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  }

  const handleExpenseTable = () => {
    navigate('/expenseclaim/0')
  }

  return (
    <>
      <div className='container-fluid mt-4 mb-5'>
        <div className='row justify-content-md-center mb-3'>
          <button
            type='button'
            className='w-25 btn btn-info'
            onClick={() => {
              handleExpenseTable()
            }}
          >
            Add Row
          </button>
        </div>
        <div className='ag-theme-alpine' style={{ height: 300 }}>
          <AgGridReact
            rowData={expensedata}
            columnDefs={column}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  )
}
export default ExpenseTable
