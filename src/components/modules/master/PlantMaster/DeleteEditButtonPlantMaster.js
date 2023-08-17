import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deletePlantMaster, getPlantMaster } from '../../../../services/PlantMasterServices';

const DeleteEditButtonPlantMaster = (params) => {

    const navigate = useNavigate()
    const handleDelete = (p) => {
        deletePlantMaster(p.data.id)
        getPlantMaster().then()
        p.GetPlant()
    }

    const handleEdit = (p) => {
       navigate(`/PlantMaster/${p.data.id}`)
    }

    //in table field display 

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}

export default DeleteEditButtonPlantMaster

