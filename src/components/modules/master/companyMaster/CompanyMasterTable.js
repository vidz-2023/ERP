import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//import aggrid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteEditButtonCompanyMaster from './DeleteEditButtonCompanyMaster';
import { getCompanyMaster } from '../../../../services/CompanyMasterServices';


export const CompanyMasterTable = () => {

    const [companyMaster, setcompanyMaster] = useState([])
    const navigate = useNavigate();

    
    useEffect(() => {
        getCompanyMasterData()
    }, [])

    const getCompanyMasterData = () => {
        getCompanyMaster().then((res) => {
            console.log(res.data)
            setcompanyMaster(res.data)
        })
    }
    
    //table header and display the fields
    const column = [
        {
            headerName: "CompanyName",
            field: "companyname"
        },
        {
            headerName: "CompanyCategory",
            field: "companycategory"
        },
        {
            headerName: "GSTNo",
            field: "gstno"

        },
        {
            headerName: "No Of Employess",
            field: "noofemp"

        },
        {
            headerName: "Active Status",
            field: "active"

        },
        {
            headerName: "Flatno",
            field: "flatno"

        },
        {
            headerName: "Street",
            field: "street"

        },
        {
            headerName: "Place",
            field: "place"

        },
        {
            headerName: "Website",
            field: "website"

        },
        {
            headerName: "Email",
            field: "email"

        },
        {
            headerName: "MobileNo",
            field: "mobileno"

        },
        {
            headerName: "IndustryType",
            field: "industrytype"

        },
        {
            headerName: "FinancialYear",
            field: "financialyear"

        },
        {
            headerName: "Action",
            cellRenderer: DeleteEditButtonCompanyMaster,
            cellRendererParams: {
                GetCompany: getCompanyMasterData
            }
        }
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
    }



    const onAdd = () => {
        alert('click');
        navigate('/companyMaster')
    }

    return (
        <>

            <div className='input-group'>
                <button
                    type="button"
                    class="btn btn-info mb-2 mt-5"
                    style={{ position: 'relative', left: '600px' }}
                    onClick={() => onAdd()} >Add Company Master</button>
            </div>

            <div className="ag-theme-alpine my-3 mb-5 ms-5" style={{ width: 1200, height: 300 }}>
                <AgGridReact
                    rowData={companyMaster}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>

        </>
    )
}
