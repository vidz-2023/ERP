import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBasicInfo } from '../../../../services/basicInfoServices'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function StaffMasterTable() {
    const [basicInfo, setBasicInfo] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getBasicInfo().then((res) =>

            setBasicInfo(res.data)
        )
    }, [])

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
            headerName: 'Image', field: 'image'
        },
    ]
    const defaultColDefs = { sortable: true, filter: true }
    return (
        <div>
           
           <div className='text-center p-3'><button type="button" class="btn btn-info" onClick={() => addStaffInformation()}>Add Staff Information</button></div>
           
            <div className="ag-theme-alpine m-2 ps-5 me-5" style={{ height: 300, width: 1200 }}>
                <AgGridReact rowData={basicInfo} columnDefs={columns} defaultColDef={defaultColDefs} />
            </div>
        </div>
    )
}

export default StaffMasterTable