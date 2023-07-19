import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBasicInfo } from '../../../../services/basicInfoServices'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteEditButtonStaffMaster from './DeleteEditButtonStaffMaster';

function StaffMasterTable() {
    const [basicInfo, setBasicInfo] = useState([])
    const navigate = useNavigate()

    /*useEffect(() => {
        getBasicInfo().then((res) =>

            setBasicInfo(res.data)
        )
    }, [])*/
  

    useEffect(() => {
        handleGettingBasicTableData()
    }, [])

    const handleGettingBasicTableData = () => {
        getBasicInfo().then((res) =>
            setBasicInfo(res.data)
        )
    }

    const addStaffInformation = () =>{
        navigate('/staffMaster')
    }
    
    const columns = [
        {
            headerName: 'First Name', field: 'FirstName'
        },
        {
            headerName: 'Last Name', field: 'LastName'
        },
        {
            headerName: 'Emp Code', field: 'EmpCode'
        },
        {
            headerName: 'Father Name', field: 'FatherName'
        },
        {
            headerName: 'Mother Name', field: 'MotherName'
        },
        {
            headerName: 'Marital Status', field: 'MaritalStatus'
        },
        {
            headerName: 'Spouse Name', field: 'SpouseName'
        },
        {
            headerName: 'Anniversary', field: 'Anniversary'
        },
        {
            headerName: 'Religion', field: 'Religion'
        },
        {
            headerName: 'DOB', field: 'DOB'
        },
        {
            headerName: 'Sex', field: 'Sex'
        },
        {
            headerName: 'Blood Group', field: 'BloodGroup'
        },
        {
            headerName: 'Nationality', field: 'Nationality'
        },
      
        {
            headerName: "Action",
            field: "EmpCode",
            cellRenderer: DeleteEditButtonStaffMaster,
            cellRendererParams: {
                funGetBasicInfo: handleGettingBasicTableData
            }
        }
    ]
    const defaultColDefs = { sortable: true, filter: true, flex:1}
    return (
        <div>
           
           <div className='text-center p-3'><button type="button" class="btn btn-info" onClick={() => addStaffInformation()}>Add Staff Information</button></div>
           
            <div className="ag-theme-alpine ms-2 me-1" style={{ height: 300 }}>
                <AgGridReact rowData={basicInfo} columnDefs={columns} defaultColDef={defaultColDefs} />
            </div>
        </div>
    )
}

export default StaffMasterTable