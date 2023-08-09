import React from 'react'

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteCompanyMaster, getCompanyMaster } from '../../../../services/CompanyMasterServices';


const DeleteEditButtonCompanyMaster = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteCompanyMaster(p.data.id)
        getCompanyMaster().then()
        p.GetCompany()
    }

    const handleEdit = (p) => {
        navigate(`/companyMaster/${p.data.id}`)
    }

    //in table field display
    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}

export default DeleteEditButtonCompanyMaster