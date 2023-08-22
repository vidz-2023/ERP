import React, { useEffect, useState } from "react";
import { FaBook, FaRupeeSign } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MaterialVendorDeleteEdit from "./MaterialVendorDeleteEdit";
import {
  addMaterialVendorConfigData,
  getMaterialVendorConfigData,
  getMaterialVendorDataByMaterialCode,
  getMaterialVendorDataByName,
  getMaterialVendorDetailsData,
  updateMaterialVendorConfigData,
} from "../../../../services/materialVendorConfigService";
import { getRawMaterialData } from "../../../../services/rawMaterialService";
import { useNavigate, useParams } from "react-router-dom";
import { getVendorMaster } from "../../../../services/vendorMasterServices";

const MaterialVendorConfiguration = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const inputFields = {
    vendorName: "",
    materialId: "",
    materialName: "",
    standardPrice: "",
    minimumDaysRemain: "",
    minimumQuantity: "",
    invoiceDate: "",
    paymentMethod: "",
    discount: "",
    amount: "",
  };

  const [materialVendorConfig, setMaterialVendorConfig] = useState(inputFields);
  const [materialNameList, setMaterialNameList] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [materialCode, setMaterialCode] = useState(0);
  const [vendorData, setVendorData] = useState();
  const [vendorNameList, setVendorNameList] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    getMaterialVendorData(materialId);
    handleMaterialVendorData();
  }, []);

  const getMaterialVendorData = (materialId) => {
    console.log(materialId)
    getRawMaterialData().then((resName) => {
      console.log(resName.data);
      setMaterialNameList(resName.data);
      if(materialId !== "0"){
        getMaterialVendorDataByMaterialCode(materialId).then(resById =>{
          console.log(resById.data[0])
          setMaterialVendorConfig(resById.data[0])
          setMaterialCode(resById.data[0].materialId)
          setMaterialName(resById.data[0].materialName)
          setVendorName(resById.data[0].vendorName)
          materialVendorConfig.paymentMethod = resById.data[0].paymentMethod
        })
        setIsUpdate(true)
      }
      setMaterialVendorConfig({
        ...materialVendorConfig,
        materialId: materialCode,
      });
    });
    getVendorMaster().then((vendorRes) => {
      console.log(vendorRes.data);
      setVendorNameList(vendorRes.data);
    });
  };

  const handleMaterialVendorData = () => {
    // getMaterialVendorDetailsData().then((res) => {
    //   console.log(res.data);
    //   setVendorData(res.data);
    // });
  };

  const column = [
    {
      headerName: "Vendor Id",
      field: "vendorId",
    },
    {
      headerName: "Vendor Name",
      field: "vendorName",
    },
    {
      headerName: "material Id",
      field: "materialId",
    },
    {
      headerName: "material Name",
      field: "materialName",
    },
    {
      headerName: "invoiceDate",
      field: "invoiceDate",
    },
    {
      headerName: "paymentMethod",
      field: "paymentMethod",
    },
    {
      headerName: "amount",
      field: "amount",
    },
    {
      headerName: "Action",
      field: "vendorId",
      cellRenderer: MaterialVendorDeleteEdit,
      cellRendererParams: {
        funGetmaterialVendor: handleMaterialVendorData,
      },
    },
  ];

  // this way not to repeatedly write with all column
  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

  const materialVendorConfigValidationSchema = Yup.object({
    vendorName: Yup.string(),
    materialId: Yup.string(),
    materialName: Yup.string(),
    standardPrice: Yup.string().required("Standard price is required"),
    minimumDaysRemain: Yup.string().required("Minimum Days Remain is required"),
    minimumQuantity: Yup.string().required("Minimum Quantity is required"),
    invoiceDate: Yup.string().required("Invoice date is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    discount: Yup.string().required("Discount is required"),
    amount: Yup.string().required("Amount is required"),
  });

  const funGetMaterialByName = (data) => {
    getMaterialVendorDataByName(data).then((res) => {
      const updateMaterialName = res.data[0].materialId;
      getMaterialVendorData(updateMaterialName);
      setMaterialCode(updateMaterialName);
    });
  };

  const onMatVendorConfigHandler = (e, setFieldValue) => {
    const { name, value } = e.target;
    if (e.target.name === "materialName") {
      setFieldValue("materialName", value);
      console.log(e.target.value);
      setMaterialName(e.target.value);
      value && funGetMaterialByName(value);
    }
    if (e.target.name === "vendorName") {
      setFieldValue("vendorName", value);
      console.log(e.target.value);
      setVendorName(e.target.value);
    }
    setMaterialVendorConfig({ ...materialVendorConfig, [name]: value });
    setFieldValue([name], value);
  };

  const materialVendorConfigHandleSubmit = () => {
    materialVendorConfig.materialId = materialCode;
    materialVendorConfig.materialName = materialName;
    materialVendorConfig.vendorName = vendorName;
    console.log(materialVendorConfig);
    if (!isUpdate) {
      addMaterialVendorConfigData(materialVendorConfig).then((res) => {
        console.log(res.data)
        navigate("/materialVendorConfig")
      })
    } else {
      updateMaterialVendorConfigData(materialVendorConfig).then(res => {
        console.log(res.data)
      })
    }
  };

  return (
    <>
      <div className="container mt-3 mb-5">
        <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
          <div className="m-2">
            <FaBook className="me-2" />
            Material Vendor Configuration
          </div>
        </h4>
        <div>
          <Formik
            onSubmit={materialVendorConfigHandleSubmit}
            initialValues={materialVendorConfig}
            validationSchema={materialVendorConfigValidationSchema}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="mt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-2">
                      <label
                        htmlFor="materialId"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Material Id<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="materialId"
                          className="form-control form-control-sm"
                          value={materialCode}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                          disabled
                        />
                        <ErrorMessage
                          name="materialId"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="materialName"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Material Name<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          component="select"
                          name="materialName"
                          className="form-select form-select-sm"
                          value={materialName}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          {materialNameList &&
                            materialNameList.map((item) => {
                              return (
                                <option key={item.id} value={item.materialName}>
                                  {item.materialName}
                                </option>
                              );
                            })}
                        </Field>
                        <ErrorMessage
                          name="materialName"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    {/* <button
                      type="button"
                      className="w-25 mt-4 mb-4 btn btn-info"
                      onClick={() => handleMaterialVendorData()}
                    >
                      Get Vendor
                    </button> */}
                  </div>

                  <div className="col-md-6">
                    {/* <div className="row">
                      <label
                        htmlFor="vendorId"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Vendor Id<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          name="vendorId"
                          value={materialVendorConfig.vendorId}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="vendorId"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div> */}
                    <div className="row mb-2">
                      <label
                        htmlFor="vendorName"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Vendor Name<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          component="select"
                          name="vendorName"
                          className="form-select form-select-sm"
                          value={vendorName}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          {vendorNameList &&
                            vendorNameList.map((item) => {
                              return (
                                <option key={item.id} value={item.firstName}>
                                  {item.firstName} {item.lastName}
                                </option>
                              );
                            })}
                        </Field>
                        <ErrorMessage
                          name="materialName"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="standardPrice"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Standard Price<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          name="standardPrice"
                          value={materialVendorConfig.standardPrice}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="standardPrice"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="minimumDaysRemain"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Minimum Days Remain
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          name="minimumDaysRemain"
                          value={materialVendorConfig.minimumDaysRemain}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="standardPrice"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="minimumQuantity"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Minimum Quantity<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          name="minimumQuantity"
                          value={materialVendorConfig.minimumQuantity}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="standardPrice"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <label
                        htmlFor="invoiceDate"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Invoice Date
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <Field
                            type="date"
                            name="invoiceDate"
                            className="form-control form-control-sm"
                            value={materialVendorConfig.invoiceDate}
                            onChange={(e) =>
                              onMatVendorConfigHandler(e, setFieldValue)
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="invoiceDate"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="paymentMethod"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Payment Method
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="paymentMethod"
                          className="form-select form-select-sm mb-1"
                          value={materialVendorConfig.paymentMethod}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Cash">Cash</option>
                          <option value="Credit">Credit</option>
                        </Field>
                        <ErrorMessage
                          name="paymentMethod"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="discount"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Discount<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="discount"
                          className="form-control form-control-sm"
                          value={materialVendorConfig.discount}
                          onChange={(e) =>
                            onMatVendorConfigHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="discount"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="amount"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Amount<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <FaRupeeSign />
                          </span>
                          <Field
                            type="text"
                            name="amount"
                            className="form-control form-control-sm"
                            value={materialVendorConfig.amount}
                            onChange={(e) =>
                              onMatVendorConfigHandler(e, setFieldValue)
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="materialName"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <button type="submit" className="w-25 mt-4 mb-4 btn btn-info">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* Vendor table */}
        <div className="ag-theme-alpine" style={{ height: 300 }}>
          <AgGridReact
            rowData={vendorData}
            columnDefs={column}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  );
};

export default MaterialVendorConfiguration;
