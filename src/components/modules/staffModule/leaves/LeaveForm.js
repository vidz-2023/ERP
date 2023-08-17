import React, { useEffect, useState } from 'react'// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import LeaveFormTable from './LeaveFormTable';
import { addLeaveForm, editLeaveForm, getLeaveFormByEmpCode, getLeaveFormByEmpData, getLeaveFormByEmployee, getLeaveFormByID } from '../../../../services/LeaveFormService';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBullseye } from 'react-icons/fa';
import { getLeaveByNoOfLeave, getLeaveMaster } from '../../../../services/LeaveMasterService';
import { getWorkLocation, getWorkLocationByEmpCode } from '../../../../services/workLocationServices';
import { getBasicInfo, getBasicInfoByName } from '../../../../services/basicInfoServices';


function LeaveForm() {

  // InitialValues Value for Formik
  const inputFields = {
    employee: '',
    voucherno: '',
    leavecode: '',
    fromDate: '',
    toDate: '',
    leaveIn: '',
    days: '',
    rate: '',
    amount: '',
    reason: '',
    remark: '',
    remarkByFinance: '',
    branch: '',
    department: '',
    designation: '',
    availableLeaves: ""
  }

  //Declaration
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const { employee } = useParams();
  const navigate = useNavigate()
  const [leaveFormValue, setLeveFormValue] = useState(inputFields)
  const [avbLeaves, setAvbLeaves] = useState(0)
  var acqLeaves = 0;
  const tempArray = [];
  var newLeaCodAcqLea = []
  const [data, setData] = useState([])
  var countDays = 0
  var pendingLeaves = 0;
  var getAvbLeave;
  var newDataOBjWork = []
  const [getEMPWorkData, setGetEMPWorkData] = useState([])
  const [getEMPWorkDetail, setGetEMPWorkDetail] = useState([])
  const [empCode, setEmpCode] = useState("")
  const [Branch, setBranch] = useState("")
  const [Department, setDepartment] = useState("")
  const [Designation, setDesignation] = useState("")


  const validateyupSchema = Yup.object({
    employee: Yup.string().required('Employee is required'),
    voucherno: Yup.string().required('Voucher no is required'),
    leavecode: Yup.string().required('Leave code is required'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
    leaveIn: Yup.string().required('Data is required'),
    days: Yup.string().required('Days is required'),
    rate: Yup.string().required('Rate is required'),
    amount: Yup.string().required(' Amount is required'),
    remark: Yup.string().required('Remark is required'),
    reason: Yup.string().required('Reason is required'),
    remarkByFinance: Yup.string().required('Remarks are required'),
    //availableLeaves: Yup.string().required('Check the data')
  })

  useEffect(() => {
    console.log(id)
    if (id >= 0) {
      getLeaveFormByID(id).then(res => {
        console.log(res.employee)
        setEmpCode(res.employee)
        setBranch(res.branch)
        setDepartment(res.department)
        setDesignation(res.designation)
        setLeveFormValue(res)
      })
      setIsUpdate(true)
    }
    else {
      getEMPDetailFromWorkLocation()
    }
  }, [])



  const getEMPDetailFromWorkLocation = async () => {
    await getWorkLocation().then(resWorKData => {
      console.log(resWorKData.data)
      setGetEMPWorkData(resWorKData.data)
    })
  }

  const handleSubmit = () => {

    leaveFormValue.employee = empCode
    leaveFormValue.branch = Branch
    leaveFormValue.department = Department
    leaveFormValue.designation = Designation
    console.log(leaveFormValue)

    if (!isUpdate) {
      addLeaveForm(leaveFormValue)
      navigate('/leaveFormTable')
    } else {
      editLeaveForm(leaveFormValue, id)
      navigate('/leaveFormTable')
    }
  }

  //On Change Function Declration
  const onLeaveHandlerChange = (e, setFieldValue) => {
    const { name, value } = e.target

    setLeveFormValue({ ...leaveFormValue, [name]: value })
    if (name == "employee") {
      fetchEmp(value)
    }
    setFieldValue([name], value)
  }

  const onLeavecodeChange = (e, setFieldValue) => {
    const { name, value } = e.target
    setLeveFormValue({ ...leaveFormValue, [name]: value })
    setFieldValue([name], value)
    getAvbBasedOnLeaveCode(value)
  }

  const onLeaveEMPHandlerChange = (option, setFieldValue) => {
    setFieldValue("employee", option.target.value)
    console.log(option.target.value)
    fetchEmp(option.target.value)
    setEmpCode(option.target.value)
    option.target.value && funGetBasicInfoByName(option.target.value)
  }

  const funGetBasicInfoByName = (data) => {
    getWorkLocationByEmpCode(data).then((res) => {
      const updateEmpCode = res.data[0].empCode
      const updateBranch = res.data[0].Branch
      const updateDepartment = res.data[0].Department
      const updateDesignation = res.data[0].Designation
      console.log("Particular" + updateEmpCode, updateBranch, updateDepartment, updateDesignation)
      setEmpCode(updateEmpCode)
      setBranch(updateBranch)
      setDepartment(updateDepartment)
      setDesignation(updateDesignation)
    })
  }
  //To fetch the LeaveCode and No of Leave from The LeaveMaster 
  const getAvbBasedOnLeaveCode = async (value) => {
    console.log(value)

    await getLeaveByNoOfLeave(value).then(res => {
      console.log(res.data)
      console.log(res.data[0].noOfLeave);
      leaveFormValue.availableLeaves = res.data[0].noOfLeave
      console.log(leaveFormValue.availableLeaves)
      setAvbLeaves(leaveFormValue.availableLeaves)
      getAvbLeave = res.data[0].noOfLeave
    })
    console.log(data)
    let output = data.filter(item => item.empLeaveCode == value);
    console.log(output)
    for (let i = 0; i < output.length; i++) {
      console.log(output[i].empAcqLeave)
      countDays += Number(output[i].empAcqLeave)
    };
    console.log(countDays)
    console.log(getAvbLeave)
    pendingLeaves = getAvbLeave - countDays
    console.log(pendingLeaves)
    setAvbLeaves(pendingLeaves)
  }

  //TO fetch the total acquired leaves from the Employee code
  const fetchEmp = async (value) => {
    await getLeaveFormByEmpCode(value).then(res => {
      console.log(res.data)
      console.log(res.data[0].days)
      tempArray.push(...res.data)
      console.log(tempArray)
      getAcqDays(tempArray)
      getAcqDaysLeaveCode(tempArray)
    })
    await getWorkLocationByEmpCode(value).then(res => {
      console.log(res.data)
      setGetEMPWorkDetail(res.data)
    })
  }


  //To get total of the Acquired Leaves based on the EmpCode
  const getAcqDays = (tempArray) => {
    console.log(tempArray)
    let newAcqLeaves = []
    for (let i = 0; i < tempArray.length; i++) {
      console.log(tempArray[i].days)
      newAcqLeaves.push(tempArray[i].days)
    }
    console.log(newAcqLeaves)
    for (let i = 0; i < newAcqLeaves.length; i++) {
      acqLeaves += Number(newAcqLeaves[i])
    }
    console.log(acqLeaves)
  }

  //To get the Leave Code and Acquired Leave to display in the Field
  const getAcqDaysLeaveCode = (tempArray) => {

    for (let i = 0; i < tempArray.length; i++) {
      const newObjAcqDaysLeaveCode = {
        "empLeaveCode": "",
        "empAcqLeave": ""
      }
      newObjAcqDaysLeaveCode.empLeaveCode = tempArray[i].leavecode
      newObjAcqDaysLeaveCode.empAcqLeave = tempArray[i].days
      newLeaCodAcqLea.push(newObjAcqDaysLeaveCode)
    }
    console.log(newLeaCodAcqLea)
    setData(newLeaCodAcqLea)
  }

  //TO Clear and Delete the Function
  const clearData = () => {
    setLeveFormValue(inputFields)
    setEmpCode("")
    setBranch("")
    setDepartment("")
    setDesignation("")
  }

  return (
    <>

      <div className='contianer mx-auto'>
        <fieldset>
          <div className='m-3'>
            <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
              <div className='m-2'>
                <MdOutlineHolidayVillage className='me-2' />Apply Leave
              </div>
            </h4>
            <Formik
              initialValues={leaveFormValue}
              validationSchema={validateyupSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              resetForm
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className='w-75 mx-auto'>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Employee
                      </div>
                      <div className='col-3 '>
                        {!isUpdate && <div class=" mb-2 text-danger">
                          <Field
                            as="select"
                            name="employee"
                            className="form-select form-select-sm fw-light"
                            value={empCode}
                            onChange={e => onLeaveEMPHandlerChange(e, setFieldValue)
                            }>
                            <option value=" "> Select...</option>
                            {getEMPWorkData.map((item) =>
                              <option
                                key={item.id}
                                value={item.empCode}
                              >
                                {item.empCode}
                              </option>)}
                          </Field>
                          <ErrorMessage name='employee' />
                        </div>}

                        {isUpdate && <div class=" mb-2 text-danger">
                          <Field
                            as="select"
                            name="employee"
                            className="form-select form-select-sm fw-light"
                            value={empCode}
                            onChange={e => onLeaveEMPHandlerChange(e, setFieldValue)}
                          >
                            <option value={empCode}> {empCode}</option>
                            <option value={empCode}> {empCode}</option>
                          </Field>
                        </div>}
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Designation
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='designation'
                            value={Designation}
                            disabled
                          // value={leaveFormValue.designation}
                          // onChange={e => onLeaveHandlerChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='designation' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Branch
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='branch'
                            value={Branch}
                            disabled
                          // value={leaveFormValue.branch}
                          // onChange={e => onLeaveHandlerChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='branch' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Department
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='department'
                            value={Department}
                            disabled
                          // value={leaveFormValue.department}
                          // onChange={e => onLeaveHandlerChange(e, setFieldValue)} 
                          />
                          <ErrorMessage name='department' />
                        </div>
                      </div>

                    </div>


                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Leave Code
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            as="select"
                            name="leavecode"
                            className="form-select form-select-sm fw-light"
                            value={leaveFormValue.leavecode}
                            onChange={e => onLeavecodeChange(e, setFieldValue)}
                          >
                            <option value="0001"> 0001</option>
                            <option value="0002"> 0002</option>
                            <option value="0003"> 0003</option>
                          </Field>
                          <ErrorMessage name='leavecode' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Leave In
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            as="select"
                            name="leaveIn"
                            className="form-select form-select-sm fw-light"
                            value={leaveFormValue.leaveIn}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}>
                            <option value="FullDay"> FullDay</option>
                            <option value="FirstHalf"> FirstHalf</option>
                            <option value="SecondHalf"> SecondHalf</option>
                          </Field>
                          <ErrorMessage name='leaveIn' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        From Date
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='date'
                            name='fromDate'
                            value={leaveFormValue.fromDate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='fromDate' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        To Date
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='date'
                            name='toDate'
                            value={leaveFormValue.toDate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='toDate' />
                        </div>
                      </div>
                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Days
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='days'
                            value={leaveFormValue.days}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='days' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Rate
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='rate'
                            value={leaveFormValue.rate}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='rate' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Amount
                      </div>
                      <div className='col-3'>
                        <div class="mb-2  text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='amount'
                            value={leaveFormValue.amount}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='amount' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Reason
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='reason'
                            value={leaveFormValue.reason}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='reason' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Remark
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='remark'
                            value={leaveFormValue.remark}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='remark' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Remark By Finance
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='remarkByFinance'
                            value={leaveFormValue.remarkByFinance}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)} />
                          <ErrorMessage name='remarkByFinance' />
                        </div>
                      </div>

                    </div>

                    <div className='row mb-1'>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        Voucher No
                      </div>
                      <div className='col-3'>
                        <div class="text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='voucherno'
                            value={leaveFormValue.voucherno}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}
                          />
                          <ErrorMessage name='voucherno' />
                        </div>
                      </div>
                      <div className='col-2'></div>
                      <div className='col-2 col-form-label col-form-label-sm'>
                        AvailableLeaves
                      </div>
                      <div className='col-3'>
                        <div class="mb-2 text-danger">
                          <Field
                            className="form-control form-control-sm"
                            type='text'
                            name='availableLeaves'
                            //value={avbLeaves}
                            value={leaveFormValue.availableLeaves = avbLeaves}
                            onChange={e => onLeaveHandlerChange(e, setFieldValue)}
                            disabled />
                          <ErrorMessage name='availableLeaves' />
                        </div>
                      </div>
                    </div>

                    <div className=' row mt-1'>
                      <div className='col-3'>
                        <button type="submit"
                          className='w-50 btn btn-info'>
                          Apply
                        </button></div>

                      <div className='col-3'>
                        <button type="reset"
                          className='w-50 btn btn-info'
                          onClick={clearData} >
                          Clear
                        </button>
                      </div>

                      <div className='col-3'>
                        <button type="reset"
                          className='w-50 btn btn-info'
                          onClick={clearData}>
                          Delete
                        </button>
                      </div>

                      <div className='col-3'>
                        <button type="button"
                          className='w-50 btn btn-info'
                          onClick={() => navigate(`/leaveFormTable`)}>
                          Exit
                        </button>
                      </div>
                    </div>

                  </div>
                </Form>)}
            </Formik>
          </div>
        </fieldset >
      </div >

    </>
  )
}

export default LeaveForm