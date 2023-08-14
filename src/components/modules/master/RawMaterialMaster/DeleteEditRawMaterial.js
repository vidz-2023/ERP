import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteRawMaterialData, getRawMaterialData } from "../../../../services/rawMaterialService";

const DeleteEditRawMaterial = (params) => {
  const navigate = useNavigate();

  const handleDelete = (p) => {
    console.log(p.data.id)
    deleteRawMaterialData(p.data.id)
    alert(`${p.data.materialName} get deleted`)
    getRawMaterialData().then()
    p.funGetRawInfo()
  }

  const handleEdit = (p) => {
    navigate(`/rawMaterial/${p.data.materialId}`)
  }

  return (
    <div>
        <div>
            <button className='btn btn-info me-2' onClick={() => {handleEdit(params)}}><FaEdit /></button>
            <button className='btn btn-danger me-2' onClick={() => {handleDelete(params)}}><FaTrash /></button>
        </div>
    </div>
  )
};

export default DeleteEditRawMaterial;
