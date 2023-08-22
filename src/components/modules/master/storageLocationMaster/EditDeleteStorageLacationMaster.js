import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteStorageLocMaster, getStorageLocMaster } from '../../../../services/storageLocationMasterServices';

function EditDeleteStorageLocationMaster(params) {

    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteStorageLocMaster(p.data.id)
        getStorageLocMaster().then()
        p.GetMaster()
    }

    const handleEdit = (p) => {
        navigate(`/storageLocMaster/${p.data.id}`)
    }

    return (
        <div>
            <button className='btn btn-info me-2 ' onClick={() => { handleEdit(params) }}><FaEdit /></button>
            <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
        </div>
    )
}

export default EditDeleteStorageLocationMaster
