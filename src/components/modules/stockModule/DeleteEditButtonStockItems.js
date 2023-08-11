import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteStockItemsById } from '../../../services/stockItemsDetailServices';
import StockItemsModal from './StockItemsModal';


const DeleteEditButtonStockItems = (params) => {
    const navigate = useNavigate()
    var stockId = ""
    const handleDelete = (p) => {
        deleteStockItemsById(p.data.id)
        p.funGetInfo()
    }

    const handleEdit = (p) => {

        console.log(p.data)

        stockId = p.data.stockId
        console.log(stockId)
        // navigate(`/stock/${p.data.stockId}`)
        p.openModalForEdit(p.data.itemId)
    }

    return (

        <div className='d-flex'>
            <button
                className='btn btn-info me-2'
                type="button"
                onClick={() => { handleEdit(params) }}
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
            >
                <FaEdit />

            </button>
            <button className='btn btn-danger'
                type="button"
                onClick={() => { handleDelete(params) }}
            ><FaTrash />
            </button>
            {/* <StockItemsModal sId ={stockId}/> */}

        </div>)

}


export default DeleteEditButtonStockItems