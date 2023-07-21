import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { addSalary, getSalary, getSalaryById, getSalaryStructureByEmpCode, updateSalaryDetail } from '../../../../services/salaryService';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { getBasicInfo, getBasicInfoByEmpCode, getBasicInfoByName } from '../../../../services/basicInfoServices';
import { useNavigate, useParams } from 'react-router-dom';
import EmpNameCode from '../../../../share/EmpNameCode';

function SalaryStructureWithSharedComponent() {
    const inputFields = {
        empCode: "",
        empName: "",
        EffectiveFrom: "",
        Basic: "",
        ESIEmployeer: "",
        PFEmployeer: "",
        LWFEmployeer: "",
        CTC: "",
        ESIEmployee: "",
        PFEmployee: "",
        TDS: "",
        ProfessionalTax: "",
        LWFEmployee: "",
        InHand: ""
    }
    const navigate = useNavigate()
    const { empcode } = useParams()
    const [empSalaryData, setEmpSalaryData] = useState(inputFields)
    const [empName, setEmpName] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)

    let grossSal = 0, inHandSal = 0
    const [grossSalary, setGrossSalary] = useState(0)
    const [basicSalary, setBasicSalary] = useState(0)
    const [esiEmployeer, setEsiEmployeer] = useState(0)
    const [pfEmployeer, setPFEmployeer] = useState(0)
    const [lwfEmployeer, setLWFEmployeer] = useState(0)
    const [professionalTax, setProfessionalTax] = useState(0)
    const [tds, setTDS] = useState(0)
    const [shareEmpCode, setShareEmpCode] = useState("")
    const [sharedEmpName, setShareEmpName] = useState("")


    useEffect(() => {
        getEmpSalaryStructureDataByEmpCode(shareEmpCode, sharedEmpName)

    }, [sharedEmpName])

    const getEmpSalaryStructureDataByEmpCode = (sharedEmpCode, sharedEmpName) => {

        if (empcode > 0) {
            getEmpSalaryStructureUpdate(empcode, sharedEmpName)
        }
        else if (sharedEmpCode > 0) {
            getSalaryStructureByEmpCode(sharedEmpCode).then((res) => {
                console.log(res.data)
                if (res.data.length) {
                    setEmpSalaryData(res.data[0])
                    setIsUpdate(true)
                } else {
                    setEmpSalaryData({ ...inputFields, "empCode": sharedEmpCode })
                    setIsUpdate(false)
                }
            })
        } else {
            setEmpSalaryData({ ...inputFields, "empCode": sharedEmpCode })
            setIsUpdate(false)
        }
    }

    const getEmpSalaryStructureUpdate = (urlEmpCode, sharedEmpName) => {

        // getSalaryStructureByEmpCode(urlEmpCode).then((res) => {

        // })

        getBasicInfo().then((resName) => {
            setEmpName(resName.data)
            if (urlEmpCode > 0) {
                getSalaryStructureByEmpCode(urlEmpCode).then((res) => {
                    const resObj = resName.data.find((item) => {
                        return item.EmpCode === urlEmpCode
                    })
                    console.log(resObj)
                    if (res.data.length) {
                        setEmpSalaryData({ ...res.data[0], "empName": resObj.FirstName })
                        setIsUpdate(true)
                    } else {
                        setEmpSalaryData({ ...inputFields, "empName": resObj.FirstName, "empCode": urlEmpCode })
                        setIsUpdate(false)
                    }
                })
            } else {
                setEmpSalaryData({ ...empSalaryData, "empCode": urlEmpCode })
                setIsUpdate(false)
            }
        })

        // })

    }


    // const getEmpSalaryStructureDataByEmpCode = (empcode) => {
    //     getBasicInfo().then((resName) => {
    //         setEmpName(resName.data)
    //         if (empcode > 0) {
    //             getSalaryStructureByEmpCode(empcode).then((res) => {
    //                 const resObj = resName.data.find((item) => {
    //                     return item.EmpCode === empcode
    //                 })
    //                 if (res.data.length) {
    //                     setEmpSalaryData({ ...res.data[0], "empName": resObj.FirstName })
    //                     setIsUpdate(true)
    //                 } else {
    //                     setEmpSalaryData({ ...inputFields, "empName": resObj.FirstName, "empCode": empcode })
    //                     setIsUpdate(false)
    //                 }
    //             })
    //         } else {
    //             setEmpSalaryData({ ...empSalaryData, "empCode": empcode })
    //             setIsUpdate(false)
    //         }
    //     })
    // }

    const handleSubmit = (values) => {
        console.log(values)
        delete values.empName
        if (isUpdate) {
            updateSalaryDetail(values).then((res) => {
                navigate("/salary-data")
            })
        } else {
            addSalary(values).then((res) => {
                navigate("/salary-data")
            })
        }
    }

    const validationSchema = Yup.object({
        Basic: Yup.number().required('*Required').min(4, "Min 4 digits").min(0, "Only positive value"),
        empCode: Yup.string().required('*Required'),
        empName: Yup.string().required('*Required'),
        EffectiveFrom: Yup.string().required('*Required'),
        ESIEmployeer: Yup.number().required('*Required').min(0, "Only positive value"),
        PFEmployeer: Yup.number().required('*Required').min(0, "Only positive value"),
        LWFEmployeer: Yup.number().required('*Required').min(0, "Only positive value"),
        CTC: Yup.number().required('*Required').min(0, "Only positive value"),
        ESIEmployee: Yup.number().required('*Required').min(0, "Only positive value"),
        PFEmployee: Yup.number().required('*Required').min(0, "Only positive value"),
        TDS: Yup.number().required('*Required').min(0, "Only positive value"),
        ProfessionalTax: Yup.number().required('*Required').min(0, "Only positive value"),
        LWFEmployee: Yup.number().required('*Required').min(0, "Only positive value"),
        InHand: Yup.number().required('*Required').min(0, "Only positive value")
    })

    const funGetBasicInfoByName = (data) => {
        getBasicInfoByName(data).then((res) => {
            const updateEmpCode = res.data[0].EmpCode
            getEmpSalaryStructureDataByEmpCode(updateEmpCode)
        })
    }

    const handleChange = (e, setFieldValue) => {
        const { value, name } = e.target

        if (e.target.name === "empName") {
            setFieldValue("empName", value)
            value && funGetBasicInfoByName(value)
        } else {
            switch (e.target.name) {
                case "LWFEmployeer":
                    grossSal = parseInt(basicSalary) + parseInt(value) + parseInt(esiEmployeer) + parseInt(pfEmployeer)

                    setGrossSalary(grossSal)
                    setLWFEmployeer(value)
                    setEmpSalaryData({
                        ...empSalaryData,
                        "LWFEmployeer": value,
                        "LWFEmployee": value,
                        "CTC": grossSal * 12,
                    })

                    break;
                case "ESIEmployeer":
                    grossSal = parseInt(basicSalary) + parseInt(lwfEmployeer) + parseInt(value) + parseInt(pfEmployeer)
                    setGrossSalary(grossSal)
                    setEsiEmployeer(value)
                    setEmpSalaryData({
                        ...empSalaryData,
                        "ESIEmployeer": value,
                        "ESIEmployee": value,
                        "CTC": grossSal * 12,
                    })

                    break;
                case "PFEmployeer":
                    grossSal = parseInt(basicSalary) + parseInt(lwfEmployeer) + parseInt(esiEmployeer) + parseInt(value)
                    inHandSal = basicSalary - (parseInt(professionalTax) + parseInt(tds))

                    setGrossSalary(grossSal)
                    setPFEmployeer(value)
                    setEmpSalaryData({
                        ...empSalaryData,
                        "PFEmployeer": value,
                        "PFEmployee": value,
                        "CTC": grossSal * 12,
                    })
                    break;

                case "Basic":
                    grossSal = parseInt(value) + parseInt(lwfEmployeer) + parseInt(esiEmployeer) + parseInt(pfEmployeer)
                    inHandSal = grossSal - (parseInt(lwfEmployeer) + parseInt(esiEmployeer) + parseInt(pfEmployeer) + parseInt(professionalTax) + parseInt(tds))
                    setGrossSalary(grossSal)
                    setBasicSalary(value)
                    setEmpSalaryData({
                        ...empSalaryData,
                        "Basic": value,
                        "CTC": grossSal * 12,
                        "InHand": inHandSal
                    })
                    break;

                case "ProfessionalTax":
                    setProfessionalTax(value)
                    inHandSal = basicSalary - (parseInt(value) + parseInt(tds))
                    setEmpSalaryData({
                        ...empSalaryData,
                        "ProfessionalTax": value,
                        "InHand": inHandSal
                    })
                    break;

                case "TDS":
                    setTDS(value)
                    inHandSal = basicSalary - (parseInt(professionalTax) + parseInt(value))
                    setEmpSalaryData({
                        ...empSalaryData,
                        "TDS": value,
                        "InHand": inHandSal
                    })
                    break;

                default:
                    setEmpSalaryData({ ...empSalaryData, [name]: value })
            }
        }
    }

    const sendEmpCodeToParent = (empCode, name) => {
        setShareEmpCode(empCode)
        setShareEmpName(name)
    }

    return (

        <Formik
            initialValues={empSalaryData}
            onSubmit={handleSubmit}
            // validationSchema={validationSchema}
            enableReinitialize
        >
            {({ isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div className='container pb-3 mb-3 mx-auto'>
                            <div className='row mt-5'>
                                <div className='col-12'>
                                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                                        <div className='m-2'>
                                            <FaBook className='me-2' />Salary Structure
                                        </div>
                                    </h4>
                                </div>
                            </div>
                            <div className='rounded'>
                                {/*   <div className='row mb-1'>
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
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>Employee Code</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="empCode"
                                            value={empSalaryData.empCode}
                                            disabled
                                        >
                                        </Field>
                                        <ErrorMessage className="text-danger ms-2" component="div" name='empCode' />
                                    </div>
                                            </div>*/}
                                {console.log(empSalaryData.empName, empSalaryData.empCode, isUpdate)}
                                <EmpNameCode
                                    sendEmpCodeToParent={sendEmpCodeToParent}
                                    propName={empSalaryData.empName}
                                    propCode={empSalaryData.empCode}
                                    propIsUpdate={isUpdate}
                                // propName={"Atishay"}
                                // propCode={"00003"}
                                // propIsUpdate={true}

                                />

                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>Effective From</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type='date'
                                            name="EffectiveFrom"
                                            value={empSalaryData.EffectiveFrom}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='EffectiveFrom' />
                                    </div>

                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>Basic</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            name="Basic"
                                            placeholder="&#8377;0.00"
                                            value={empSalaryData.Basic}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Basic' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>LWF Employer</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="LWFEmployeer"
                                            value={empSalaryData.LWFEmployeer}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='LWFEmployeer' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>LWF Employee</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="LWFEmployee"
                                            value={empSalaryData.LWFEmployee}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='LWFEmployee' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>PF Employer</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="PFEmployeer"
                                            value={empSalaryData.PFEmployeer}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='PFEmployeer' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>PF Employee</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="PFEmployee"
                                            value={empSalaryData.PFEmployee}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='PFEmployee' />
                                    </div>
                                </div>

                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>ESI Employer</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="ESIEmployeer"
                                            value={empSalaryData.ESIEmployeer}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='ESIEmployeer' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>ESI Employee</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="ESIEmployee"
                                            value={empSalaryData.ESIEmployee}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='ESIEmployee' />
                                    </div>
                                </div>

                                <div className='row mb-1'>
                                    <div className='col-2 form-label'><b>CTC (Yearly)</b></div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="CTC"
                                            value={empSalaryData.CTC}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2 ms-2" component="div" name='CTC' />
                                    </div>

                                    <div className='col-2'></div>

                                    <div className='col-2 form-label'><b>Gross Salary (Monthly)</b></div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="grossSalary"
                                            value={grossSalary}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2 ms-2" component="div" name='CTC' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>Professional Tax</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="ProfessionalTax"
                                            value={empSalaryData.ProfessionalTax}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='ProfessionalTax' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>TDS</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="TDS"
                                            value={empSalaryData.TDS}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='TDS' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label fw-bold'>In Hand (Monthly)</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            placeholder="&#8377;0.00"
                                            name="InHand"
                                            value={empSalaryData.InHand}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='InHand' />
                                    </div>
                                </div>
                                <button className="btn btn-info w-100 my-4 " type='submit'>Submit</button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SalaryStructureWithSharedComponent