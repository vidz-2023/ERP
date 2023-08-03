import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  addExpenseClaim,
  addExpenseClaimDetail,
  getExpenseClaimByExpenseCode,
  getExpenseClaimDetailByEmpCode,
  getExpenseClaimDetailByExpenseCode,
  updateExpenseClaim,
  updateExpenseClaimDetail,
} from "../../../../services/ExpenseclaimService";
import { useNavigate, useParams } from "react-router-dom";
import RightMarkComponent from "../../../../share/RightMarkComponet";
import CrossMarkComponent from "../../../../share/CrossMarkComponent";
import PlusSignComponent from "../../../../share/PlusSignComponent";
import { getBasicInfo } from "../../../../services/basicInfoServices";

function ExpenseClaim() {
  const [isUpdate, setIsUpdate] = useState(false);
  const { ClaimNo } = useParams();
  const [empCodeExpense, setEmpCodeExpense] = useState([]);
  const [expenseDetail, setExpenseDetail] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const navigate = useNavigate()

  const inputFields = {
    empCode: "",
    ClaimNo: "",
    Branch: "",
    Date: "",
    VoucherNo: "",
    Narration: "",
    expenseStatus: "",
    claimdate: "",
    processdate: "",
    ApprovedBy: "",
    creditGL: "",
    TotalAmount: "",
    ChequeNo: "",
    NEFTNo: "",
    CostCenter: "",
  };

  const expenseDetailInputFields = {
    empcode: "",
    expenseclaimcode: "",
    billno: "",
    amountSpent: "",
    Remarks: "",
    bilimage: "",
    ApprovedAmount: "",
    ApproveRemark: "",
    CostCenter: "",
    status: "",
  };

  const [expenseClaimRequest, setExpenseClaimRequest] = useState(inputFields);
  const [expenseClaimApproval, setExpenseClaimApproval] = useState(
    expenseDetailInputFields
  );

  useEffect(() => {
    getDataByEmpCode();
  }, []);

  const getDataByEmpCode = async () => {
    console.log(ClaimNo);
    if (ClaimNo > 0) {
      await getExpenseClaimByExpenseCode(ClaimNo).then((res) => {
        console.log(res);
        setExpenseClaimRequest(res);
        getExpenseClaimDetails(res.ClaimNo);
        handleExpenseDetail(res.empCode);

        // expenseClaimRequest.empCode = res.empCode;
        expenseClaimApproval.empcode = res.empCode;
        expenseClaimApproval.expenseclaimcode = res.ClaimNo;
      });
      setIsUpdate(true);
    } else {
      getBasicInfo().then((res) => {
        console.log(res.data);
        setEmpCodeExpense(res.data);
      });
    }
  };

  const handleExpenseDetail = (empCode) => {
    //console.log(empCode);
    getExpenseClaimDetailByEmpCode(empCode).then((res) => {
      console.log(res.data);
      setExpenseDetail(res.data);
    });
  };

  const handleTotalAmount = () =>{

  }

  const validationSchema = Yup.object({
    empCode: Yup.string().required("Employee code is required"),
    ClaimNo: Yup.string().required("Claim No is required"),
    Branch: Yup.string().required("Branch Name is required"),
    Date: Yup.string().required("Date is required"),
    VoucherNo: Yup.string().required("Voucherno is required"),
    Narration: Yup.string(),
    expenseStatus: Yup.string().required("Expensestatus is required"),
    claimdate: Yup.string().required("Claim date is required"),
    processdate: Yup.string().required("Process date is required"),
    ApprovedBy: Yup.string().required("Approved by field is required"),
    // creditGL: Yup.string(),
    // TotalAmount: Yup.string().required("Total amount is required"),
    // ChequeNo: Yup.string(),
    // NEFTNo: Yup.string(),
    // CostCenter: Yup.string(),
  });

  const expenseDetailValidationSchema = Yup.object({
    empcode: Yup.string(),
    expenseclaimcode: Yup.string(),
    billno: Yup.string().required("Bill no is required"),
    amountSpent: Yup.string().required("AmountSpent is required"),
    Remarks: Yup.string(),
    bilimage: Yup.string(),
    ApprovedAmount: Yup.string().required("Approved Amount is required"),
    ApproveRemark: Yup.string(),
    CostCenter: Yup.string(),
    status: Yup.string(),
  });

  const columns = [
    {
      headerName: "S.No",
      field: "Sno",
      cellRenderer: PlusSignComponent,
    },
    {
      headerName: "Employee Code",
      field: "empcode",
    },
    {
      headerName: "Ex Claim Code",
      field: "expenseclaimcode",
    },
    {
      headerName: "Bill No",
      field: "billno",
    },
    {
      headerName: "Bill Image",
      field: "bilimage",
    },
    {
      headerName: "Amount Spent",
      field: "amountSpent",
    },
    {
      headerName: "Remarks",
      field: "Remarks",
    },
    {
      headerName: "Approved Amount",
      field: "ApprovedAmount",
    },
    {
      headerName: "Approve Remark",
      field: "ApproveRemark",
    },
    {
      headerName: "Cost Center",
      field: "CostCenter",
    },
    {
      headerName: "Status",
      field: "status",
      cellRendererSelector: (p) => {
        //console.log(p)
        if (p.value == "Approved") {
          return { component: RightMarkComponent };
        }
        if (p.value == "Rejected") {
          return { component: CrossMarkComponent };
        }
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

  const onExpenseClaimHandler = (e, setFieldValue) => {
    const { name, value } = e.target;
    setExpenseClaimRequest({ ...expenseClaimRequest, [name]: value });
    setFieldValue([name], value);
  };

  const expenseClaimHandleSubmit = () => {
    console.log(expenseClaimRequest);
    setExpenseClaimApproval({
      ...expenseClaimApproval,
      empcode: expenseClaimRequest.empCode,
      expenseclaimcode: expenseClaimRequest.ClaimNo,
    });

    if (!isUpdate) {
      addExpenseClaim(expenseClaimRequest);
      handleExpenseDetail(expenseClaimRequest.empCode)
      alert("Data added successfully");
    } else {
      let id = expenseClaimRequest.id;
      updateExpenseClaim(expenseClaimRequest, id);
      alert("Data updated successfully");
    }

    document.getElementById("expenseRequestBtn").disabled = true
    document.getElementById("expenseClaimDetail-tab").setAttribute("data-bs-toggle", "tab")
  };

  const onExpenseDetailHandler = (e, setFieldValue) => {
    const { name, value } = e.target;
    setExpenseClaimApproval({ ...expenseClaimApproval, [name]: value });
    setFieldValue([name], value);
  };

  const expenseDetailhandleSubmit = () => {
    console.log(expenseClaimApproval);
    // expenseClaimApproval.empcode = expenseClaimRequest.empCode;
    // expenseClaimApproval.expenseclaimcode = expenseClaimRequest.ClaimNo;
    if (isAdd) {
      updateExpenseClaimDetail(expenseClaimApproval);
    } else {
      addExpenseClaimDetail(expenseClaimApproval);
      handleExpenseDetail(expenseClaimApproval.empcode)
      alert("Data added successfully");
    }
  };

  const getExpenseClaimDetails = (claimcode) => {
    getExpenseClaimDetailByExpenseCode(claimcode).then((res) => {
      console.log(res.data);
      if (res.data[0]) {
        setExpenseClaimApproval(res.data[0]);
        // expenseClaimApproval.empcode = res.data[0].empcode;
        // expenseClaimApproval.expenseclaimcode = res.data[0].expenseclaimcode;
        setIsAdd(true);
      }
      //else {
      //   expenseClaimApproval.empcode = expenseClaimRequest.empCode;
      //   expenseClaimApproval.expenseclaimcode = expenseClaimRequest.ClaimNo;
      // }
    });
  };

  return (
    <>
      <div className="container mt-3 mb-5">
        <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
          <div className="m-2">
            <FaBook className="me-2" />
            Expense Claim Form
          </div>
        </h4>
        {/* Tabs Section */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-info active"
              id="expenseclaim-tab"
              data-bs-toggle="tab"
              data-bs-target="#expenseclaim-tab-pane"
              type="button"
              role="tab"
              aria-controls="expenseclaim-tab-pane"
              aria-selected="true"
            >
              Expense Claim Request
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-info"
              id="expenseClaimDetail-tab"
              data-bs-target="#expenseclaimDetail-tab-pane"
              type="button"
              role="tab"
              aria-controls="expenseclaimDetail-tab-pane"
              aria-selected="false"
            >
              Expense Claim Approval
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="expenseclaim-tab-pane"
            role="tabpanel"
            aria-labelledby="expenseclaim-tab"
            tabIndex="0"
          >
            <Formik
              onSubmit={expenseClaimHandleSubmit}
              initialValues={expenseClaimRequest}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="empCode"
                          className="col-sm-4 col-form-label"
                        >
                          Emp Code
                        </label>
                        {!isUpdate && (
                          <div className="col-sm-8">
                            <Field
                              className="form-select form-select-sm"
                              component="select"
                              name="empCode"
                              value={expenseClaimRequest.empCode}
                              onChange={(e) =>
                                onExpenseClaimHandler(e, setFieldValue)
                              }
                            >
                              <option value="">Select</option>
                              {empCodeExpense.map((item) => {
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
                              value={expenseClaimRequest.empCode}
                              disabled
                            />
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <label
                          htmlFor="claimno"
                          className="col-sm-4 col-form-label"
                        >
                          ClaimNo
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="number"
                            name="ClaimNo"
                            value={expenseClaimRequest.ClaimNo}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                            className="form-control form-control-sm"
                          />
                          <ErrorMessage
                            name="ClaimNo"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="Branch"
                          className="col-sm-4 col-form-label"
                        >
                          Branch
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="Branch"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.Branch}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="Branch" className="text-danger" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="Date"
                          className="col-sm-4 col-form-label"
                        >
                          Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="date"
                            name="Date"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.Date}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="Date" className="text-danger" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="VoucherNo"
                          className="col-sm-4 col-form-label"
                        >
                          Voucher No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="VoucherNo"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.VoucherNo}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="VoucherNo"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="Narration"
                          className="col-sm-4 col-form-label"
                        >
                          Narration
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="Narration"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.Narration}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="Narration"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="expenseStatus"
                          className="col-sm-4 col-form-label"
                        >
                          Expense Status
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="expenseStatus"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.expenseStatus}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="expenseStatus"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="claimdate"
                          className="col-sm-4 col-form-label"
                        >
                          Claim Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="date"
                            name="claimdate"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.claimdate}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="claimdate"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="processdate"
                          className="col-sm-4 col-form-label"
                        >
                          Process Date
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="date"
                            name="processdate"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.processdate}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="processdate"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ApprovedBy"
                          className="col-sm-4 col-form-label"
                        >
                          Approved By
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="ApprovedBy"
                            className="form-control form-control-sm"
                            value={expenseClaimRequest.ApprovedBy}
                            onChange={(e) =>
                              onExpenseClaimHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="ApprovedBy"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      {/* <div className='row'>
                      <label
                        htmlFor='creditGL'
                        className='col-sm-4 col-form-label'
                      >
                        Credit GL
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='creditGL'
                          className='form-control form-control-sm'
                          value={expenseClaim.creditGL}
                          onChange={e =>
                            onExpenseClaimHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage name='creditGL' className='text-danger' />
                      </div>
                    </div> */}
                      {/* <div className='row'>
                      <label
                        htmlFor='TotalAmount'
                        className='col-sm-4 col-form-label'
                      >
                        Total Amount
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='TotalAmount'
                          className='form-control form-control-sm'
                          value={expenseClaim.TotalAmount}
                          onChange={e =>
                            onExpenseClaimHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name='TotalAmount'
                          className='text-danger'
                        />
                      </div>
                    </div> */}
                      {/* <div className='row'>
                      <label
                        htmlFor='ChequeNo'
                        className='col-sm-4 col-form-label'
                      >
                        Cheque No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='ChequeNo'
                          className='form-control form-control-sm'
                          value={expenseClaim.ChequeNo}
                          onChange={e =>
                            onExpenseClaimHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage name='ChequeNo' className='text-danger' />
                      </div>
                    </div> */}
                      {/* <div className='row'>
                      <label
                        htmlFor='NEFTNo'
                        className='col-sm-4 col-form-label'
                      >
                        NEFT No
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='NEFTNo'
                          className='form-control form-control-sm'
                          value={expenseClaim.NEFTNo}
                          onChange={e =>
                            onExpenseClaimHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage name='NEFTNo' className='text-danger' />
                      </div>
                    </div> */}
                      {/* <div className='row'>
                      <label
                        htmlFor='CostCenter'
                        className='col-sm-4 col-form-label'
                      >
                        Cost Center
                      </label>
                      <div className='col-sm-8'>
                        <Field
                          type='text'
                          name='CostCenter'
                          className='form-control form-control-sm'
                          value={expenseClaim.CostCenter}
                          onChange={e =>
                            onExpenseClaimHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name='CostCenter'
                          className='text-danger'
                        />
                      </div>
                    </div> */}
                    </div>
                  </div>

                  <div className="row justify-content-md-center">
                    <button
                      type="submit"
                      id="expenseRequestBtn"
                      className="w-25 mt-4 mb-4 btn btn-info"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div
            className="tab-pane fade"
            id="expenseclaimDetail-tab-pane"
            role="tabpanel"
            aria-labelledby="expenseclaimDetail-tab"
            tabIndex="0"
          >
            <Formik
              onSubmit={expenseDetailhandleSubmit}
              initialValues={expenseClaimApproval}
              validationSchema={expenseDetailValidationSchema}
              enableReinitialize
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="empCode"
                          className="col-sm-4 col-form-label"
                        >
                          Emp Code
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            id="ecode"
                            name="empcode"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.empcode}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                            disabled
                          />
                          <ErrorMessage
                            name="empcode"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="expenseclaimcode"
                          className="col-sm-4 col-form-label"
                        >
                          Expense Claim Code
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            id="claimCode"
                            name="expenseclaimcode"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.expenseclaimcode}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                            disabled
                          />
                          <ErrorMessage
                            name="expenseclaimcode"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="billno"
                          className="col-sm-4 col-form-label"
                        >
                          Bill No
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="billno"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.billno}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage name="billno" className="text-danger" />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="bilimage"
                          className="col-sm-4 col-form-label"
                        >
                          Bill Image
                        </label>
                        <div className="col-sm-8">
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              id="button-addon2"
                            >
                              Browse
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="amountSpent"
                          className="col-sm-4 col-form-label"
                        >
                          Amount Spent
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="number"
                            name="amountSpent"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.amountSpent}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="amountSpent"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="row">
                        <label
                          htmlFor="ApprovedAmount"
                          className="col-sm-4 col-form-label"
                        >
                          Approved Amount
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="number"
                            name="ApprovedAmount"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.ApprovedAmount}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="ApprovedAmount"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="ApproveRemark"
                          className="col-sm-4 col-form-label"
                        >
                          Approve Remark
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="ApproveRemark"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.ApproveRemark}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="ApproveRemark"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="CostCenter"
                          className="col-sm-4 col-form-label"
                        >
                          Cost Center
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="CostCenter"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.CostCenter}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="CostCenter"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="Remarks"
                          className="col-sm-4 col-form-label"
                        >
                          Remarks
                        </label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            name="Remarks"
                            className="form-control form-control-sm"
                            value={expenseClaimApproval.Remarks}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name="Remarks"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label
                          htmlFor="status"
                          className="col-sm-4 col-form-label"
                        >
                          Status
                        </label>
                        <div className="col-sm-8">
                          <Field
                            as="select"
                            name="status"
                            className="form-select form-select-sm"
                            value={expenseClaimApproval.status}
                            onChange={(e) =>
                              onExpenseDetailHandler(e, setFieldValue)
                            }
                          >
                            <option value="">Select</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </Field>
                          <ErrorMessage name="status" className="text-danger" />
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
            <div className="row">
              <p>Total Amount Request</p>
              <p>Total Amount Approval</p>
            </div>
            <div className="ag-theme-alpine" style={{ height: 200 }}>
              <AgGridReact
                rowData={expenseDetail}
                columnDefs={columns}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpenseClaim;
