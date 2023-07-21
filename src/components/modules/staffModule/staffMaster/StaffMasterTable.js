import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBasicInfo, searchBasicInfoAnyField } from '../../../../services/basicInfoServices'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteEditButtonStaffMaster from './DeleteEditButtonStaffMaster';

function StaffMasterTable() {
    const [basicInfo, setBasicInfo] = useState([])
    const navigate = useNavigate()

   
  

    useEffect(() => {
        handleGettingBasicTableData()
    }, [])

    const handleGettingBasicTableData = () => {
        getBasicInfo().then((res) =>
            setBasicInfo(res.data)
        )
    }

    const addStaffInformation = () =>{
        navigate('/staffMaster/0')
    }

    const searchFun = (e) => {
        const searchVal = e.target.value
         searchBasicInfoAnyField(searchVal).then((res) => setBasicInfo(res.data))
     }
    
    const columns = [
        {
            headerName: 'First Name', field: 'FirstName'
        },
        {
            headerName: 'Last Name', field: 'LastName'
        },
        {
            headerName: 'Emp Code', field: 'empCode'
        },
        {
            headerName: 'Father Name', field: 'FatherName'
        },
        {
            headerName: 'Mother Name', field: 'MotherName'
        },
        
        {
            headerName: 'DOB', field: 'DOB'
        },
        {
            headerName: 'Sex', field: 'Sex'
        },
    
      
        {
            headerName: "Action",
            field: "empCode",
            cellRenderer: DeleteEditButtonStaffMaster,
            cellRendererParams: {
                funGetBasicInfo: handleGettingBasicTableData
            }
        }
    ]
    const defaultColDefs = { sortable: true, filter: true, flex:1}
    return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-4 ms-3 '>
                    <button type="button" className='btn btn-info'
                    onClick={() => addStaffInformation()}>
                        Add Row
                    </button>
                </div>
                <div className='row col-8'>
                <div className='col-8'>
                        <input type="text" className='form-control' onChange={(e) => { searchFun(e) }} placeholder='Search'/>
                    </div>
                   
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                    rowData={basicInfo}
                    columnDefs={columns}
                    defaultColDef={defaultColDefs}
                />
            </div>
        </div>
    )
  
}

export default StaffMasterTable