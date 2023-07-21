import React, { useEffect, useState } from 'react'
import { getBasicInfo } from '../services/basicInfoServices'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const EmpName = () => {

    const [empNames, setEmpNames] = useState([])
    // const [empNameObj, setEmpNameObj] = useState({})
    const [empNameS, setEmpNameS] = useState("")
    const [empCodeS, setEmpCodeS] = useState("")
    let names = []

    const initialValue = {
        empFirstName: ""
    }

    useEffect(() => {
        getBasicInfo().then((res) => {

            setEmpNames(res.data)
            // funGetAllNames()
        })
    }, [])

    const recieveEmployeeNameSelection = (empName, empCode) => {

    }

    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        recieveEmployeeNameSelection(value)
    }
    return (
        <div className='container'>

            <div className='row mb-1'>
                <div className='col-2 form-label'>Employee Name</div>
                <div className='col-3'>
                    <select
                        onChange={(e) => { handleChange(e) }}
                    >
                        {empNames.map((item) => <option value={item.FirstName}>{item.FirstName}</option>

                        )}
                    </select>
                </div>
                <div></div>

            </div>
        </div>
    )
}

export default EmpName