import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteLeaveMaster, getLeaveMaster } from '../../../../services/LeaveMasterService';

const LeaveEditDelete = (params) => {

    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteLeaveMaster(p.data.id)
        getLeaveMaster().then()
    }

    const handleEdit = (p) => {
        navigate(`/leaveMaster/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2 ' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)
}

export default LeaveEditDelete