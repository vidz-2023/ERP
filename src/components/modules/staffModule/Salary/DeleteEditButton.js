import React from 'react'
import { deleteSalary, getSalary } from '../../../../services/salaryService';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const DeleteEditButton = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteSalary(p.data.id)
        getSalary().then()
        p.funGetSalary()
    }

    const handleEdit = (p) => {
        navigate(`/salary-structure/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButton