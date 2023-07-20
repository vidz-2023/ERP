import React, { useState } from 'react'

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteBasicInfo } from '../../../../services/basicInfoServices';
import { deleteAddressInfo, getAddressDataByEmpCode } from '../../../../services/addressService';

const DeleteEditButtonStaffMaster = (params) => {
    const navigate = useNavigate()
    const [addData,setAddData] = useState([])
    const addressDataArr = []
    const handleDelete = async (p) => {
        console.log(params)
        console.log(p.data.empCode)
        
        await getAddressDataByEmpCode(p.data.empCode).then((res) =>
          //setAddData(res.data)
         addressDataArr.push(res.data)
        )
        const arr  = []
        arr.push(...addressDataArr[0])
       
        deleteBasicInfo(p.data.id)
          p.funGetBasicInfo()
        if(arr != null)
        {
             deleteAddressInfo(arr)
        }
        
         
    }

    
    const handleEdit = (p) => {
        console.log(p.data.id)
        navigate(`/staffMaster/${p.data.id}`)
    }

    return (<div>
        <button className='btn btn-info me-2' onClick={() => { handleEdit(params) }}><FaEdit /></button>
        <button className='btn btn-danger' onClick={() => { handleDelete(params) }}><FaTrash /></button>
    </div>)

}


export default DeleteEditButtonStaffMaster