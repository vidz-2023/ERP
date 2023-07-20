
import React, { useEffect, useState } from 'react';
import { FaBook, FaEdit } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addSalAdvancesInfo, getSalAdvancesByEmpCode } from '../../../../services/salaryAdvancesService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Moment from 'react-moment';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

function SalaryAdvances() {


    const initialValue = {
        "empCode": "",
        "EmpName": "",
        "LoanName": "",
        "RequestedLoanAmt": "",
        "ApprovedLoanAmt": "",
        "InterestRate": "",
        "Description": "",
        "Status": "",
        "RequestedDate": " ",
        "RequiredDate": " ",
        "ApprovedDate": " ",
        "RepaymentMethod": "",
        "RepayMonthlyAmt": 0,
        "RepayPeriodsInMonth": 0,
        "RepayStartDate": "",
        "PaymentMode": "",
        "CollectionLoc": " ",
        "ChequeNo": "",
        "AccountName": "",
        "AccountNumber": "",
        "IFSCCode": ""
    }
    const rePayValue =
    {
        EmiNo: 1,
        RePayDate: "",
        EMI: "",
        PA: "",
        IA: 0,
        Bal: ""

    }

    const { empcode } = useParams()
    const navigate = useNavigate()
    const [formValues, setFormValue] = useState(initialValue)
    const [periods, setPeriods] = useState(0)
    const [monthlyAmt, setMonthlyAmt] = useState(0)
    const [showApprovedDate, setApproveDate] = useState(false)
    const [rePayData, setRepayData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const rePayArr = []

  // var temValues = {}

    useEffect(() => {
        getDataByEmpCode()
    }, [])

    const getDataByEmpCode = async () => {

        console.log(empcode)
        if (empcode > 0) {
           await getSalAdvancesByEmpCode(empcode).then(res => {
                
                setPeriods(res.data[0].RepayPeriodsInMonth)
                setMonthlyAmt(res.data[0].RepayMonthlyAmt)
                setFormValue(res.data[0])

              
            })
          await  getRepaymentSchedule()
            setIsUpdate(true)
        }

        console.log(formValues)

    }
    const validationSchema = Yup.object({

        EmpName: Yup.string().required("required"),
        LoanName: Yup.string().required("required").matches(/^[A-Za-z]\w*/, "not correct"),
        RequestedLoanAmt: Yup.number().required("required").min(0, "Only positive value"),
        ApprovedLoanAmt: Yup.number().required("required").min(0, "Only positive value"),
        InterestRate: Yup.number().required("required").min(0, "Only positive value"),
        Description: Yup.string().required("required"),
        Status: Yup.string().required("Please select marital status"),
        RequestedDate: Yup.string().required("required"),
        RequiredDate: Yup.string().required("required"),
        ApprovedDate: Yup.string().required("required"),
        RepaymentMethod: Yup.string().required("required"),
        RepayMonthlyAmt: Yup.number().required("required").min(0, "Only positive value"),
          RepayPeriodsInMonth: Yup.number().required("required").min(0, "Only positive value"),
        RepayStartDate: Yup.string().required("required"),
        PaymentMode: Yup.string().required("required"),
        // CollectionLoc: Yup.string().required("required"),
        //  ChequeNo: Yup.number().required("required").min(0, "Only positive value"),
        // AccountName: Yup.string().required("required"),
        // AccountNumber: Yup.number().required("required").min(0, "Only positive value"),
        //  IFSCCode: Yup.string().required("required"),

    })

    const handleChange = (e, setFieldValue) => {

        const { name, value } = e.target
        console.log(name)
        console.log(value)
        setFormValue({ ...formValues, [name]: value })
        if (name == "RepayMonthlyAmt" && formValues.RepaymentMethod == "Fix") {
            console.log("--------")
            calculatePeriodOfMonths(value)


        }

        else if (name == "RepayPeriodsInMonth" && formValues.RepaymentMethod == "Periods") {
            console.log("--------")
            calculateMonthlyAmount(value)

        }
        else if (name == "Status" && value == "Closed") {

            setApproveDate(true)
        }
        else if (name == "Status" && value != "Closed") {
            setApproveDate(false)
        }

        setFieldValue([name], value)
    }

    const handleSubmit = () => {
        
       formValues.RepayPeriodsInMonth = periods
       formValues.RepayMonthlyAmt = monthlyAmt
        //setFormValue({ ...formValues, "RepayMonthlyAmt": monthlyAmt, "RepayPeriodsInMonth": periods })

        console.log(formValues)
        addSalAdvancesInfo(formValues)
        navigate('/salaryAdvancesData')
    }
    const calculatePeriodOfMonths = (amt) => {

        let months = 0
        months = formValues.ApprovedLoanAmt / amt
        setPeriods(months)
        setMonthlyAmt(amt)

    }

    const calculateMonthlyAmount = (month) => {

        let amt = 0
        amt = formValues.ApprovedLoanAmt / month
        setMonthlyAmt(amt)
        setPeriods(month)
        formValues.RepayMonthlyAmt = amt
        //console.log(formValues)


    }

    const getRepaymentSchedule = () => {

       console.log(formValues)
        let startDate = moment(formValues.RepayStartDate).format('L');;
     
        rePayValue.Bal = formValues.ApprovedLoanAmt - monthlyAmt
        rePayValue.EMI = monthlyAmt
        rePayValue.PA = monthlyAmt
        rePayValue.RePayDate = startDate
        rePayArr.push(rePayValue)
        let bal = rePayValue.Bal
        for (let i = 1; i < periods; i++) {
            console.log(i)
            const obj = {

                EmiNo: i + 1,
                RePayDate: "",
                EMI: monthlyAmt,
                PA: monthlyAmt,
                IA: 0,
                Bal: ""

            }
            obj.Bal = bal - monthlyAmt * i
            obj.RePayDate = moment(startDate).add(1, 'M').format('L');
            startDate = obj.RePayDate
            rePayArr.push(obj)
        }

        console.log(rePayArr)
        setRepayData(rePayArr)
    

    }

    const columns = [
        {
            headerName: 'S.No', field: 'EmiNo'
        },
        {
            headerName: 'Payment Date', field: 'RePayDate'
        },

        {
            headerName: 'EMI', field: 'EMI'
        },
        {
            headerName: 'Principal Amount', field: 'PA'
        },
        {
            headerName: 'Interest Amount', field: 'IA'
        },

        {
            headerName: 'Balance', field: 'Bal'
        }

    ]
    const defaultColDefs = { flex: 1 }


    return (
        <div className='container mt-3 mb-5'>

            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                <div className='m-2'>
                    <FaBook className='me-2' />Salary Advances
                </div>
            </h4>
            <Formik initialValues={formValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className='row fw-bolder mt-3'>
                            <div className='col-3 text-info' >New Loan Type1 </div>
                            <div className='col-3'></div>
                            <div className='col-4 text-info'>
                                Repayment Information </div>
                            <div className='col-2'><button type="submit"
                                class="btn btn-info " id="">submit</button>
                            </div>
                        </div>

                        <div className='row mb-3'>

                            <div className='col-2 mt-2'>

                                <div><label className="form-label mt-3">Employee Name</label></div>
                                <div><label className="form-label mt-2">Employee Code</label></div>
                                <div><label className="form-label"> Loan Name</label></div>
                                <div><label className="form-label"> Requested Loan Amount</label></div>
                                <div><label className="form-label"> Rate of interest(%) yearly</label></div>
                                <div><label className="form-label"> Description</label></div>
                                <div><label class="form-label mt-2">Status</label></div>


                                {!showApprovedDate && <div><label class="form-label mt-3">Requested Date</label></div>}
                                {showApprovedDate && <div><label class="form-label mt-3">Approved Date</label></div>}

                                <div><label class="form-label mt-3">Required Date</label></div>

                            </div>

                            <div className='col-3  mt-2'>

                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="text" className="form-control"
                                        name="EmpName"
                                        value={formValues.EmpName}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='EmpName' className=" ms-1" />
                                </div>

                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="text" className="form-control" disabled
                                        name="empCode"
                                        value={formValues.empCode}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='empCode' className=" ms-1" />
                                </div>

                                <div className="input-group text-danger fs-6 ">
                                    <Field type="text" className="form-control"
                                        name="LoanName"
                                        value={formValues.LoanName}
                                        onChange={e => handleChange(e, setFieldValue)}
                                    ></Field>
                                    <ErrorMessage name='LoanName' className=" ms-1" />
                                </div>

                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="number" className="form-control"
                                        name="RequestedLoanAmt"
                                        value={formValues.RequestedLoanAmt}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RequestedLoanAmt' className=" ms-1" />
                                </div>

                                <div className="input-group text-danger fs-6 mt-1 ">
                                    <Field type="number" className="form-control"
                                        name="InterestRate"
                                        value={formValues.InterestRate}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='InterestRate' className=" ms-1" />
                                </div>

                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field as="textarea" className="form-control"
                                        name="Description"
                                        value={formValues.Description}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='Description' className=" ms-1" />
                                </div>

                                <div className="input-group mt-1 text-danger fs-6">
                                    <Field as="select"
                                        class='form-select form-select'
                                        name="Status"
                                        value={formValues.Status}
                                        onChange={e => handleChange(e, setFieldValue)}>
                                        <option value="">Select</option>
                                        <option value="Open">Open</option>
                                        <option value="Requested">Requested</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Closed">Closed</option>

                                    </Field>
                                    <ErrorMessage name='Status' className=" ms-1" />
                                </div>

                                {!showApprovedDate && <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="date" className="form-control"
                                        name="RequestedDate"
                                        value={formValues.RequestedDate}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RequestedDate' className=" ms-1" />
                                </div>}

                                {showApprovedDate && <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="date" className="form-control"
                                        name="ApprovedDate"
                                        value={formValues.ApprovedDate}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='ApprovedDate' className=" ms-1" />
                                </div>}



                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="date" className="form-control"
                                        name="RequiredDate"
                                        value={formValues.RequiredDate}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RequiredDate' className=" ms-1" />
                                </div>

                            </div>

                            <div className='col-1'></div>

                            <div className='col-2  mt-2'>

                                <div><label class="form-label">Loan Amount</label></div>
                                <div><label class="form-label mt-3">Repayment Method</label></div>

                                {/* {formValues.RepaymentMethod == "Fix" && <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="number" className="form-control"
                                        placeholder = "Monthly Amount"
                                        name="RepayMonthlyAmt"
                                        value={formValues.RepayMonthlyAmt}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RepayMonthlyAmt' className=" ms-1" />
                                </div>}*/}

                                {formValues.RepaymentMethod == "Fix" && <div><label class="form-label mt-2">Monthly Repayment amount</label></div>}
                                {formValues.RepaymentMethod == "Fix" && <div><label class="form-label ">Repayment Period in months</label></div>}

                                {formValues.RepaymentMethod == "Periods" && <div><label class="form-label mt-1 ">Repayment Period in months</label></div>}
                                {formValues.RepaymentMethod == "Periods" && <div><label class="form-label mt-1">Monthly Repayment amount</label></div>}

                                <div><label class="form-label mt-3">Repayment start Date</label></div>
                                <div className='text-info mt-2'>Payment Info</div>

                                <div className="input-group mt-3 text-danger fs-6" placeholder='Payment mode'>
                                    <Field name="PaymentMode" as="select"
                                        class='form-select form-select'
                                        value={formValues.PaymentMode}
                                        onChange={e => handleChange(e, setFieldValue)}
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Account">Account</option>

                                    </Field>
                                    <ErrorMessage name='PaymentMode' className=" ms-1" />
                                </div>

                                {formValues.PaymentMode == "Cheque" && <div className="input-group mt-1 text-danger fs-6" >
                                    <Field type="number" className="form-control"
                                        name="AccountNumber"
                                        value={formValues.AccountNumber}
                                        onChange={e => handleChange(e, setFieldValue)} placeholder="Account Number"></Field>
                                    <ErrorMessage name='AccountNumber' className=" ms-1" />
                                </div>}

                                {formValues.PaymentMode == "Account" && <div className="input-group mt-1 text-danger fs-6" >
                                    <Field type="text" className="form-control" placeholder="IFSC Code"
                                        name="IFSCCode"
                                        value={formValues.IFSCCode}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='IFSCCode' className=" ms-1" />
                                </div>}


                            </div>

                            <div className='col-3  mt-2'>

                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="number" className="form-control"
                                        name="ApprovedLoanAmt"
                                        value={formValues.ApprovedLoanAmt}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='ApprovedLoanAmt' className=" ms-1" />
                                </div>

                                <div className="input-group mt-1 text-danger fs-6">
                                    <Field name="RepaymentMethod" as="select"
                                        class='form-select form-select'
                                        value={formValues.RepaymentMethod}
                                        onChange={e => handleChange(e, setFieldValue)}>
                                        <option value="">Select</option>
                                        <option value="Fix">Repay Fix amount per month</option>
                                        <option value="Periods">Repay over number of periods</option>

                                    </Field>
                                    <ErrorMessage name='RepaymentMethod' className=" ms-1" />
                                </div>

                                {/* {formValues.RepaymentMethod == "Fix" && <div className="input-group text-danger fs-6 mt-1 mb-5">
                                    <Field type="number" className="form-control" disabled
                                        name="RepayPeriodsInMonth"
                                        value={periods}
                                    ></Field>
                                </div>}*/}
                                {formValues.RepaymentMethod == "Fix" && <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="number" className="form-control"
                                        name="RepayMonthlyAmt"
                                        value={formValues.RepayMonthlyAmt}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RepayMonthlyAmt' className=" ms-1" />
                                </div>}

                                {formValues.RepaymentMethod == "Fix" && <div className="input-group text-danger fs-6 mt-1 mb-5">
                                    <Field type="number" className="form-control" disabled
                                        name="RepayPeriodsInMonth"
                                        value={periods}
                                    ></Field>
                                </div>}

                                {formValues.RepaymentMethod == "Periods" && <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="number" className="form-control"
                                        name="RepayPeriodsInMonth"
                                        value={formValues.RepayPeriodsInMonth}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='RepayPeriodsInMonth' className=" ms-1" />

                                </div>}

                                {formValues.RepaymentMethod == "Periods" && <div className="input-group text-danger fs-6 mt-1 mb-5">
                                    <Field type="number" className="form-control" disabled
                                        name="RepayMonthlyAmt"
                                        value={monthlyAmt}></Field>
                                </div>}


                                <div className="input-group text-danger fs-6 mt-1">
                                    <Field type="date" className="form-control"
                                        name="RepayStartDate"
                                        value={formValues.RepayStartDate}
                                        onChange={e => handleChange(e, setFieldValue)}
                                    ></Field>
                                    <ErrorMessage name='RepayStartDate' className=" ms-1" />
                                </div>

                                {formValues.PaymentMode == "Cash" && <div className="input-group mt-1 text-danger fs-6 mt-5" placeholder='Select Location'>
                                    <Field as="select" name="CollectionLoc"
                                        value={formValues.CollectionLoc}
                                        onChange={e => handleChange(e, setFieldValue)}
                                        class='form-select form-select'
                                    >
                                        <option value="">Select Location</option>
                                        <option value="Office">In Office</option>
                                        <option value="Home">Home</option>


                                    </Field>
                                    <ErrorMessage name='CollectionLoc' className=" ms-1" />
                                </div>}


                                {formValues.PaymentMode == "Cheque" && <div className="input-group mt-1 text-danger fs-6 mt-5" >
                                    <Field type="number" className="form-control" placeholder="cheque number"
                                        name="ChequeNo"
                                        value={formValues.ChequeNo}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='ChequeNo' className=" ms-1" />
                                </div>}

                                {formValues.PaymentMode == "Cheque" && <div className="input-group mt-1 text-danger fs-6 " >
                                    <Field type="text" className="form-control" placeholder="Account Name"
                                        name="AccountName"
                                        value={formValues.AccountName}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='AccountName' className=" ms-1" />
                                </div>}

                                {formValues.PaymentMode == "Account" && <div className="input-group text-danger fs-6  mt-5" >
                                    <Field type="text" className="form-control" placeholder="Account Name"
                                        name="AccountName"
                                        value={formValues.AccountName}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='AccountName' className=" ms-1" />
                                </div>}

                                {formValues.PaymentMode == "Account" && <div className="input-group mt-1 text-danger fs-6 " >
                                    <Field type="number" className="form-control" placeholder="Account Number"
                                        name="AccountNumber"
                                        value={formValues.AccountNumber}
                                        onChange={e => handleChange(e, setFieldValue)}></Field>
                                    <ErrorMessage name='AccountNumber' className=" ms-1" />
                                </div>}


                            </div>

                        </div>




                    </Form>
                )}
            </Formik>

            <div className='row '> Repayment Schedule
                <div className='col-2'><button type="button"
                    class="btn btn-info " id="" onClick={getRepaymentSchedule}>Get</button>
                </div>
            </div>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact
                    rowData={rePayData}
                    columnDefs={columns}
                    defaultColDef={defaultColDefs}
                />
            </div>

        </div >
    )
}

export default SalaryAdvances