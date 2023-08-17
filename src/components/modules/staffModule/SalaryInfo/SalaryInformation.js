import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook, FaEdit } from "react-icons/fa";
import {
  addEsiPfInfo,
  addOfficialInfo,
  addbanckInfo,
  getBankDataByEmpCode,
  getEsiDataByEmpCode,
  getOfficialInfo,
  getOfficialInfoById,
  updateOfficialInfo,
} from "../../../../services/salaryInfoService";
import { useNavigate, useParams } from "react-router-dom";
import { getBasicInfo } from "../../../../services/basicInfoServices";

const SalaryInformation = () => {
  const [allEmpCode, setAllEmpCode] = useState();
  const [allEmpCodeList, setAllEmpCodeList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const inputfields = {
    empCode: "",
    CityType: "Metro Default value",
    JoiningDate: "",
    ConfirmationDate: "",
    ProbationMonths: "",
    NoticeDays: "",
    SalaryWages: "",
    Sourcing: "",
    SkillSet: "",
    PANNo: "",
    UANNo: "",
    VoterIDNo: "",
    AadharCardNo: "",
    PassportNo: "",
    PassportValidUpto: "",
    DLNo: "",
    DLValidupto: "",
  };

  const esiinputfields = {
    empCode: "",
    ESIApplication: "",
    PFApplication: "",
    ProfTaxApplicable: "",
    LWFApplicable: "",
    ESINo: "",
    ESIStartDate: "",
    PFNo: "",
    PFStartDate: "",
  };

  const bankinputfields = {
    empCode: "",
    Bank: "",
    Branch: "",
    BankAccountNo: "",
    SwiftCode: "",
    ACHolderName: "",
  };

  const [officialFormValues, setOfficialFormValues] = useState(inputfields);
  const [esiFormValues, setEsiFormValues] = useState(esiinputfields);
  const [bankFormValues, setBankFormValues] = useState(bankinputfields);

  useEffect(() => {
    console.log(id);
    if (id > 0) {
      console.log("edit");
      getOfficialInfoById(id).then((res) => {
        console.log(res);
        setOfficialFormValues(res);
        console.log(res.empCode);
        getEsiInfoData(res.empCode);
        getBankInfoData(res.empCode)
      });
      esiFormValues.empCode = officialFormValues.empCode
      bankFormValues.empCode = officialFormValues.empCode
      document.getElementById("esi-tab").setAttribute("data-bs-toggle", "tab");
      document.getElementById("bank-tab").setAttribute("data-bs-toggle", "tab");
      setIsUpdate(true);
    } else {
      getBasicInfo().then((res) => {
        console.log(res.data);
        setAllEmpCodeList(res.data);
      });
    }
  }, []);

  const validationSchema = Yup.object({
    empCode: Yup.string(),
    CityType: Yup.string(),
    JoiningDate: Yup.string().required("Joining Date is required"),
    ConfirmationDate: Yup.string().required("Confirmation Date is required"),
    ProbationMonths: Yup.string().required("Probation month is required"),
    NoticeDays: Yup.string().required("Notice days is required"),
    SalaryWages: Yup.string().required("Salary is required"),
    // Sourcing: Yup.string().required('Confirmation Date is required'),
    SkillSet: Yup.string().required("Skillset is required"),
    PANNo: Yup.string().required("Pan number is required"),
    UANNo: Yup.string().required("UAN No is required"),
    VoterIDNo: Yup.string().required("Voter Id No is required"),
    AadharCardNo: Yup.string().required("Adhar card No is required"),
    PassportNo: Yup.string().required("Passport No is required"),
    PassportValidUpto: Yup.string().required("Passport Valid Upto is required"),
    DLNo: Yup.string().required("DL no is required"),
    DLValidupto: Yup.string().required("DL valid upto is required"),
  });

  const esivalidationSchema = Yup.object({
    // ESIApplication: Yup.string().required('Joining Date is required'),
    PFApplication: Yup.string().required("PF application is required"),
    ProfTaxApplicable: Yup.string().required(
      "Profession tax apllicable is required"
    ),
    LWFApplicable: Yup.string().required("LWF applicable is required"),
    ESINo: Yup.string().required("ESI no is required"),
    ESIStartDate: Yup.string().required("ESI start date is required"),
    PFNo: Yup.string().required("PF no is required"),
    PFStartDate: Yup.string().required("PF start date is required"),
  });

  const bankvalidationSchema = Yup.object({
    Bank: Yup.string().required("Bank name is required"),
    Branch: Yup.string().required("Branch is required"),
    BankAccountNo: Yup.string().required("Account is required"),
    SwiftCode: Yup.string().required("Ifsc code is required"),
    ACHolderName: Yup.string().required(
      "Please provide the account holder name"
    ),
  });

  const onOfficialHandlerChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setOfficialFormValues({ ...officialFormValues, [name]: value });
    setFieldValue([name], value);
  };

  const onEsiHandlerChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setOfficialFormValues({ ...officialFormValues, [name]: value });
    setFieldValue([name], value);
  };

  const onBanklHandlerChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setOfficialFormValues({ ...officialFormValues, [name]: value });
    setFieldValue([name], value);
  };

  const handleSubmit = () => {
    console.log(officialFormValues);
    setEsiFormValues({ ...esiFormValues, empCode: officialFormValues.empCode})
    // esiFormValues.empCode = officialFormValues.empCode
    if (!isUpdate) {
      addOfficialInfo(officialFormValues).then((res) => console.log(res.data));
    } else {
      updateOfficialInfo(officialFormValues, id);
      alert("Data updated successfully");
      setOfficialFormValues("");
    }
    document.getElementById("officialSubmit").disabled = true;
    document.getElementById("esi-tab").setAttribute("data-bs-toggle", "tab");
  };

  const esihandleSubmit = (values) => {
    console.log(values);
    setBankFormValues({ ...bankFormValues, empCode: officialFormValues.empCode})
    bankFormValues.empCode = officialFormValues.empCode
    if (values) {
      addEsiPfInfo(values).then((res) => console.log(res.data));
    }
    document.getElementById("esiSubmit").disabled = true;
    document.getElementById("bank-tab").setAttribute("data-bs-toggle", "tab");
  };

  const bankhandleSubmit = (values) => {
    console.log(values);
    if (values) {
      addbanckInfo(values).then((res) => console.log(res.data));
      navigate(`/salary-info-table`);
    }
  };

  const getEsiInfoData = (empcode) => {
    console.log(empcode);
    getEsiDataByEmpCode(empcode).then((res) => {
      console.log(res.data);
      if(res.data[0]){
        setEsiFormValues(res.data[0])
      }
    });
  }

  const getBankInfoData = (empcode) => {
    getBankDataByEmpCode(empcode).then((res) => {
      console.log(res.data)
      if(res.data[0]){
        setBankFormValues(res.data[0])
      }
    })
  }

  return (
    <div>
      <div className="container mt-3 mb-5">
        <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
          <div className="m-2">
            <FaBook className="me-2" />
            Salary Information
          </div>
        </h4>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-info active"
              id="official-tab"
              data-bs-toggle="tab"
              data-bs-target="#official-tab-pane"
              type="button"
              role="tab"
              aria-controls="official-tab-pane"
              aria-selected="true"
            >
              Official Information
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-info"
              id="esi-tab"
              data-bs-target="#esi-tab-pane"
              type="button"
              role="tab"
              aria-controls="esi-tab-pane"
              aria-selected="false"
            >
              ESI PF
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-info"
              id="bank-tab"
              data-bs-target="#bank-tab-pane"
              type="button"
              role="tab"
              aria-controls="bank-tab-pane"
              aria-selected="false"
            >
              Bank Details
            </button>
          </li>
        </ul>

        {/* ---------------official information ------------------------ */}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="official-tab-pane"
            role="tabpanel"
            aria-labelledby="official-tab"
            tabIndex="0"
          >
            <Formik
              initialValues={officialFormValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <label
                          htmlFor="empCode"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Emp Code
                        </label>
                        {!isUpdate && (
                          <div className="col-sm-8">
                            <Field
                              className="form-select form-select-sm"
                              component="select"
                              name="empCode"
                              onChange={(e) =>
                                onOfficialHandlerChange(e, setFieldValue)
                              }
                            >
                              <option value="">Select</option>
                              {allEmpCodeList.map((item) => {
                                return (
                                  <option key={item.id} value={item.empCode}>
                                    {item.empCode}
                                  </option>
                                );
                              })}
                            </Field>
                            <ErrorMessage
                              name="empCode"
                              className="text-danger"
                            />
                          </div>
                        )}
                        {isUpdate && (
                          <div className="col-sm-8">
                            <Field
                              type="text"
                              className="form-control form-control-sm"
                              name="empCode"
                              value={officialFormValues.empCode}
                              disabled
                            />
                          </div>
                        )}
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="CityType"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          City Type
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="CityType"
                            as="select"
                            className="form-select form-select-sm"
                            value={officialFormValues.CityType}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value="Metro Default only">
                              Metro Default only
                            </option>
                          </Field>
                          <ErrorMessage
                            name="CityType"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Joining Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="JoiningDate"
                            type="date"
                            className="form-control form-control-sm"
                            value={officialFormValues.JoiningDate}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="JoiningDate"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Confirmation Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="ConfirmationDate"
                            type="date"
                            className="form-control form-control-sm"
                            value={officialFormValues.ConfirmationDate}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="ConfirmationDate"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Probation Months
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="ProbationMonths"
                            type="number"
                            className="form-control form-control-sm"
                            value={officialFormValues.ProbationMonths}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="ProbationMonths"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Notice Days
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="NoticeDays"
                            type="number"
                            className="form-control form-control-sm"
                            value={officialFormValues.NoticeDays}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="NoticeDays"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Salary/Wages
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="SalaryWages"
                            as="select"
                            className="form-select form-select-sm"
                            value={officialFormValues.SalaryWages}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value="">Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Field>
                          <ErrorMessage
                            name="SalaryWages"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Sourcing
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="Sourcing"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.Sourcing}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="Sourcing"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Skill Set
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="SkillSet"
                            as="select"
                            className="form-select form-select-sm"
                            value={officialFormValues.SkillSet}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          >
                            <option value="">Select</option>
                            <option value="html">HTML</option>
                            <option value="css">Css</option>
                            <option value="js">Javascript</option>
                            <option value="react">React</option>
                          </Field>
                          <ErrorMessage name="SkillSet" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          PAN
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="PANNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.PANNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PANNo" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          UAN No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="UANNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.UANNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="UANNo" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          VoterID No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="VoterIDNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.VoterIDNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="VoterIDNo" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Adhar Card No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="AadharCardNo"
                            type="number"
                            className="form-control form-control-sm"
                            value={officialFormValues.AadharCardNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="AadharCardNo" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Passport No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="PassportNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.PassportNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PassportNo" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Passport Valid Upto
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="PassportValidUpto"
                            type="date"
                            className="form-control form-control-sm"
                            value={officialFormValues.PassportValidUpto}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PassportValidUpto" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          DL No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="DLNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={officialFormValues.DLNo}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="DLNo" />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          DL Valid Upto
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="DLValidupto"
                            type="date"
                            className="form-control form-control-sm"
                            value={officialFormValues.DLValidupto}
                            onChange={(e) =>
                              onOfficialHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="DLValidupto"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-md-center">
                    <button
                      type="submit"
                      id="officialSubmit"
                      className="w-25 mt-4 mb-4 btn btn-info"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/*---------------------- ESI PF information-------------- */}
          <div
            className="tab-pane fade"
            id="esi-tab-pane"
            role="tabpanel"
            aria-labelledby="esi-tab"
            tabIndex="0"
          >
            <Formik
              initialValues={esiFormValues}
              onSubmit={esihandleSubmit}
              validationSchema={esivalidationSchema}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mt-3">
                  <h5>ESI/PF Information</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="empCode"
                          className="col-sm-6 col-form-label col-form-label-sm"
                        >
                          Emp Code
                        </label>
                        <div className="col-sm-6">
                          <Field
                            name="empCode"
                            type="text"
                            className="form-control form-control-sm"
                            value={esiFormValues.empCode}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                            disabled
                          />
                          <ErrorMessage
                            name="empCode"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ESIApplication"
                          className="col-sm-6 col-form-label col-form-label-sm"
                        >
                          ESI Application
                        </label>
                        <div className="col-sm-6">
                          <Field
                            className="form-check-input mt-3"
                            type="checkbox"
                            name="ESIApplication"
                            value={esiFormValues.ESIApplication}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="ESIApplication" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="PFApplication"
                          className="col-sm-6 col-form-label col-form-label-sm"
                        >
                          PF Application
                        </label>
                        <div className="col-sm-6">
                          <Field
                            className="form-check-input mt-3"
                            type="checkbox"
                            name="PFApplication"
                            value={esiFormValues.PFApplication}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PFApplication" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ProfTaxApplicableapplicable"
                          className="col-sm-6 col-form-label col-form-label-sm"
                        >
                          Prof. Tax Applicable
                        </label>
                        <div className="col-sm-6">
                          <Field
                            className="form-check-input mt-3"
                            type="checkbox"
                            name="ProfTaxApplicable"
                            value={esiFormValues.ProfTaxApplicable}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="ProfTaxApplicable" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="LWFApplicable"
                          className="col-sm-6 col-form-label col-form-label-sm"
                        >
                          LWF Applicable
                        </label>
                        <div className="col-sm-6">
                          <Field
                            className="form-check-input mt-3"
                            type="checkbox"
                            name="LWFApplicable"
                            value={esiFormValues.LWFApplicable}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="LWFApplicable" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="ESINo"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          ESI No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="ESINo"
                            type="text"
                            className="form-control form-control-sm"
                            value={esiFormValues.ESINo}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="ESINo" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ESIStartDate"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          ESI Start Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="date"
                            name="ESIStartDate"
                            className="form-control form-control-sm"
                            value={esiFormValues.ESIStartDate}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="ESIStartDate" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="PFNo"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          PF No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="PFNo"
                            type="text"
                            className="form-control form-control-sm"
                            value={esiFormValues.PFNo}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PFNo" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="PFStartDate"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          PF Start Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="date"
                            name="PFStartDate"
                            className="form-control form-control-sm"
                            value={esiFormValues.PFStartDate}
                            onChange={(e) =>
                              onEsiHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="PFStartDate" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-md-center">
                    <button
                      type="submit"
                      id="esiSubmit"
                      className="w-25 mt-4 mb-4 btn btn-info"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/*---------------------- Bank information-------------- */}
          <div
            className="tab-pane fade"
            id="bank-tab-pane"
            role="tabpanel"
            aria-labelledby="bank-tab"
            tabIndex="0"
          >
            <Formik
              initialValues={bankFormValues}
              onSubmit={bankhandleSubmit}
              validationSchema={bankvalidationSchema}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="empCode"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Emp Code
                        </label>
                        <div className="col-sm-8">
                          <Field
                            name="empCode"
                            type="text"
                            className="form-control form-control-sm"
                            value={bankFormValues.empCode}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                            disabled
                          />
                          <ErrorMessage
                            name="empCode"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="Bank"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Bank
                        </label>
                        <div className="col-sm-8">
                          <Field
                            as="select"
                            name="Bank"
                            className="form-select form-select-sm"
                            value={bankFormValues.Bank}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                          >
                            <option selected>Select...</option>
                            <option value="HDFC">HDFC</option>
                            <option value="SBI">SBI</option>
                            <option value="IDBI">IDBI</option>
                          </Field>
                          <ErrorMessage name="Bank" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="Branch"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Branch
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="Branch"
                            className="form-control form-control-sm"
                            value={bankFormValues.Branch}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="Branch" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="BankAccountNo"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          Bank Account No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="BankAccountNo"
                            className="form-control form-control-sm"
                            value={bankFormValues.BankAccountNo}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="BankAccountNo" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="Swiftcode"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          IFSC Code
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="SwiftCode"
                            className="form-control form-control-sm"
                            value={bankFormValues.SwiftCode}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="SwiftCode" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ACHolderName"
                          className="col-sm-4 col-form-label col-form-label-sm"
                        >
                          A/c holder Name
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="ACHolderName"
                            className="form-control form-control-sm"
                            value={bankFormValues.ACHolderName}
                            onChange={(e) =>
                              onBanklHandlerChange(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="ACHolderName" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-md-center">
                    <button
                      type="submit"
                      className="w-25 mt-4 mb-4 btn btn-info"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInformation;
