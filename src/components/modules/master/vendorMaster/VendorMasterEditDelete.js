import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteVendorMaster, getVendorMaster } from '../../../../services/vendorMasterServices';

function VendorMasterEditDelete(params) {
 
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteVendorMaster(p.data.id)
        getVendorMaster().then()
        p.GetMaster()
    }

    const handleEdit = (p) => {
        navigate(`/vendorMaster/${p.data.id}`)
    }

    return (
    <div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)
}

export default VendorMasterEditDelete