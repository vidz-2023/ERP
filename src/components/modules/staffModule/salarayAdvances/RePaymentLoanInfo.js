import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getLoanDetailByLoanCode } from '../../../../services/rePayLaonDetailService';
import { useParams } from 'react-router';
import { FaBook } from 'react-icons/fa';

const RePaymentLoanInfo = () => {

    const { LoanNo } = useParams()
    const [rePayLoanData, setRePayData] = useState([])
    const [numInstallPaid, setNumInstallPaid] = useState(0)
    const [numInstallUnPaid, setNumInstallUnPaid] = useState(0)
    const [totalRePaid, setTotalRePaid] = useState(0)
    const [pendingAmt, setPendingAmt] = useState(0)
    useEffect(() => {
        handleGettingTableData()
    }, [])

    const handleGettingTableData = () => {
        getLoanDetailByLoanCode(LoanNo).then((res) => {
            console.log(res.data)
            setRePayData(res.data)
            if(res.data.length>0  )
            getData(res.data)
        })

        
    }
    
    const getData = (data) =>{
       const arr = data.filter(item => item.PaidAmount != 0)
       setNumInstallPaid(arr.length)
       setNumInstallUnPaid(data.length - arr.length)
       calculateAmt(arr)
      
    }

    const calculateAmt = (arr) =>{
    
      let total = arr.reduce(function (acc, item) { return Number(acc) + Number(item.PaidAmount); }, 0);
      setTotalRePaid(total)
      setPendingAmt(arr[0].LoanAmount - total)
    }

    const columns = [
        {
            headerName: 'Installment No', field: 'InstallmentNo'
        },

        {
            headerName: 'Emp Name', field: 'EmpName'
        },
        {
            headerName: 'Loan Amount', field: 'LoanAmount'
        },
        {
            headerName: 'Paid Amount', field: 'PaidAmount'
        },
        {
            headerName: 'Pending Amount', field: 'PendingAmount'
        },
        {
            headerName: 'Status', field: 'Status'
        }



    ]
    const defaultColDefs = { sortable: true, filter: true, flex: 1 }




    return (
        <div className='container  mt-3 mb-5'>
            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                <div className='m-2'>
                    <FaBook className='me-2' />Repayment Details for LoanNo {LoanNo}
                </div>
            </h4>
            <div className='row mx-auto ms-5'>
                <div className='col-6'>
                    <div className='text-info'>Number of Installments Paid - <span className='text-dark fw-bold'>{numInstallPaid}</span> </div>
                    <div className='text-info'>Number of Installment Skipped - <span className='text-dark fw-bold'>{numInstallUnPaid}</span></div>
                </div>
                <div className='col-6'> 
                     <div className='text-info'> Total Repaid Amount  - <span className='text-dark fw-bold'>{totalRePaid}</span></div>
                    <div className='text-info'>Total Pending Amount - <span className='text-dark fw-bold'>{pendingAmt}</span></div></div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                    rowData={rePayLoanData}
                    columnDefs={columns}
                    defaultColDef={defaultColDefs}



                />
            </div>
        </div>
    )
}

export default RePaymentLoanInfo