import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { getCustomerMaster } from '../../../../services/customerMasterServices';
import CustomerMasterEditDelete from './CustomerMasterEditDelete';

function CustomerMasterTable() {

const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        getCustomerMasterData()
    }, [])

    const getCustomerMasterData = () => {
        getCustomerMaster().then((res) => {
            console.log(res.data)
            setCustomer(res.data)
        })
    }
    

    const column = [
        {
            headerName: "FisrtName",
            field: "cfirstName"
        }, {
            headerName: "Joining Date",
            field: "cjoiningDate"
        },
        {
            headerName: "Country",
            field: "cCountry"
        },
        {
            headerName: "Phone No",
            field: "cphoneno"
        },
        {
            headerName: "Payment",
            field: "cpayment"
        },
        {
            headerName: "Payment",
            field: "cpriceCategory"
        },
        {
            headerName: "Tax No",
            field: "ctaxno"
        },
        {
            headerName: "GST No",
            field: "cgst"
        },
        {
            headerName: "Pan No",
            field: "cpanNo"
        },
        {
            headerName: "Action",
            cellRenderer: CustomerMasterEditDelete,
            cellRendererParams: {
                GetMaster: getCustomerMasterData
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
        navigate('/customerMaster')
    }

    return (
        <>
            <div className='input-group'>
                <button
                    type="button"
                    class="btn btn-info mb-2 mt-5"
                    style={{ position: 'relative', left: '600px' }}
                    onClick={() => onAdd()} >Add Customer Master</button>
            </div>
            <div className="ag-theme-alpine  my-3 mx-auto" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={customer} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

        </>
    )
}

export default CustomerMasterTable