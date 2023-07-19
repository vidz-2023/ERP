import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteWorkLocation, getWorkLocation } from '../../../../services/workLocationServices';

const DeleteEditButtonWorkLocation = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteWorkLocation(p.data.id)
        getWorkLocation().then()
        p.funGetWorkLocation()
    }

    const handleEdit = (p) => {
        navigate(`/worklocation/${p.data.empCode}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}

export default DeleteEditButtonWorkLocation