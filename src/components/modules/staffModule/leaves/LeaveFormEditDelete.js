import React, { useState } from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteLeaveForm, getLeaveForm } from '../../../../services/LeaveFormService';
import LeaveForm from './LeaveForm';

const LeaveFormEditDelete = (params) => {
    const [formData, setFormData] = useState([]);
    const [isForm, setIsForm] = useState(false)

    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteLeaveForm(p.data.id)
        console.log(p)
        getLeaveForm().then()
        p.GetLeave()
    }

    //This is method with ID
    const handleEdit = (p) => {
        navigate(`/leaveForm/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2 ' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
      
    </div>)
}

export default LeaveFormEditDelete