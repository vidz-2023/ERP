import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";

const PurchaseView = (params) => {
    const navigate = useNavigate()

    const handleView = (p) => {
        navigate(`/goods-receipt/${p.data.pId}`)
    }

    return (
        <div>
            <button className='btn btn-info mb-1' onClick={() => { handleView(params) }}><FaEdit /></button>
        </div>
    )
}

export default PurchaseView