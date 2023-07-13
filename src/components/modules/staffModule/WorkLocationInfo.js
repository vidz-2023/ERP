import React from 'react'
import { FaBook, FaEdit } from "react-icons/fa";
function WorkLocationInfo() {
    const selectOpt = ["A", "B", "C"]

    return (

        <div className='contianer mx-auto'>
            <fieldset>
                <div className='m-5'>
                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                        <div className='m-2'>
                            <FaBook className='me-2' />Posting and Custom Field
                        </div>
                    </h4>
                    <div className='w-75 mx-auto'>
                        <div className='row mb-1'>
                            <div className='col-2 form-label'>
                                Effective From
                            </div>
                            <div className='col-3'>
                                <input className="form-control" type='date' />
                            </div>
                            <div className='col-2'></div>
                            <div className='col-2 form-label'>
                                Designation
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-1'>
                            <div className='col-2 form-label'>
                                Branch
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                            <div className='col-2'></div>
                            <div className='col-2 form-label'>
                                Category
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-1'>
                            <div className='col-2 form-label'>
                                Department
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                            <div className='col-2'></div>
                            <div className='col-2 form-label'>
                                Employee Shift
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-1'>
                            <div className='col-2 form-label'>
                                Late In
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                            <div className='col-2'></div>
                            <div className='col-2 form-label'>
                                Early Out
                            </div>
                            <div className='col-3'>
                                <div class="input-group">
                                    <select class="form-select">
                                        {selectOpt.map((item) => <option>{item}</option>)}
                                    </select>
                                    <span class="input-group-btn">
                                        <button className='btn btn-info'><FaEdit /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div className='m-5'>
                <h4 className='text-info w-100 mb-3 text-center border border-info-subtle mt-3'>
                    <div className='m-2'>
                        <FaBook className='me-2' />Custom Fields
                    </div>
                </h4>
                <div className='row w-75 mx-auto'>
                    <div className='col-4'>Loan Amount</div>
                    <div className='col-8'><input className='form-control' type="text" /></div>
                </div>
            </div>
        </div>



    )
}

export default WorkLocationInfo