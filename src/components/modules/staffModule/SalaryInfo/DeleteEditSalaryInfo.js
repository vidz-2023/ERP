import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteSalaryInfo, getSalaryInfo } from '../../../../services/salaryInfoService'

const DeleteEditSalaryInfo = (params) => {
    const navigate = useNavigate()

    const handleDelete = (p) =>{
        console.log(p.data.id)
        deleteSalaryInfo(p.data.id)
        getSalaryInfo().then()
        p.funGetSalaryInfo()
    }

    const handleEdit = (p) => {
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