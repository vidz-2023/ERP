import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteSalAdv } from '../../../../services/salaryAdvancesService';

const DeleteEditButtonSalAdv = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
       deleteSalAdv(p.data.id)
        p.funGetInfo()
    }

    const handleEdit = (p) => {
        navigate(`/salaryAdvances/${p.data.empCode}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButtonSalAdv