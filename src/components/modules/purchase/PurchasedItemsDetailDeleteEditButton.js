import React, { useState } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { deletePurchasedItem, getPurchasedItemsByPId } from '../../../services/purchasedItemsDetailsService';

const PurchasedItemsDetailDeleteEditButton = (params) => {

    const handleDelete = (p) => {
        deletePurchasedItem(p.data.id)
        getPurchasedItemsByPId(p.data.pId).then()
        p.funGetPurchasedItems()
    }

    const handleEdit = (p) => {
        p.openModalForEdit(p.data)
    }

    return (
        <div className='d-flex'>
            <button
                className='btn btn-info me-2'
                type="button"
                onClick={() => { handleEdit(params) }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <FaEdit />
            </button>

            <button className='btn btn-danger'
                type="button"
                onClick={() => { handleDelete(params) }}
            ><FaTrash />
            </button>
        </div>
    )
}

export default PurchasedItemsDetailDeleteEditButton