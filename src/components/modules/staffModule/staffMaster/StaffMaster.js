
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaBook, FaEdit } from "react-icons/fa";
import pic from '../../../../assets/images/profilepic.png';
import { addBasicInfo, getBasicInfoByEmpCode, getBasicInfoById, updateBasicInfo } from '../../../../services/basicInfoServices';
import { addAddressData, getAddressDataByEmpCode, updateAddressInfo } from '../../../../services/addressService';

function StaffMaster() {

  const [maritalStatus, setMaritalStatus] = useState('Single')
  const [empCode, setEmpCode] = useState(" ")
  const [isUpdate, setIsUpdate] = useState(false)
  const { id } = useParams()

  const inputFields = {
    FirstName: '',
    LastName: '',
    empCode: '',
    FatherName: '',
    MotherName: '',
    MaritalStatus: 'Single',
    SpouseName: ' ',
    Anniversary: ' ',
    Religion: '',
    DOB: '',
    Sex: '',
    BloodGroup: '',
    Nationality: ''
  }

  // Address information 
  const perInputFilelds = {
    "empCode": '',
    "AddressLine": '',
    "Country": "",
    "State": "",
    "City": "",
    "PinCode": "",
    "PhonesNo": "",
    "Email": "",
    "ContactType": "Permanent",
    "Relation": "",
    "RelationName": ""
  }

  const tempInputFilelds = {
    "empCode": '',
    "AddressLine": '',
    "Country": "",
    "State": "",
    "City": "",
    "PinCode": "",
    "PhonesNo": "",
    "Email": "",
    "ContactType": "Temporary",
    "Relation": "",
    "RelationName": ""
  }
  const emergencyContactInputFilelds = {
    "empCode": '',
    "AddressLine": ' ',
    "Country": " ",
    "State": " ",
    "City": " ",
    "PinCode": " ",
    "PhonesNo": "",
    "Email": "",
    "ContactType": "Emergency",
    "Relation": "",
    "RelationName": ""
  }
  const [basicInfoFormValues, setBasicFormValues] = useState(inputFields)
  const [perFormValues, setPerFormValues] = useState(perInputFilelds)
  const [tempFormValues, setTempFormValues] = useState(tempInputFilelds)
  const [emergencyFormValues, setEmergFormValues] = useState(emergencyContactInputFilelds)



  useEffect(() => {

    if (id > 0) {
      console.log("edit")
      getBasicInfoById(id).then(res => {
       // console.log(res.data)
        setBasicFormValues(res.data)
      } )
    
      document.getElementById("eCode").disabled = true;
      setIsUpdate(true)

    }
   // console.log(basicInfoFormValues)
  }, [])

  const validationSchema = Yup.object({
   
    FirstName: Yup.string().required("First name is required").matches(/^[A-Za-z]\w*/,"not correct"),
    LastName: Yup.string().required("Last name is required").matches(/^[A-Za-z]\w*/,"not correct"),
    empCode: Yup.string().required("empCode is required"),
    FatherName: Yup.string().required("Father name is required").matches(/^[A-Za-z]\w*/,"not correct"),
    MotherName: Yup.string().required("Mother name is required").matches(/^[A-Za-z]\w*/,"not correct"),
    MaritalStatus: Yup.string().required("Please select marital status"),
    SpouseName: Yup.string().required("required"),
    Anniversary: Yup.string().required("required"),
    Religion: Yup.string().required("required"),
    DOB: Yup.string().required("required"),
    Sex: Yup.string().required("Please select sex"),
    BloodGroup: Yup.string().required("required"),
    Nationality: Yup.string().required("required"),

  })



  const handleSubmit = () => {

    console.log(basicInfoFormValues)

    setEmpCode(basicInfoFormValues.empCode)
    perFormValues.empCode = basicInfoFormValues.empCode
    tempFormValues.empCode = basicInfoFormValues.empCode
 
    if (!isUpdate) {

      addBasicInfo(basicInfoFormValues)
    }
    else {
       updateBasicInfo(basicInfoFormValues, id)
       getAddressData()
        

    }
    document.getElementById("addBtn").disabled = true;
    document.getElementById("addBtn").innerHTML = "Added"
    document.getElementById("addressTab").setAttribute("data-bs-toggle", "tab")


  }

  const getAddressData = async () => {

    const addressDataArr = []

   await getAddressDataByEmpCode(basicInfoFormValues.empCode).then((res) => {
      console.log(res.data)
      setPerFormValues(res.data[0])
      setTempFormValues(res.data[1])
      setEmergFormValues(res.data[2])
    
     
    } )
  
    console.log(emergencyFormValues)
      
  }


  const handleMaritalStatusChange = (option, setFieldValue) => {

    setFieldValue('MaritalStatus', option.target.value)
    setMaritalStatus(option.target.value)

  }


  const addValidationSchema = Yup.object({
    AddressLine: Yup.string().required("required"),
    Country: Yup.string().required(" required"),
    State: Yup.string().required("required"),
    City: Yup.string().required("required"),
    PinCode: Yup.string().required("required"),
    PhonesNo: Yup.string().required("required").matches(/^\d{10}$/,"not correct"),
    Email: Yup.string().required("required"),

  })

  const emergencyContactValidationSchema = Yup.object({
    RelationName: Yup.string().required("required"),
    Relation: Yup.string().required(" required"),
    PhonesNo: Yup.string().required("required").matches(/^\d{10}$/,"not correct"),
    Email: Yup.string().required("required"),

  })


  const onBasicHandlerChange = (e, setFieldValue) => {

    const { name, value } = e.target
    setBasicFormValues({ ...basicInfoFormValues, [name]: value })
    // console.log(tempFormValues)
    setFieldValue([name], value)
  }
  const onPerHandlerChange = (e, setFieldValue) => {

    const { name, value } = e.target
    setPerFormValues({ ...perFormValues, [name]: value })
    console.log(perFormValues)
    setFieldValue([name], value)

  }

  const onTempHandlerChange = (e) => {

    const { name, value } = e.target
    setTempFormValues({ ...tempFormValues, [name]: value })
    // console.log(tempFormValues)

  }

  const onEmergHandlerChange = (e) => {

    const { name, value } = e.target
    setEmergFormValues({ ...emergencyFormValues, [name]: value })
    console.log(emergencyFormValues)


  }

  const handleAddressSubmit = () => {

    const arr = []
    arr.push({ ...perFormValues })
    arr.push({ ...tempFormValues })
    console.log(arr)
    if(id >0)
    {
       updateAddressInfo(arr)
    }
    else{
      addAddressData(arr)
    }
    
    document.getElementById("addAddressBtn").disabled = true;
    document.getElementById("addAddressBtn").innerHTML = "Added"
    document.getElementById("emergTab").setAttribute("data-bs-toggle", "tab")
  }


  const handleEmergSubmit = (values) => {

    values.empCode = empCode
    console.log(values.empCode)
    const arrEmerg = []
    arrEmerg.push(values)
   
    if(id >0)
    {
       updateAddressInfo(arrEmerg)
    }
    else{
      addAddressData(arrEmerg)
    }
    document.getElementById("addEmergBtn").disabled = true;
    document.getElementById("addEmergBtn").innerHTML = "Added"
  }

  const handlerCheckBoxChange = (e) => {

    console.log(e.target.checked + "adka")
    if (e.target.checked) {
      setTempFormValues(perFormValues)
      console.log(tempFormValues)
    }
  }
  return (

    <div className='container mt-3 mb-5'>

      <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
        <div className='m-2'>
          <FaBook className='me-2' />Employee Master
        </div>
      </h4>
      <ul class="nav nav-tabs ">
        <li class="nav-item">
          <a class="nav-link text-info active " data-bs-toggle="tab" href="#basic">Basic Information</a>
        </li>
        <li class="nav-item " >
          <a class="nav-link text-info" href="#addressInfo" id="addressTab">Address Information</a>
        </li>

        <li class="nav-item">
          <a class="nav-link text-info" id="emergTab" href="#emergencyContact">Emergency Contact</a>
        </li>

      </ul>


      <div class="tab-content">
        {/*basic info start*/}


        <div class="tab-pane container active" id="basic">

          <Formik initialValues={basicInfoFormValues} onSubmit={handleSubmit}
            validationSchema={validationSchema} enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>

                <div class="row mt-1" id="">
                  <div class="col-2 ">

                    <div><label class="form-label">First Name</label></div>
                    <div><label class="form-label  mt-3">Last Name</label></div>
                    <div><label class="form-label  mt-2">Emp Code</label></div>
                    <div><label class="form-label mt-2">Father Name</label></div>
                    <div><label class="form-label mt-2">Mother Name</label></div>
                    <div><label class="form-label mt-3">Marital Status</label></div>
                    {basicInfoFormValues.MaritalStatus != 'Single' &&
                      <div> <div><label class="form-label mt-2">Spouse Name</label></div>
                        <div><label class="form-label mt-2">Anniversary</label></div>
                      </div>
                    }

                    <div><label class="form-label mt-2">Religion</label></div>

                  </div>
                  <div class="col-5">

                    <div className="input-group text-danger fs-6">
                      <Field type='text' name='FirstName' value={basicInfoFormValues.FirstName}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}
                        className="form-control" id=""

                      ></Field>
                      <ErrorMessage name='FirstName' className=" ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='LastName' className="form-control" id=""
                        value={basicInfoFormValues.LastName}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='LastName' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='empCode' className="form-control" id="eCode"
                        value={basicInfoFormValues.empCode}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='empCode' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='FatherName' className="form-control" id=""
                        value={basicInfoFormValues.FatherName}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='FatherName' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='MotherName' className="form-control" id=""
                        value={basicInfoFormValues.MotherName}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='MotherName' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="MaritalStatus" as="select" value={basicInfoFormValues.MaritalStatus}
                        onChange={(e) => { onBasicHandlerChange(e, setFieldValue) }}
                        class='form-select form-select'>
                        <option value="">option </option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                      </Field>
                      <ErrorMessage name='MaritalStatus' className="text-danger ms-3" />
                    </div>
                    {basicInfoFormValues.MaritalStatus != 'Single' &&
                      <div>
                        <div className="input-group mt-1 text-danger fs-6">
                          <Field type='text' name='SpouseName' className="form-control" id=""
                            value={basicInfoFormValues.SpouseName}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)} ></Field>
                          <ErrorMessage name='SpouseName' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-1 text-danger fs-6">
                          <Field type="date" name='Anniversary' className="form-control " id=""
                            value={basicInfoFormValues.Anniversary}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                          <ErrorMessage name='Anniversary' className="text-danger ms-3" />
                        </div>
                      </div>
                    }

                    {/*<input type="date" class="form-control mt-1" id="" />*/}

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='Religion' className="form-control" id=""
                        value={basicInfoFormValues.Religion}
                        onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='Religion' className="text-danger ms-3" />
                    </div>

                  </div>

                  <div class="col-1"></div>

                  <div class="col-4 ">
                    <div className="border w-50 mx-auto">
                      <img src={pic} class="img-fluid" alt="..." />
                      <div className="mt-2 ms-2 mb-4"> <button type="button" class="btn btn-info">Browse</button></div>
                    </div>

                    <div className="row">
                      <div className="col-2 mt-2 ">
                        <div><label class="form-label mt-3">DOB</label></div>
                        <div><label class="form-label mt-3 ">Sex</label></div>
                        <div><label class="form-label mt-2">Blood Group</label></div>
                        <div><label class="form-label mt-2">Nationality</label></div>
                      </div>
                      <div className="col-8 mt-2">

                        <div className="input-group mt-2 text-danger fs-6">
                          <Field type="date" name='DOB' className="form-control" id=""
                            value={basicInfoFormValues.DOB}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)}></Field>
                          <ErrorMessage name='DOB' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-1 text-danger fs-6">
                          <Field name="Sex" as="select"
                            class='form-select form-select'
                            value={basicInfoFormValues.Sex}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Field>
                          <ErrorMessage name='Sex' className="text-danger ms-3" />
                        </div>


                        <div className="input-group mt-2 text-danger fs-6">
                          <Field name="BloodGroup" as="select"
                            class='form-select form-select'
                            value={basicInfoFormValues.BloodGroup}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)}>
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="O">O</option>
                          </Field>
                          <ErrorMessage name='BloodGroup' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-4 text-danger ms-3 fs-6">
                          <Field name="Nationality" as="select"
                            class='form-select form-select' value={basicInfoFormValues.Nationality}
                            onChange={e => onBasicHandlerChange(e, setFieldValue)}>
                              <option value="">Select</option>
                            <option value="indian">Indian</option>
                            <option value="canadian">Canadian</option>
                          </Field>
                          <ErrorMessage name='Nationality' className="text-danger ms-3" />
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
                <div className='text-center p-3 '><button type="submit" class="btn btn-info w-25" id="addBtn">Add</button></div>
              </Form>
            )}

          </Formik>
        </div>

        {/*address info*/}

        <div class="tab-pane container fade" id="addressInfo">
          <Formik initialValues={perFormValues} validationSchema={addValidationSchema}
          enableReinitialize
           onSubmit={handleAddressSubmit}>
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className='row fw-bolder mt-3'>
                  <div className='col-6 text-info' >Permanent Informnation </div>
                  <div className='col-6 text-info d-flex flex-row' >
                    <div className=''>Temporary Address </div>
                    <div class="form-check text-black">
                      <input class="form-check-input ms-3" type="checkbox" value="" id="flexCheckDefault" onChange={e => { handlerCheckBoxChange(e) }} />
                      <label class="form-check-label ms-2" for="flexCheckDefault">
                        Copy
                      </label>
                    </div>

                  </div>
                </div>
                <div class="row mt-3" id="">
                  <div class="col-2 ">

                    <div><label class="form-label mt-2"> Address</label></div>
                    <div><label class="form-label  mt-4">Country</label></div>
                    <div><label class="form-label  mt-2">State</label></div>
                    <div><label class="form-label mt-3">City</label></div>
                    <div><label class="form-label mt-3">Pin Code</label></div>
                    <div><label class="form-label mt-3">Phone</label></div>
                    <div><label class="form-label mt-2">Email</label></div>


                  </div>
                  <div class="col-3">
                  
                    <div className="input-group text-danger fs-6">
                      <Field  as="textarea" name="AddressLine" className="form-control" id=""
                        value={perFormValues.AddressLine} onChange={e => onPerHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='AddressLine' className=" ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="Country" as="select"
                        class='form-select form-select'
                        value={perFormValues.Country} onChange={e => onPerHandlerChange(e, setFieldValue)}>
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="US">US</option>
                      </Field>
                      <ErrorMessage name='Country' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="State" as="select"
                        class='form-select form-select'
                        value={perFormValues.State} onChange={e => onPerHandlerChange(e, setFieldValue)}>
                        <option value="">Select</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                      </Field>
                      <ErrorMessage name='State' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="City" as="select"
                        class='form-select form-select'
                        value={perFormValues.City} onChange={e => onPerHandlerChange(e, setFieldValue)}>
                        <option value="">Select</option>
                        <option value="Noida">Noida</option>
                        <option value="Agra">Agra</option>
                      </Field>
                      <ErrorMessage name='City' className="text-danger ms-3" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='number' name='PinCode' className="form-control" id=""
                        value={perFormValues.PinCode} onChange={e => onPerHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='PinCode' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='number' name='PhonesNo' className="form-control" id=""
                        value={perFormValues.PhonesNo} onChange={e => onPerHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='PhonesNo' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='email' name='Email' className="form-control" id=""
                        value={perFormValues.Email} onChange={e => onPerHandlerChange(e, setFieldValue)}></Field>
                      <ErrorMessage name='Email' className=" ms-1" />
                    </div>

                  </div>

                  <div className='col-1'></div>

                  <div class="col-2 ">

                    <div><label class="form-label mt-2"> Address</label></div>
                    <div><label class="form-label  mt-4">Country</label></div>
                    <div><label class="form-label  mt-2">State</label></div>
                    <div><label class="form-label mt-3">City</label></div>
                    <div><label class="form-label mt-3">Pin Code</label></div>
                    <div><label class="form-label mt-3">Phone</label></div>
                    <div><label class="form-label mt-2">Email</label></div>

                  </div>
                  <div class="col-3">
                    <textarea class="form-control" id="" rows="2"
                      name="AddressLine"
                      value={tempFormValues.AddressLine}
                      onChange={e => onTempHandlerChange(e)}></textarea>

                    <select class="form-select  mt-1 "
                      name="Country"
                      value={tempFormValues.Country}
                      onChange={e => onTempHandlerChange(e)}>
                      <option value="">Select</option>
                      <option value="India">India</option>
                      <option value="US">US</option>
                    </select>



                    <select class="form-select  mt-1"
                      name="State"
                      value={tempFormValues.State}
                      onChange={e => onTempHandlerChange(e)}>
                      <option value="">Select</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi">Delhi</option>
                    </select>

                    <select class="form-select  mt-1"
                      name="City"
                      value={tempFormValues.City}
                      onChange={e => onTempHandlerChange(e)}>
                     <option value="">Select</option>
                      <option value="Delhi">Delhi</option>
                      <option value="UP">UP</option>
                    </select>

                    <input type="number" name="PinCode" class="form-control mt-1" id=""
                      value={tempFormValues.PinCode}
                      onChange={e => onTempHandlerChange(e)} />

                    <input type="number" name="PhonesNo" class="form-control mt-1" id=""
                      value={tempFormValues.PhonesNo}
                      onChange={e => onTempHandlerChange(e)} />

                    <input type="email" class="form-control mt-1" id="" name='Email'
                      value={tempFormValues.Email}
                      onChange={e => onTempHandlerChange(e)} />

                  </div>
                </div>
                <div className='text-center p-3'><button type="submit" class="btn btn-info w-25" id="addAddressBtn">Add</button></div>
              </Form>
            )}
          </Formik>

        </div>

        {/*emergency contact info*/}
        <div class="tab-pane container fade" id="emergencyContact">
          <Formik initialValues={emergencyFormValues}
          enableReinitialize
           onSubmit={handleEmergSubmit} validationSchema={emergencyContactValidationSchema}>
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div class="row mt-3" id="">
                  <div class="col-1 ">

                    <div><label class="form-label mt-2"> Name</label></div>
                    <div><label class="form-label  mt-2">Relation</label></div>

                  </div>

                  <div class="col-4">

                    <div className="input-group text-danger fs-6">
                      <Field type='text' name='RelationName' className="form-control" id=""
                      value={emergencyFormValues.RelationName}
                      onChange={e => onEmergHandlerChange(e)}
                      ></Field>
                      <ErrorMessage name='RelationName' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='text' name='Relation' className="form-control" id=""
                      value={emergencyFormValues.Relation}
                      onChange={e => onEmergHandlerChange(e)}
                      ></Field>
                      <ErrorMessage name='Relation' className=" ms-1" />
                    </div>

                  </div>

                  <div className='col-1'></div>

                  <div class="col-1 ">

                    <div><label class="form-label mt-3">Phone</label></div>
                    <div><label class="form-label mt-2">Email</label></div>

                  </div>
                  <div class="col-4">

                    <div className="input-group text-danger fs-6">
                      <Field type='number' name='PhonesNo' className="form-control" id=""
                      value={emergencyFormValues.PhonesNo}
                      onChange={e => onEmergHandlerChange(e)}
                      ></Field>
                      <ErrorMessage name='PhonesNo' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='email' name='Email' className="form-control" id=""
                      value={emergencyFormValues.Email}
                      onChange={e => onEmergHandlerChange(e)}
                      ></Field>
                      <ErrorMessage name='Email' className=" ms-1" />
                    </div>

                  </div>
                  <div className='text-center p-3'><button type="submit" class="btn btn-info w-25" id="addEmergBtn">Add</button></div>
                </div>
              </Form>)}
          </Formik>
        </div>


      </div>

    </div >

  );

}




export default StaffMaster;