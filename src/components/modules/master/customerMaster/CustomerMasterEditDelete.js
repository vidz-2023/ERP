import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteCustomerMaster, getCustomerMaster } from '../../../../services/customerMasterServices';

function CustomerMasterEditDelete(params) {

    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteCustomerMaster(p.data.id)
        getCustomerMaster().then()
       p.GetMaster()
    }

    const handleEdit = (p) => {
        navigate(`/customerMaster/${p.data.id}`)
    }

    return (
    <>
        <button className='btn btn-info me-2 ' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </>)
}

export default CustomerMasterEditDelete
