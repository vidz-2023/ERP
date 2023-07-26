import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { getEmpByEmpCode, getEmpInfoByName, getMonthlyAttendance } from '../../../../services/SalarySlipServices';


export const Salaryslip = () => {

    const inputfields = {
        month: "",
        Year: "",
        empcode: "",
        Name: "",
        MonthDays: "",
        HolidayDays: "",
        Holidays: "",
        WorkingDays: "",
        PaidLeaves: "",
        unpaidleaves: "",
        OTHours: "",
        PaidDays: "",
        Branch: "",
        Department: "",
        Designation:"",
        JoiningDate: ""

    }

    const [empSalarySlip, setEmpSalarySlip] = useState(inputfields)
    const [Name, setName] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const { empcode } = useParams()


    const handleSubmit = (values) => {
        console.log(values)
    }

    useEffect(() => {
        getEmpByEmpCodes(empcode)
    }, [])

    const validationSchema = Yup.object({
        Name: Yup.string().required('*Required'),
        empcode: Yup.string().required('*Required'),
        Designation: Yup.string().required('*Required'),
        Department: Yup.string().required('*Required')
    })

    const handleEmployeeName = (option, setFieldValue) => {
        setFieldValue("Name", option.target.value)
        option.target.value && funGetBasicInfoByName(option.target.value)
    }

    const funGetBasicInfoByName = (data) => {
        getEmpInfoByName(data).then((res) => {
            console.log(res.data)
            const updateEmpCode = res.data
            console.log(updateEmpCode)
            getEmpByEmpCodes(updateEmpCode)
        })
    }

    const getEmpByEmpCodes = (empcode) => {
        getMonthlyAttendance().then((resName) => {
            console.log(resName)
            setName(resName.data)
            if (empcode > 0) {
                getEmpByEmpCode(empcode).then((res) => {
                    console.log(res.data)
                    const resObj = resName.data.find((item) => {
                        return item.EmpCode === empcode
                    })
                    console.log(resObj)
                    if (res.data.length) {
                        setEmpSalarySlip({ ...res.data, "Name": resObj.Name })
                        setIsUpdate(true)
                    } else {
                        setEmpSalarySlip({ ...inputfields, "Name": resObj.Name, "empcode": empcode })
                        setIsUpdate(false)
                    }
                })
            }
        })
    }

    return (
        <Formik
            initialValues={empSalarySlip}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ isSubmitting, setFieldValue }) => {

                return (
                    <Form>
                        <>
                            <div class="container mt-5 mb-5" style={{ border: "1px solid black" }}>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center lh-1 mb-2">
                                            <h4 class="fw-bold text-center">Company Name</h4> <span class="fw-bold">Salary slip for Mar 2023</span>
                                        </div>
                                        {/* <div class="d-flex justify-content-end"> <span>Working Branch:ROHINI</span> </div> */}
                                        <div class="row">

                                            <div className='row mb-1'>
                                                <div className='col-2 form-label'>Employee Name</div>
                                                <div className='col-3 d-flex'>
                                                    <Field
                                                        className="form-select"
                                                        component="select"
                                                        name="Name"
                                                        onChange={(e) => { handleEmployeeName(e, setFieldValue) }}
                                                    >
                                                        <option value="">Select Name</option>
                                                        {
                                                            Name.map((item) => {
                                                                return <option
                                                                    key={item.id}
                                                                    value={item.Name}
                                                                >
                                                                    {item.Name}
                                                                </option>
                                                            }
                                                            )}
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='Name' />
                                                </div>
                                                <div className='col-2'></div>
                                                <div className='col-2 form-label'>Department</div>
                                                <div className='col-3 d-flex'>
                                                <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="Department"
                                                        
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='Department' />
                                                </div>
                                            </div>
                                            <div className='row mb-1'>
                                                <div className='col-2 form-label'>Employee Code</div>
                                                <div className='col-3 d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="empcode"
                                                        
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger ms-2" component="div" name='empcode' />
                                                </div>
                                                <div className='col-2'></div>
                                                <div className='col-2 form-label'>Bank Name</div>
                                                <div className='col-3 d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="Bank"

                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='Bank' />
                                                </div>
                                            </div>
                                            <div className='row mb-1'>
                                                <div className='col-2 form-label'>Designation</div>
                                                <div className='col-3 d-flex'>
                                                <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="Designation"
                                                       
                                                    >
                                                    </Field>
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='Designation' />
                                                </div>
                                                <div className='col-2'></div>
                                                <div className='col-2 form-label'>A/c No</div>
                                                <div className='col-3  d-flex'>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="acno"

                                                    />
                                                    <ErrorMessage className="text-danger  ms-2" component="div" name='acno' />
                                                </div>
                                            </div>

                                            {/* <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">EMP Name</span>
                            <Field
                                            className="form-select"
                                            component="select"
                                            name="empName"
                                        >
                                            <option value="">Select Name</option>
                                            {
                                                empName.map((item) => {
                                                    return <option
                                                        key={item.id}
                                                        value={item.FirstName}
                                                    >
                                                        {item.FirstName}
                                                    </option>
                                                }
                                                )}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='empName' />
                        </div></div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder d-flex justify-content-end">Department</span> <small class="ms-3"></small> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">EMP No.</span> <small class="ms-3"></small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder d-flex justify-content-end">Bank Name</span> <small class="ms-3"></small> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div> <span class="fw-bolder">Designation</span> <small class="ms-3"></small> </div>
                        </div>
                        <div class="col-md-6">
                            <div> <span class="fw-bolder d-flex justify-content-end">A/C No</span> <small class="ms-3"></small> </div>
                        </div>
                    </div>
                 
                </div> */}
                                            <table class="mt-4 table table-bordered">
                                                <thead class="bg-dark text-white">
                                                    <tr>
                                                        <th scope="col">Earnings</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Deductions</th>
                                                        <th scope="col">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Basic Salary</td>
                                                        <td>25200</td>
                                                        <td>EPF</td>
                                                        <td>1800.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>HouseRent Allowance</td>
                                                        <td>9408</td>
                                                        <td>Health Insurance</td>
                                                        <td>500</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conveyance Allowance</td>
                                                        <td>1493</td>
                                                        <td>Professional Tax</td>
                                                        <td>200</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Medical Allowances</td>
                                                        <td>1167</td>
                                                        <td>TDS</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Special Allowances</td>
                                                        <td>18732</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>

                                                    <tr class="border-top">
                                                        <td>Gross Salary</td>
                                                        <th scope='row'>56000</th>
                                                        <td>Total Deductions</td>
                                                        <th scope='row'>2500</th>
                                                    </tr>

                                                    <tr class="border-top">
                                                        <td colspan="2" class="fw-bolder" style={{ textAlign: 'center' }}>Net Pay</td>
                                                        <td colspan="2" class="fw-bolder" style={{ textAlign: 'center' }}>53500</td>
                                                    </tr>
                                                    <tr class="border-top">
                                                        <td colspan="2" style={{ textAlign: 'right' }}>Amount In Words:</td>
                                                        <td colspan="2">Fifty Three Thousand Five Hundred Only</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>

                    </Form>
                )
            }}
        </Formik>

    )
}
