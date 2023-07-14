import React from 'react'

//import icons
import { GiTakeMyMoney } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";

//import formik and yup
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SalaryProcessTable } from './SalaryProcessTable';

function SalaryProcess() {
    const Branch = ["BAN", "CHE", "HYD"]
    const dept = ["Develpment", "Logistics", "ITSupport"]
    const designation = ["Software Engineer", "Senior Developer", "Senior Software Developer"]
    const category = ["Project", "Support", "Lead"]

    const initialValue = {
        month: " ",
        year: " ",
        empcode:"",
        empname:"",
        paid:"",
        ctc:"",
        inhand:"",
        basic:"",
        leave:"",
        indemnity:"",
        bonus:"",
        loan:"",
        advance:"",
        tds:"",
        esi:"",
        pf:"",
        lwf:"",
        pt:"",
        net:"",
        branch:"",
        dept:"",
        designation:"",
        category:"",
        date:""
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        month: Yup.string().required('Month Is Required'),
        year: Yup.string().required('Year Is Required'),
        empcode: Yup.string().required('Employeecode Is Required'),
        empname: Yup.string().required('EmployeeName Is Required'),
        paid: Yup.string().required('PaidDays Is Required'),
        ctc: Yup.string().required('CTC Is Required'),
        inhand: Yup.string().required('InHand Is Required'),
        basic: Yup.string().required('BasicSalary Is Required'),
        leave: Yup.string().required('LeaveSalary Is Required'),
        indemnity: Yup.string().required('Indemnity Is Required'),
        bonus: Yup.string().required('Bonus Is Required'),
        loan: Yup.string().required('Loan Is Required'),
        advance: Yup.string().required('Advance Is Required'),
        tds: Yup.string().required('TDS Is Required'),
        esi: Yup.string().required('ESI Is Required'),
        pf: Yup.string().required('PF Is Required'),
        lwf: Yup.string().required('LWF Is Required'),
        pt: Yup.string().required('ProfessionalTax Is Required'),
        net: Yup.string().required('NetAmount Is Required'),
        branch: Yup.string().required('Branch Is Required'),
        dept: Yup.string().required('Department Is Required'),
        designation: Yup.string().required('Designation Is Required'),
        category: Yup.string().required('Category Is Required'),
        date: Yup.string().required('JoiningDate Is Required'),
    })

    return (
        <>

            <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className='contianer mx-auto'>
                            <fieldset>
                                <div className='m-3'>
                                    <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                                        <div className='m-2'>
                                            <GiTakeMyMoney className='me-2' />Salary Process
                                        </div>
                                    </h4>

                                    <div className='w-100 mx-auto'>
                                        <div className='row mb-1'>
                                            <div className='col-1 form-label'>
                                                Month
                                            </div>
                                            <div className='col-2'>
                                                <Field className="form-control" type='month' name='month' />
                                                <ErrorMessage name='month' />
                                            </div>

                                            <div className='col-1 form-label'>
                                                Year
                                            </div>
                                            <div className='col-2'>
                                                <div class="input-group">
                                                <Field className="form-control" type="number" placeholder="YYYY" min="1999" max="2023" name='year'/>
                                                <ErrorMessage name='year' />
                                                </div>
                                            </div>

                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Filter</button></div>
                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Display</button></div>
                                            <div className='col-2'><button type="button" className='w-50 btn btn-info'>Process</button></div>
                                        </div>
                                    </div>

                                    <h4 className='text-info w-100 mb-3 mt-5 text-center border border-info-subtle'>
                                        <div className='m-2'>
                                            <HiUserGroup className='me-2' />Employee Details
                                        </div>
                                    </h4>

                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Employee Code
                                            </div>
                                            <div className='col-3 text-danger'>
                                                <Field className="form-control" type='text' name='empcode'/>
                                                <ErrorMessage name='empcode' />
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Employee Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text'  name='empname'/>
                                                    <ErrorMessage name='empname' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Paid Days
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='paid'/>
                                                    <ErrorMessage name='paid'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                CTC
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='ctc'/>
                                                    <ErrorMessage name='ctc'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                In Hand
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text'  name='inhand'/>
                                                    <ErrorMessage name='inhand'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Basic Salary
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='basic'/>
                                                    <ErrorMessage name='basic'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Leave Salary
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='leave' />
                                                    <ErrorMessage name='leave'/>
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 form-label'>
                                                Indemnity
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='indemnity'/>
                                                    <ErrorMessage name='indemnity'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Bonus
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text'  name='bonus' />
                                                    <ErrorMessage name='bonus'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Loan
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='loan' />
                                                    <ErrorMessage name='loan'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Advance
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='advance'/>
                                                    <ErrorMessage name='advance'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                TDS
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='tds'/>
                                                    <ErrorMessage name='tds'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                ESI
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text'  name='esi'/>
                                                    <ErrorMessage name='esi'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                PF
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='pf' />
                                                    <ErrorMessage name='pf'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                LWF
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='lwf' />
                                                    <ErrorMessage name='lwf'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Professional Tax
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='pt'/>
                                                    <ErrorMessage name='pt'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Net Amount
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='text' name='net'/>
                                                    <ErrorMessage name='net'/>
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="branch" class="form-select">
                                                        {Branch.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Department
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="dept" class="form-select">
                                                        {dept.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='dept' />
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Designation
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="designation" class="form-select">
                                                        {designation.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='designation' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 form-label'>
                                                Category
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name='category' class="form-select">
                                                        {category.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='category' />
                                                </div>
                                            </div>

                                            <div className='col-2'></div>

                                            <div className='col-2 form-label'>
                                                Joining Date
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control" type='date'  name='date'/>
                                                    <ErrorMessage name='date' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-6'><button type="submit" className='w-50 btn btn-info m-3'>Save</button></div>
                                            <div className='col-6'><button type="button" className='w-50 btn btn-info m-3'>Cancel</button></div>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </Form>

                )}

            </Formik>

            <SalaryProcessTable />
        </>
    )
}

export default SalaryProcess