import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deletePersonMaster, getPersonMaster } from '../../../../services/personMasterService';

function PersonMasterEditDelete(params) {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deletePersonMaster(p.data.id)
        getPersonMaster().then()
        p.GetMaster()
    }

    const handleEdit = (p) => {
        navigate(`/personMaster/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2 ' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)
}

export default PersonMasterEditDelete