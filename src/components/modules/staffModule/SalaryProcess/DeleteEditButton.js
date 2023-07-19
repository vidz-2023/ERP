import React from 'react'
import {  deleteSalaryProcess, getSalaryProcess, updateSalaryProcess } from '../../../../services/salaryService';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const DeleteEditButton = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteSalaryProcess(p.data.id)
        getSalaryProcess().then()
    }

    // const handleEdit = (p) => {
    //     // navigate(`/salaryprocess/${p.data.id}`)
    //     // updateSalaryProcess(p.data.id)
    //     // getSalaryProcess().then()
    //     //   return p.data.id;
    // }

    const handleEdit = (olddata) =>{
        console.log(olddata);
    }

    //in table field display
    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params.data) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButton