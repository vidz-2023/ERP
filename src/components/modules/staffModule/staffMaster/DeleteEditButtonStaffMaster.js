import React from 'react'

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteBasicInfo } from '../../../../services/basicInfoServices';

const DeleteEditButtonStaffMaster = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        console.log(params)
        console.log(p.data.id)
        deleteBasicInfo(p.data.id)
       // getSalary().then()
        p.funGetBasicInfo()
    }

    const handleEdit = (p) => {
       // navigate(`/salary-structure/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButtonStaffMaster