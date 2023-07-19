import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteOfficialInfo, getOfficialInfo } from '../../../../services/salaryInfoService'

const DeleteEditSalaryInfo = (params) => {
    const navigate = useNavigate()

    const handleDelete = (p) =>{
        console.log(p.data.id)
        deleteOfficialInfo(p.data.id)
        alert(`${p.data.empCode} get deleted`)
        getOfficialInfo().then()
        p.funGetSalaryInfo()
    }

    const handleEdit = (p) => {
        console.log(p.data.id);
        navigate(`/salary-info/${p.data.id}`)
    }

    return(
        <div>
            <button className='btn btn-info me-2' onClick={() => {handleEdit(params)}}><FaEdit /></button>
            <button className='btn btn-danger me-2' onClick={() => {handleDelete(params)}}><FaTrash /></button>
        </div>
    )
}

export default DeleteEditSalaryInfo