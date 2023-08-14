import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { getVendorMaster } from '../../../../services/vendorMasterServices';
import VendorMasterEditDelete from './VendorMasterEditDelete';

function VendorMasterTable() {

    const navigate = useNavigate();
    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        getVendorMasterData()
    }, [])

    const getVendorMasterData = () => {
        getVendorMaster().then((res) => {
            console.log(res.data)
            setVendor(res.data)
        })
    }

    const column = [
        {
            headerName: "FisrtName",
            field: "firstName"
        }, {
            headerName: "Joining Date",
            field: "joiningDate"
        },
        {
            headerName: "State",
            field: "state"
        },
        {
            headerName: "Country",
            field: "country"
        },
        {
            headerName: "Phone No",
            field: "phoneno"
        },
        {
            headerName: "Payment",
            field: "payment"
        },
        {
            headerName: "Tax No",
            field: "taxno"
        },
        {
            headerName: "GST No",
            field: "gst"
        },
        {
            headerName: "Pan No",
            field: "panNo"
        },
        {
            cellRenderer: VendorMasterEditDelete,
            cellRendererParams: {
                GetMaster: getVendorMasterData
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
        navigate('/vendorMaster')
    }

    return (
        <>
            <div className='input-group'>
                <button
                    type="button"
                    class="btn btn-info mb-2 mt-5"
                    style={{ position: 'relative', left: '600px' }}
                    onClick={() => onAdd()} >Add Vendor Master</button>
            </div>
            <div className="ag-theme-alpine  my-3 mx-auto" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={vendor} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

        </>
    )
}

export default VendorMasterTable