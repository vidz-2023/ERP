
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaBook, FaEdit } from "react-icons/fa";
import pic from '../../../../assets/images/profilepic.png';
import { addBasicInfo } from '../../../../services/basicInfoServices';

function StaffMaster() {

  const [maritalStatus, setMaritalStatus] = useState('Single')

  const inputFields = {
    FirstName: '',
    LastName: '',
    EmpCode: '',
    FatherName: '',
    MotherName: '',
    MaritalStatus: '',
    SpouseName: ' ',
    Anniversary: ' ',
    Religion: '',
    DOB: '',
    Sex: '',
    BloodGroup: '',
    Nationality: ''
  }
  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First name is required"),
    LastName: Yup.string().required("Last name is required"),
    EmpCode: Yup.string().required("EmpCode is required"),
    FatherName: Yup.string().required("Father name is required"),
    MotherName: Yup.string().required("Mother name is required"),
    MaritalStatus: Yup.string().required("Please select marital status"),
    SpouseName: Yup.string().required("Spouse name Status is required"),
    Anniversary: Yup.string().required("anniversary date is required"),
    Religion: Yup.string().required("Religion Status is required"),
    DOB: Yup.string().required("DOB is required"),
    Sex: Yup.string().required("Please select sex"),
    BloodGroup: Yup.string().required("Required Field"),
    Nationality: Yup.string().required("Required Field"),


  })



  const handleSubmit = (values) => {

    alert('add')
    console.log(values.EmpCode)
    if (values) {
      addBasicInfo(values)
      document.getElementById("addBtn").disabled = true;
      document.getElementById("addBtn").innerHTML = "Added";

    }

  }

  const handleMaritalStatusChange = (option, setFieldValue) => {

    setFieldValue('MaritalStatus', option.target.value)
    setMaritalStatus(option.target.value)

  }

  // Address information 
  const perInputFilelds = {
    "AddressLine": '',
    "Country": "",
    "State": "",
    "City": "",
    "PinCode": "",
    "PhonesNo": "",
    "Email": ""
  }

  const addValidationSchema = Yup.object({
    AddressLine: Yup.string().required("required"),
    Country: Yup.string().required(" required"),
    State: Yup.string().required("required"),
    City: Yup.string().required("required"),
    PinCode: Yup.string().required("sex"),
    PhonesNo: Yup.string().required("Required Field"),
    Email: Yup.string().required("Required Field"),


  })

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
        <li class="nav-item">
          <a class="nav-link text-info" data-bs-toggle="tab" href="#addressInfo">Address Information</a>
        </li>

        <li class="nav-item">
          <a class="nav-link text-info" data-bs-toggle="tab" href="#emergencyContact">Emergency Contact</a>
        </li>

      </ul>


      <div class="tab-content">
        {/*basic info start*/}


        <div class="tab-pane container active" id="basic">

          <Formik initialValues={inputFields} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
                    {maritalStatus != 'Single' &&
                      <div> <div><label class="form-label mt-2">Spouse Name</label></div>
                        <div><label class="form-label mt-2">Anniversary</label></div>
                      </div>
                    }

                    <div><label class="form-label mt-2">Religion</label></div>

                  </div>
                  <div class="col-5">

                    <div className="input-group text-danger fs-6">
                      <Field type='text' name='FirstName' className="form-control" id="" ></Field>
                      <ErrorMessage name='FirstName' className=" ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='LastName' className="form-control" id=""></Field>
                      <ErrorMessage name='LastName' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='EmpCode' className="form-control" id=""></Field>
                      <ErrorMessage name='EmpCode' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='FatherName' className="form-control" id=""></Field>
                      <ErrorMessage name='FatherName' className="text-danger ms-1" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='MotherName' className="form-control" id=""></Field>
                      <ErrorMessage name='MotherName' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="MaritalStatus" as="select" onChange={(e) => { handleMaritalStatusChange(e, setFieldValue) }}
                        class='form-select form-select'>
                        <option value="">option </option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                      </Field>
                      <ErrorMessage name='MaritalStatus' className="text-danger ms-3" />
                    </div>
                    {maritalStatus != 'Single' &&
                      <div>
                        <div className="input-group mt-1 text-danger fs-6">
                          <Field type='text' name='SpouseName' className="form-control" id="" ></Field>
                          <ErrorMessage name='SpouseName' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-1 text-danger fs-6">
                          <Field type="date" name='Anniversary' className="form-control " id=""></Field>
                          <ErrorMessage name='Anniversary' className="text-danger ms-3" />
                        </div>
                      </div>
                    }

                    {/*<input type="date" class="form-control mt-1" id="" />*/}

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field type='text' name='Religion' className="form-control" id=""></Field>
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
                          <Field type="date" name='DOB' className="form-control" id=""></Field>
                          <ErrorMessage name='DOB' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-1 text-danger fs-6">
                          <Field name="Sex" as="select"
                            class='form-select form-select'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Field>
                          <ErrorMessage name='Sex' className="text-danger ms-3" />
                        </div>


                        <div className="input-group mt-2 text-danger fs-6">
                          <Field name="BloodGroup" as="select"
                            class='form-select form-select'>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="O">O</option>
                          </Field>
                          <ErrorMessage name='BloodGroup' className="text-danger ms-3" />
                        </div>

                        <div className="input-group mt-4 text-danger ms-3 fs-6">
                          <Field name="Nationality" as="select"
                            class='form-select form-select'>
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
              <Formik initialValues={perInputFilelds} validationSchema={addValidationSchema} >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
                <div className='row fw-bolder'>
                  <div className='col-6 text-info' >Permanent Informnation </div>
                  <div className='col-6 text-info' >Temporary Address</div>
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
                    {/*<textarea class="form-control" id="" rows="2"></textarea>*/}
                    <div className="input-group text-danger fs-6">
                      <Field type='text' as="textArea" name='AddressLine' className="form-control" id="" ></Field>
                      <ErrorMessage name='AddressLine' className=" ms-1" />
                    </div>

                    {/*<select class="form-select  mt-1">
                      <option value="married">India</option>
                      <option value="single">US</option>
                     </select>
                     
                     <select class="form-select  mt-1">
                      <option value="married">Delhi</option>
                      <option value="single">UP</option>
                    </select>

                    <select class="form-select  mt-1">
                      <option value="married">Noida</option>
                      <option value="single">Agra</option>
                    </select>
                    
                     <input type="text" class="form-control mt-1" id="" />
                    <input type="tel" class="form-control mt-1" id="" />
                    <input type="email" class="form-control mt-1" id="" />
*/}

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="Country" as="select"
                        class='form-select form-select'>
                        <option value="India">India</option>
                        <option value="US">US</option>
                      </Field>
                      <ErrorMessage name='Country' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="State" as="select"
                        class='form-select form-select'>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                      </Field>
                      <ErrorMessage name='State' className="text-danger ms-3" />
                    </div>

                    <div className="input-group mt-1 text-danger fs-6">
                      <Field name="City" as="select"
                        class='form-select form-select'>
                        <option value="Noida">Noida</option>
                        <option value="Agra">Agra</option>
                      </Field>
                      <ErrorMessage name='City' className="text-danger ms-3" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='number' name='PinCode' className="form-control" id="" ></Field>
                      <ErrorMessage name='PinCode' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='number' name='PhonesNo' className="form-control" id="" ></Field>
                      <ErrorMessage name='PhonesNo' className=" ms-1" />
                    </div>

                    <div className="input-group text-danger fs-6">
                      <Field type='email' name='Email' className="form-control" id="" ></Field>
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
                    <textarea class="form-control" id="" rows="2"></textarea>

                    <select class="form-select  mt-1 ">
                      <option value="married">India</option>
                      <option value="single">US</option>
                    </select>

                    <select class="form-select  mt-1">
                      <option value="married">Delhi</option>
                      <option value="single">UP</option>
                    </select>

                    <select class="form-select  mt-1">
                      <option value="married">Noida</option>
                      <option value="single">Agra</option>
                    </select>
                    <input type="text" class="form-control mt-1" id="" />
                    <input type="tel" class="form-control mt-1" id="" />
                    <input type="email" class="form-control mt-1" id="" />

                  </div>
                </div>
                </Form>
          )}
        </Formik>
              </div>

              {/*emergency contact info*/}
              <div class="tab-pane container fade" id="emergencyContact">

                <div class="row mt-3" id="">
                  <div class="col-1 ">

                    <div><label class="form-label mt-2"> Name</label></div>
                    <div><label class="form-label  mt-2">Relation</label></div>
                    <div><label class="form-label  mt-2">Mobile</label></div>

                  </div>

                  <div class="col-4">

                    <input type="text" class="form-control mt-1" id="" />
                    <input type="text" class="form-control mt-1" id="" />
                    <input type="tel" class="form-control mt-1" id="" />

                  </div>

                  <div className='col-1'></div>

                  <div class="col-1 ">

                    <div><label class="form-label mt-3">Phone</label></div>
                    <div><label class="form-label mt-2">Email</label></div>

                  </div>
                  <div class="col-4">

                    <input type="tel" class="form-control mt-1" id="" />
                    <input type="email" class="form-control mt-1" id="" />

                  </div>
                </div>
              </div>
          

      </div>

    </div >

  );

}




export default StaffMaster;