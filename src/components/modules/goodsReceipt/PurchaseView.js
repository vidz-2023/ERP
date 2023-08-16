import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";

const PurchaseView = (params) => {
    const navigate = useNavigate()

    const handleView = (p) => {
        navigate(`/goods-receipt/${p.data.pId}`)
    }

    return (
        <div>
            <button className='btn btn-info mb-1' onClick={() => { handleView(params) }}><FaRegEye /></button>
        </div>
    )
}

export default PurchaseView