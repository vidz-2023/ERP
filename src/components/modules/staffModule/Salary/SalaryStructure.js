import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { addSalary, getSalary } from '../../../../services/salaryService';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

function SalaryStructure() {
    const inputFields = {
        empCode: "",
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
    const [salaryStruc, setSalaryStruc] = useState({})

    useEffect(() => {
        getSalary().then((res) =>
            setSalaryStruc(res.data[0])
        )
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
        addSalary(values).then((res) => console.log(res))
    }

    const validationSchema = Yup.object({
        Basic: Yup.number().required('*Required').min(4, "Min 4 digits"),
        empCode: Yup.string().required('*Required'),
        EffectiveFrom: Yup.string().required('*Required'),
        ESIEmployeer: Yup.number().required('*Required'),
        PFEmployeer: Yup.number().required('*Required'),
        LWFEmployeer: Yup.number().required('*Required'),
        CTC: Yup.number().required('*Required'),
        ESIEmployee: Yup.number().required('*Required'),
        PFEmployee: Yup.number().required('*Required'),
        TDS: Yup.number().required('*Required'),
        ProfessionalTax: Yup.number().required('*Required'),
        LWFEmployee: Yup.number().required('*Required'),
        InHand: Yup.number().required('*Required')
    })


    return (
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

            <div className='w-75 mx-auto p-5 rounded'>
                <Formik initialValues={inputFields} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className='row mb-3'>
                                <div className='col-4 form-label'>Effective From</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type='date'
                                        name="EffectiveFrom"
                                    // value={salaryStruc.EffectiveFrom}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='EffectiveFrom' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4'><h6>Description</h6></div>
                                <div className='col-4'><h6>Amount</h6></div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>Employee Code</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        name="empCode"
                                        placeholder="00000"
                                    // value={salaryStruc.Basic}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='empCode' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>Basic</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        name="Basic"
                                        placeholder="&#8377;0.00"
                                    // value={salaryStruc.Basic}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='Basic' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>ESI Employer</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="ESIEmployeer"
                                    // value={salaryStruc.ESIEmployeer}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='ESIEmployeer' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>PF Employer</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="PFEmployeer"
                                    // value={salaryStruc.PFEmployeer}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='PFEmployeer' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>LWF Employer</div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="LWFEmployeer"
                                    // value={salaryStruc.LWFEmployeer}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='LWFEmployeer' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'><b>CTC</b></div>
                                <div className='col-8 d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="CTC"
                                    // value={salaryStruc.CTC} 
                                    />
                                    <ErrorMessage className="text-danger  ms-2 ms-2" component="div" name='CTC' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>ESI Employee</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="ESIEmployee"
                                    // value={salaryStruc.ESIEmployee}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='ESIEmployee' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>PF Employee</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="PFEmployee"
                                    // value={salaryStruc.PFEmployee}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='PFEmployee' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>TDS</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="TDS"
                                    // value={salaryStruc.TDS}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='TDS' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>Professional Tax</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="ProfessionalTax"
                                    // value={salaryStruc.ProfessionalTax}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='ProfessionalTax' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label'>LWF Employee</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="LWFEmployee"
                                    // value={salaryStruc.LWFEmployee}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='LWFEmployee' />
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-4 form-label fw-bold'>In Hand</div>
                                <div className='col-8  d-flex'>
                                    <Field
                                        className="form-control"
                                        type="number"
                                        placeholder="&#8377;0.00"
                                        name="InHand"
                                    // value={salaryStruc.InHand}
                                    />
                                    <ErrorMessage className="text-danger  ms-2" component="div" name='InHand' />
                                </div>
                            </div>

                            <button className="btn btn-info m-4 w-75" type='submit'>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SalaryStructure