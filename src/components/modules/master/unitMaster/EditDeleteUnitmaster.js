import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineModeEditOutline, MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deleteUnitMaster, getUnitMaster } from '../../../../services/unitMasterServices';


const EditDeleteUnitmaster = (params) => {
    const navigate = useNavigate()
    const handleDelete = (p) => {
        deleteUnitMaster(p.data.id)
        getUnitMaster().then()
        p.GetMaster()
    }

    const handleEdit = (p) => {
        navigate(`/unitMaster/${p.data.id}`)
    }
    return (
        <div className='d-flex'>

            <MdOutlineModeEditOutline
                className='grid-icons ms-2'
                fill='#800080'
                color='#371CBF'
                onClick={() => { handleEdit(params) }}
            />

            <MdOutlineDelete
                className='grid-icons ms-2'
                fill='#FF0000'
                onClick={() => { handleDelete(params) }}
            />
        </div>)

}


export default EditDeleteUnitmaster