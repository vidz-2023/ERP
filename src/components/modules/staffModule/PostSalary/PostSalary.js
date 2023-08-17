import React, { useEffect, useState } from 'react'

//import formik and yup
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAttendanceData, getAttendanceEmpData } from '../../../../services/PostSalaryService';

function PostSalary() {

    //setinitialvalue
    const initialValue = {
        month: " ",
        year: " ",
        branch: "",
        date: "",
        empCode: ""
    }

    //dropdowns
    const Branch = ["BAN", "CHE", "HYD"]
    const Month = ["Jun", "Jul", "Aug"]
    const Year = ["2021", "2022", "2023"]

    const [showForm, setShowForm] = useState(false)
    const [PostSalaryValue, setPostSalaryValue] = useState(initialValue)
    const [AttendanceDisplayData, SetAttendanceDisplayData] = useState([])
    var AttendanceDummyDisData = [];


    const handleSubmit = (values) => {
        console.log(values)
    }

    //yup declare-display
    const validationSchema = Yup.object({
        month: Yup.string().required('*Required'),
        year: Yup.string().required('*Required'),
        branch: Yup.string().required('*Required'),
        date: Yup.string().required('*Required'),
        empCode: Yup.string().required('*Required'),
    })

    const handleShowForm = () => {
        setShowForm(true)
    }

    useEffect(() => {
        getAttendanceData().then(res => console.log(res.data))

    }, [])

    //Function Declration
    const onSalaryHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setPostSalaryValue({ ...PostSalaryValue, [name]: value })
        setFieldValue([name], value)
        getEmpAttendance(value)
    }

    const getEmpAttendance = (value) => {
        getAttendanceEmpData(value).then(res => {
            console.log(res.data)
            //AttendanceDummyDisData.push(res.data[0])
            // AttendanceDummyDisData = res.data[0]
            SetAttendanceDisplayData(res.data)
            // console.log(AttendanceDummyDisData)
            //console.log(AttendanceDisplayData)
        }
        )
    }

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
                                            Post Salary
                                        </div>
                                    </h4>


                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Month
                                            </div>
                                            <div className='col-3'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="month" class="form-select form-select-sm">
                                                        {Month.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='month' />
                                                </div>
                                            </div>


                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Year
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="year" class="form-select form-select-sm">
                                                        {Year.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='year' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Branch
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <div class="input-group text-danger">
                                                    <Field as="select" name="branch" class="form-select form-selects-sm">
                                                        {Branch.map((item) => <option>{item}</option>)}
                                                    </Field>
                                                    <ErrorMessage name='branch' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Date
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <div class="input-group text-danger">
                                                    <Field className="form-control form-control-sm" type='date' name='date' />
                                                    <ErrorMessage name='year' />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mb-1'>

                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                Employee Code
                                            </div>
                                            <div className='col-3 '>
                                                <div class=" mb-2 text-danger">
                                                    <Field

                                                        as="select"

                                                        name="empCode"

                                                        className="form-select form-selects-sm"

                                                        value={PostSalaryValue.empCode}

                                                        onChange={e => onSalaryHandlerChange(e, setFieldValue)}>

                                                        <option value="">Select...</option>

                                                        <option value="00001"> 00001</option>

                                                        <option value="00002"> 00002</option>

                                                        <option value="00003"> 00003</option>

                                                    </Field>
                                                    <ErrorMessage name='empCode' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-1'>
                                            <div className='col-2 col-form-label col-form-label-sm'>

                                            </div>
                                            <div className='col-3 mt-2'>
                                                <div class="input-group text-danger">
                                                    <button type="submit" className='w-50 btn btn-primary text-white m-3'>PostSalary</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </Form >
                )
                }
            </Formik >

            <div className='row'>
                <div className='col-3 form-label'>

                </div>
                <div className='col-4'>
                    <div class="input-group text-danger">
                        <button type="button" className='w-5 btn btn-primary text-white m-3' onClick={handleShowForm}>GenerateSalary</button>
                    </div>
                </div>
            </div>



            <Formik>
                {showForm && <div class="container mb-5" style={{ border: "1px solid black" }}>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center lh-1 mb-2">
                                {/* <h4 class="fw-bold text-center">Company Name</h4> <span class="fw-bold">Salary slip for {DisplayData.month} {DisplayData.year}</span> */}
                            </div>

                            <div class="row">

                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>Employee Name</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-select"
                                            as="select"
                                            name="empName"
                                            value={AttendanceDisplayData.empName
                                            }
                                        >
                                            {AttendanceDisplayData.map((item) =>
                                                <option
                                                    key={item.id}
                                                    value={item.empName}
                                                >
                                                    {item.empName}
                                                </option>)}
                                        </Field>

                                        <ErrorMessage className="text-danger  ms-2" component="div" name='Name' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>PaidDays</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-select"
                                            as="select"
                                            name="present"
                                            value={AttendanceDisplayData.present}
                                        >
                                            {AttendanceDisplayData.map((item) =>
                                                <option
                                                    key={item.id}
                                                    value={item.present}
                                                >
                                                    {item.present}
                                                </option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='present' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>Employee Code</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-select"
                                            as="select"
                                            name="empCode"
                                            value={AttendanceDisplayData.empCode}
                                        >
                                            {AttendanceDisplayData.map((item) =>
                                                <option
                                                    key={item.id}
                                                    value={item.empCode}
                                                >
                                                    {item.empCode}
                                                </option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger ms-2" component="div" name='empCode' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>LOP Days</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-select"
                                            as="select"
                                            name="lop"
                                        // value="HDFC"
                                        >
                                            {AttendanceDisplayData.map((item) =>
                                                <option
                                                    key={item.id}
                                                    value={item.lop}
                                                >
                                                    {item.lop}
                                                </option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='lop' />
                                    </div>
                                </div>
                                <div className='row mb-1'>
                                    <div className='col-2 form-label'>Pay Period</div>
                                    <div className='col-3 d-flex'>
                                        <Field
                                            className="form-select"
                                            as="select"
                                            name="month"
                                            value={AttendanceDisplayData.month}
                                        >
                                            {AttendanceDisplayData.map((item) =>
                                                <option
                                                    key={item.id}
                                                    value={item.month}
                                                >
                                                    {item.month}
                                                </option>)}
                                        </Field>
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='month' />
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-2 form-label'>Pay Date</div>
                                    <div className='col-3  d-flex'>
                                        <Field
                                            className="form-control"
                                            type="date"
                                            name="paydate"
                                        // value="xxxxxxx"
                                        />
                                        <ErrorMessage className="text-danger  ms-2" component="div" name='paydate' />
                                    </div>
                                </div>



                            </div>

                        </div>
                    </div>
                </div>}

            </Formik >
        </>
    )
}

export default PostSalary
