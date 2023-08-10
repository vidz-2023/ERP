import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteStockItemsById } from '../../../services/stockItemsDetailServices';


const DeleteEditButtonStockItems = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
       deleteStockItemsById(p.data.id)
        p.funGetInfo()
    }

    const handleEdit = (p) => {
        //console.log(p.data.LoanCode)
       // navigate(`/stock/${p.data.stockId}`)
       p.funGetInfo1(p.data.itemId)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButtonStockItems