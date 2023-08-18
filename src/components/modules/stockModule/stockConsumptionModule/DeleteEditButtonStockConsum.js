import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteStockConsumeData } from '../../../../services/stockConsumptionService';



const DeleteEditButtonStockConsum = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
      
        deleteStockConsumeData(p.data.id)
        p.funGetInfo()
    }

    const handleEdit = (p) => {
        navigate(`/stockConsumption/${p.data.stockConsumId}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButtonStockConsum