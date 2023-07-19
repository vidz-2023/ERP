import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { getBasicInfo, getBasicInfoByName } from '../../../../services/basicInfoServices';
import { getBranches, getCategories, getDepartments, getDesignations, getEmployeeShifts } from '../../../../services/masterServices';
import { addWorkLocation, getWorkLocationByEmpCode, getWorkLocationById, updateWorkLocationDetail } from '../../../../services/workLocationServices';
import { useNavigate, useParams } from 'react-router-dom';

function WorkLocationInfo() {


    const [empName, setEmpName] = useState([])
    const yesNo = ["Yes", "No"]
    const [designation, setDesignation] = useState([])
    const [category, setCategory] = useState([])
    const [branch, setBranch] = useState([])
    const [department, setDepartment] = useState([])
    const [employeeShift, setEmployeeShift] = useState([])
    const navigate = useNavigate()
    const { empcode } = useParams()

    const initialFields = {
        empCode: "",
        empName: "",
        EffectiveFrom: "",
        Branch: "",
        Department: "",
        LateIn: "",
        Designation: "",
        Category: "",
        EmployeeShift: "",
        EarlyOut: "",
        LoanAmount: ""
    }

    const [workLocationData, setWorkLocationData] = useState(initialFields)
    const [isUpdate, setIsUpdate] = useState(false)

    const validationSchema = Yup.object({
        empCode: Yup.string().required('*Required'),
        empName: Yup.string().required('*Required'),
        EffectiveFrom: Yup.string().required('*Required'),
        Branch: Yup.string().required('*Required'),
        Department: Yup.string().required('*Required'),
        LateIn: Yup.string().required('*Required'),
        Designation: Yup.string().required('*Required'),
        Category: Yup.string().required('*Required'),
        EmployeeShift: Yup.string().required('*Required'),
        EarlyOut: Yup.string().required('*Required'),
        LoanAmount: Yup.number().required('*Required').min(0, "Only positive value")

    })

    useEffect(() => {
        getEmpWorklocationDataByEmpCode(empcode)
        getDesignations().then((res) => setDesignation(res.data))
        getCategories().then((res) => setCategory(res.data))
        getBranches().then((res) => setBranch(res.data))
        getDepartments().then((res) => setDepartment(res.data))
        getEmployeeShifts().then((res) => setEmployeeShift(res.data))
    }, [])

    const handleEmployeeName = (option, setFieldValue) => {
        setFieldValue("empName", option.target.value)
        option.target.value && funGetBasicInfoByName(option.target.value)
    }

    const funGetBasicInfoByName = (data) => {
        getBasicInfoByName(data).then((res) => {
            const updateEmpCode = res.data[0].EmpCode
            console.log(updateEmpCode)
            getEmpWorklocationDataByEmpCode(updateEmpCode)
        })
    }

    const getEmpWorklocationDataByEmpCode = (empcode) => {
        getBasicInfo().then((resName) => {
            console.log(resName.data)
            setEmpName(resName.data)
            if (empcode > 0) {
                getWorkLocationByEmpCode(empcode).then((res) => {
                    console.log(res.data)
                    const resObj = resName.data.find((item) => {
                        return item.EmpCode === empcode
                    })
                    // setWorkLocationData({ ...res.data[0], "empName": resObj.FirstName })
                    // setIsUpdate(true)
                    console.log(resObj)
                    if (res.data.length) {
                        setWorkLocationData({ ...res.data[0], "empName": resObj.FirstName })
                        setIsUpdate(true)
                    } else {
                        setWorkLocationData({ ...initialFields, "empName": resObj.FirstName, "empCode": empcode })
                        setIsUpdate(false)
                    }
                })
            }
        })
    }

    const handleSubmit = (values) => {
        console.log(values)
        delete values.empName
        if (isUpdate) {
            updateWorkLocationDetail(values).then((res) => {
                console.log(res.data)
                navigate("/worklocation-data")
            })

        } else {
            addWorkLocation(values).then((res) => {
                console.log(res.data);
                navigate("/worklocation-data")
            })
        }
    }


    return (
        <Formik
            initialValues={workLocationData}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ isSubmitting, setFieldValue, touched, handleBlur }) => (
                <Form>
                    <div className='container pb-3 mb-3 mx-auto'>
                        <div className='m-3'>
                            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                                <div className='m-2'>
                                    <FaBook className='me-2 ' />Posting and Custom Field
                                </div>
                            </h4>
                            <div className='row mb-1'>
                                <div className='col-2 form-label'>
                                    Employee Code
                                </div>
                                <div className='col-3 d-flex' >
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="empCode"
                                        // value={empCodeDis}
                                        value={workLocationData.empCode}
                                        disabled
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='empCode' />
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>Employee Name</div>
                                <div className='col-3 d-flex'>
                                    <Field
                                        className="form-select"
                                        name="empName"
                                        component="select"
                                        onChange={(e) => { handleEmployeeName(e, setFieldValue) }}

                                    >
                                        <option value="">Select.......</option>
                                        {empName.map((item) =>
                                            <option
                                                key={item.id}
                                                value={item.FirstName}
                                            >
                                                {item.FirstName}
                                            </option>)}
                                    </Field>
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='empName' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-2 form-label'>
                                    Effective From
                                </div>
                                <div className='col-3 d-flex'>
                                    <Field
                                        className="form-control"
                                        type='date'
                                        name="EffectiveFrom"
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='EffectiveFrom' />
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>
                                    Designation
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field className="form-select"
                                            component="select"
                                            name="Designation"
                                        >
                                            <option value="">Select.......</option>
                                            {designation.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item.Name}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Designation' />
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-1'>
                                <div className='col-2 form-label'>
                                    Branch
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="Branch"
                                        >
                                            <option value="">Select.......</option>
                                            {branch.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item.Name}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Branch' />
                                    </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>
                                    Category
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="Category"
                                        >
                                            <option value="">Select.......</option>
                                            {category.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item.Name}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Category' />
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-1'>
                                <div className='col-2 form-label'>
                                    Department
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="Department"
                                        >
                                            <option value="">Select.......</option>
                                            {department.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item.Name}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Department' />
                                    </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>
                                    Employee Shift
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="EmployeeShift"
                                        >
                                            <option value="">Select.......</option>
                                            {employeeShift.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item.Name}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='EmployeeShift' />
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-1'>
                                <div className='col-2 form-label'>
                                    Late In
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="LateIn"
                                        >
                                            <option value="">Select.......</option>
                                            {yesNo.map((item) => <option
                                                value={item.Name}
                                                key={item.id}
                                            >{item}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='LateIn' />
                                    </div>
                                </div>
                                <div className='col-2'></div>
                                <div className='col-2 form-label'>
                                    Early Out
                                </div>
                                <div className='col-3'>
                                    <div className="Field-group d-flex">
                                        <Field
                                            className="form-select"
                                            component="select"
                                            name="EarlyOut"
                                        >
                                            <option value="">Select.......</option>
                                            {yesNo.map((item) => <option value={item.Name}>{item}</option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='EarlyOut' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle mt-3'>
                                <div className='m-2'>
                                    <FaBook className='me-2' />Custom Fields
                                </div>
                            </h4>
                            <div className='row w-75 mx-auto'>
                                <div className='col-4'>Loan Amount</div>
                                <div className='col-8  mb-3 d-flex'>
                                    <Field className='form-control' type="text" name="LoanAmount" />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='LoanAmount' />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-info mb-3 w-100 " type='submit'>Submit</button>
                    </div >
                </Form>
            )}
        </Formik>


    )
}

export default WorkLocationInfo