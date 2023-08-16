import React from 'react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineModeEditOutline, MdOutlineDelete } from 'react-icons/md';

const EditDeleteUnitmaster = (params) => {

    return (
        <div className='d-flex'>
            <MdOutlineModeEditOutline className='grid-icons ms-2' fill='#800080' color='#371CBF' />
            <MdOutlineDelete className='grid-icons ms-2' fill='#FF0000' />
        </div>)

}


export default EditDeleteUnitmaster