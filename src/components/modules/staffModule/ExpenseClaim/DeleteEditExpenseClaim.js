import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteExpenseClaim, getExpenseClaim } from '../../../../services/ExpenseclaimService'
import { FaEdit, FaTrash } from 'react-icons/fa'

const DeleteEditExpenseClaim = (params) => {
    const navigate = useNavigate()

    const handleDelete = (p) =>{
        console.log(p.data.id)
        deleteExpenseClaim(p.data.id)
        alert(`${p.data.empCode} get deleted`)
        getExpenseClaim().then()
        p.funGetSalaryInfo()
    }

    const handleEdit = (p) => {
        console.log(p.data.id);
        navigate(`/expenseclaim/${p.data.id}`)
    }
  return (
    <div>
        <div>
            <button className='btn btn-info me-2' onClick={() => {handleEdit(params)}}><FaEdit /></button>
            <button className='btn btn-danger me-2' onClick={() => {handleDelete(params)}}><FaTrash /></button>
        </div>
    </div>
  )
}

export default DeleteEditExpenseClaim