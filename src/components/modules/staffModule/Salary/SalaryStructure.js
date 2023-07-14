import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { getSalary } from '../../../../services/salaryService';

function SalaryStructure() {
    // const initialSal = {
    //     "empCode": "00001",
    //     "EffectiveFrom": "",
    //     "Basic": "",
    //     "ESIEmployeer": "",
    //     "PFEmployeer": "",
    //     "LWFEmployeer": "",
    //     "CTC": "",
    //     "ESIEmployee": "",
    //     "PFEmployee": "",
    //     "TDS": "",
    //     "ProfessionalTax": "",
    //     "LWFEmployee": "",
    //     "InHand": ""
    // }
    const [salaryStruc, setSalaryStruc] = useState({})

    useEffect(() => {
        getSalary().then((res) =>

            setSalaryStruc(res.data[0])
        )
    }, [])
    console.log("salary structure" + salaryStruc)
    return (
        <div className='container pb-5 mb-5 mx-auto'>
            <div className='row mt-5'>
                <div className='col-12'>
                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                        <div className='m-2'>
                            <FaBook className='me-2' />Salary Structure
                        </div>
                    </h4>
                </div>
            </div>

            <div className='w-75 mx-auto'>
                <div className='row mb-1'>
                    <div className='col-6 form-label'>Effective From</div>
                    <div className='col-6'>
                        <input
                            className="form-control"
                            type='date'
                            value={salaryStruc.EffectiveFrom}
                        />
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4'><h6>Description</h6></div>
                    <div className='col-4'><h6>Alias</h6></div>
                    <div className='col-4'><h6>Amount</h6></div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>Basic</div>
                    <div className='col-4'>B</div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.Basic}
                        />
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>ESI Employer</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.ESIEmployeer}
                        />
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>PF Employer</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.PFEmployeer}
                        />
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>LWF Employer</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.LWFEmployeer}
                        /></div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'><b>CTC</b></div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.CTC} />
                    </div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>ESI Employee</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.ESIEmployee}
                        /></div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>PF Employee</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.PFEmployee}
                        /></div>
                </div>

                <div className='row mb-1'>
                    <div className='col-4 form-label'>TDS</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.TDS}
                        /></div>
                </div>


                <div className='row mb-1'>
                    <div className='col-4 form-label'>Professional Tax</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.ProfessionalTax}
                        /></div>
                </div>


                <div className='row mb-1'>
                    <div className='col-4 form-label'>LWF Employee</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.LWFEmployee}
                        /></div>
                </div>


                <div className='row mb-1'>
                    <div className='col-4 form-label fw-bold'>In Hand</div>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="&#8377;0.00"
                            value={salaryStruc.InHand} /></div>
                </div>
            </div>
        </div>
    )
}

export default SalaryStructure