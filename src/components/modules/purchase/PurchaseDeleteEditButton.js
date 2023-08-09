import React from 'react'
import { deletePurchaseDetail, getPurchaseDetail } from '../../../services/purchaseMasterService';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PurchaseDeleteEditButton = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deletePurchaseDetail(p.data.id)
        getPurchaseDetail().then()
        p.funGetPurchase()
    }

    const handleEdit = (p) => {
        navigate(`/purchase-master/${p.data.pId}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}

export default PurchaseDeleteEditButton