import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { getBasicInfo, getBasicInfoByEmpCode, getBasicInfoByName } from '../services/basicInfoServices';

const EmpNameCode = ({ sendEmpCodeToParent, propCode, propName, propIsUpdate }) => {

    const inputFields = {
        empCode: "",
        empName: "",
    }
    const [empNameCode, setEmpNameCode] = useState(inputFields)
    const [empNames, setEmpNames] = useState([])

    console.log(propIsUpdate)
    console.log(propCode, propName)

    useEffect(() => {

        if (propIsUpdate) {
            updateGettingNameCode()
        } else {
            getBasicInfo().then((res) => {
                setEmpNames(res.data)
            })
        }

    }, [])

    const updateGettingNameCode = async () => {

        // logic needs to review again
        await getBasicInfo().then((res) => {
            console.log(res.data)
            setEmpNames(res.data)
            if (propCode > 0) {
                getBasicInfoByEmpCode(propCode).then((resN) => {
                    console.log(resN.data)
                    const resObj = res.data.find((item) => {
                        return item.EmpCode === propCode
                    })
                    console.log(resObj)
                    if (resN.data.length) {
                        setEmpNameCode({ ...resN.data[0], "empName": resObj.FirstName, "empCode": propCode })
                    }
                })
            }
        })


    }

    const funGetBasicInfoByName = (data) => {
        getBasicInfoByName(data).then((res) => {
            const updateEmpCode = res.data[0].EmpCode
            setEmpNameCode({
                ...empNameCode, "empName": data, "empCode": updateEmpCode
            })
            sendEmpCodeToParent && sendEmpCodeToParent(updateEmpCode, data)
        })
    }

    const handleChange = (e, setFieldValue) => {
        const { value, name } = e.target
        if (name === "empName") {
            setFieldValue("empName", value)
            value === "" ? setEmpNameCode({
                ...empNameCode, "empName": "Select Name", "empCode": ""
            }) : funGetBasicInfoByName(value)
            value && funGetBasicInfoByName(value)
        }
    }

    const validationSchema = Yup.object({
        empCode: Yup.string().required('*Required'),
        empName: Yup.string().required('*Required'),
    })

    return (

        <Formik
            initialValues={empNameCode}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div className='container pb-3 mb-3 mx-auto'>

                            <div className='row mb-1'>
                                <div className='col-2 form-label'>Employee Name</div>
                                <div className='col-3 d-flex'>
                                    <Field
                                        className="form-select"
                                        component="select"
                                        name="empName"
                                        onChange={(e) => { handleChange(e, setFieldValue) }}
                                    >
                                        <option value="">Select Name</option>
                                        {
                                            empNames.map((item, index) => {
                                                return <option
                                                    key={index}
                                                    value={item.FirstName}
                                                >
                                                    {item.FirstName}
                                                </option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='empName' />
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>Employee Code</div>
                                <div className='col-3 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="empCode"
                                        value={empNameCode.empCode}
                                        disabled
                                    >
                                    </Field>
                                    <ErrorMessage className="text-danger ms-2" component="div" name='empCode' />
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EmpNameCode