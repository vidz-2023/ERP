import React, { useState } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { deletePurchasedItem, getPurchasedItemsByPId } from '../../../services/purchasedItemsDetailsService';
import PurchasedItemModal from './PurchasedItemModal';


const PurchasedItemsDetailDeleteEditButton = (params) => {

    const handleDelete = (p) => {
        console.log(p)
        deletePurchasedItem(p.data.id)
        getPurchasedItemsByPId(p.data.pId).then()
        p.funGetPurchasedItems()
    }

    const [dataSendToChild, setDataSendToChild] = useState({})

    const handleEdit = (p) => {
        // navigate(`/purchase-master/${p.data.pId}`)
        console.log(p)
        // setDataSendToChild(p)
    }

    const sendDataToChild = (data) => {
        // setPurchasedItemData(data);
    };


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
                <PurchasedItemModal sendDataToParent={sendDataToChild} dataSendToChild={dataSendToChild} />

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