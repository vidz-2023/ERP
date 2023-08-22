import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { getStorageLocMaster } from '../../../../services/storageLocationMasterServices';
import EditDeleteStorageLocationMaster from './EditDeleteStorageLacationMaster';

function StorageLocationMasterTable() {

    const navigate = useNavigate();
    const [storageLocationMaster, setStorageLocationMaster] = useState([]);

    useEffect(() => {
        getStorageLocMasterMasterData()
    }, [])

    const getStorageLocMasterMasterData = () => {
        getStorageLocMaster().then((res) => {
            setStorageLocationMaster(res.data)
        })
    }


    const column = [
        {
            headerName: "Id",
            field: "id"
        },
         {
            headerName: "Name",
            field: "Name"
        }, 
        {
            headerName: "Branch",
            field: "Branch"
        },           
        {
            headerName: "Action",
            cellRenderer: EditDeleteStorageLocationMaster,
            cellRendererParams: {
                GetMaster: getStorageLocMasterMasterData
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
        navigate('/storageLocMaster')
    }

    return (
        <>
            <div className='input-group'>
                <button
                    type="button"
                    class="btn btn-info mb-2 mt-5"
                    style={{ position: 'relative', left: '600px' }}
                    onClick={() => onAdd()} >Add StorageLocationMaster </button>
            </div>
            <div className="ag-theme-alpine  my-3 mx-auto" style={{ width: 1200, height: 300 }}>
                <AgGridReact rowData={storageLocationMaster} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
            </div>

        </>
    )
}

export default StorageLocationMasterTable