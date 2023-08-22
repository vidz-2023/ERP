import React, { useEffect, useState } from "react";
import { FaBook, FaRupeeSign } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  addRawMaterialData,
  getRawMaterialDataByMaterialCode,
  updateRawMaterialData,
} from "../../../../services/rawMaterialService";
import { useNavigate, useParams } from "react-router-dom";
import { getVendorMaster, getVendorMasterDataByName } from "../../../../services/vendorMasterServices";

const RawMaterial = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { materialId } = useParams();
  const navigate = useNavigate();

  const rawInputFields = {
    materialId: "",
    materialName: "",
    vendorId: "",
    vendorName: "",
    materialCategory: "",
    description: "",
    basicUnitOfMeasure: "",
    storageArea: "",
    minimumPurchaseQuantity: "",
    remainderDays1: "",
    remainderDays2: "",
    remainderDays3: "",
    minOrderWeight: "",
    maxOrderWeight: "",
    standardValuePerUnit: "",
    maxStockAllowed: "",
    minStockAllowed: "",
  };

  const [rawMaterial, setRawMaterial] = useState(rawInputFields);
  const [vendorNameList, setVendorNameList] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [vendorId, setVendorId] = useState(0);
  const [remainDays1, setRemainDays1] = useState();
  const [remainDays2, setRemainDays2] = useState();
  const [remainDays3, setRemainDays3] = useState();
  const [basicUnit, setBasicUnit] = useState()

  useEffect(() => {
    getRawDataByMaterialCode();
  }, []);

  const getRawDataByMaterialCode = () => {
    console.log(materialId);
    if (materialId) {
      getRawMaterialDataByMaterialCode(materialId).then((res) => {
        console.log(res.data[0]);
        setRawMaterial(res.data[0]);
        setVendorId(res.data[0].vendorId)
        setVendorName(res.data[0].vendorName)
      });
      setIsUpdate(true);
    }
    getVendorMaster().then((vendorRes) => {
      console.log(vendorRes.data);
      setVendorNameList(vendorRes.data);
    });
  };

  const rawMaterialvalidationSchema = Yup.object({
    materialId: Yup.string().required("Material code is required"),
    materialName: Yup.string().required("Material name required"),
    vendorId: Yup.string(),
    vendorName: Yup.string(),
    materialCategory: Yup.string().required("Material category required"),
    description: Yup.string(),
    basicUnitOfMeasure: Yup.string().required("Unit of measure required"),
    storageArea: Yup.string().required("Storage area field required"),
    minimumPurchaseQuantity: Yup.string().required(
      "Minimum Purchase Quantity required"
    ),
    remainderDays1: Yup.string(),
    remainderDays2: Yup.string(),
    remainderDays3: Yup.string(),
    minOrderWeight: Yup.string().required("Min Order Weight required"),
    maxOrderWeight: Yup.string().required("Max Order Weight required"),
    standardValuePerUnit: Yup.string().required(
      "Standard Value Per Unit required"
    ),
    maxStockAllowed: Yup.string().required("Max Stock Allowed required"),
    minStockAllowed: Yup.string().required("Min Stock Allowed required"),
  });

  const funGetVendorByName = (data) => {
    getVendorMasterDataByName(data).then((res) => {
      console.log(res.data[0])
      const updateVendorId = res.data[0].vendorId;
      setVendorId(updateVendorId);
    });
  };

  const onRawMaterialHandler = (e, setFieldValue) => {
    const { name, value } = e.target;
    if (e.target.name === "vendorName") {
      setFieldValue("vendorName", value);
      console.log(e.target.value);
      setVendorName(e.target.value);
      value && funGetVendorByName(value);
    }
    setRawMaterial({ ...rawMaterial, [name]: value });    
    setFieldValue([name], value);
  };

  const rawMaterialHandleSubmit = () => {
    console.log(rawMaterial);
    rawMaterial.vendorId = vendorId;
    rawMaterial.vendorName = vendorName;
    if (!isUpdate) {
      addRawMaterialData(rawMaterial).then((res) => {
        navigate("/rawMaterialTable");
      });
    } else {
      updateRawMaterialData(rawMaterial).then((res) =>
        navigate("/rawMaterialTable")
      );
    }
  };

  return (
    <>
      <div className="container mt-3 mb-5">
        <h4 className="text-info w-100 mb-3 text-center border border-2 border-info-subtle">
          <div className="m-2">
            <FaBook className="me-2" />
            Raw Material
          </div>
        </h4>
        <div>
          <Formik
            onSubmit={rawMaterialHandleSubmit}
            initialValues={rawMaterial}
            validationSchema={rawMaterialvalidationSchema}
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
                          className="form-control form-control-sm"
                          type="text"
                          name="materialId"
                          value={rawMaterial.materialId}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
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
                          type="text"
                          name="materialName"
                          className="form-control form-control-sm"
                          value={rawMaterial.materialName}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="materialName"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
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
                          value={vendorId}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                          disabled
                        />
                        <ErrorMessage
                          name="vendorId"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
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
                            onRawMaterialHandler(e, setFieldValue)
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
                        htmlFor="category"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Material Category<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="materialCategory"
                          className="form-select form-select-sm"
                          value={rawMaterial.materialCategory}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Pulses">Pulses</option>
                          <option value="Rice">Rice</option>
                          <option value="Dairy Products">Dairy Products</option>
                          <option value="Oils">Oils</option>
                          <option value="Spices">Spices</option>
                          <option value="Beverages">Beverages</option>
                        </Field>
                        <ErrorMessage
                          name="materialCategory"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="description"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Description
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="textarea"
                          name="description"
                          className="form-control form-control-sm"
                          value={rawMaterial.description}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="description"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="basicUnitOfMeasure"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Basic Unit of Measure
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="basicUnitOfMeasure"
                          className="form-select form-select-sm"
                          value={rawMaterial.basicUnitOfMeasure}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Piece">Piece</option>
                          <option value="gms">gms</option>
                          <option value="Kg">Kg</option>
                          <option value="tons">tons</option>
                          <option value="liters">liters</option>
                        </Field>
                        <ErrorMessage
                          name="basicUnitOfMeasure"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="storageArea"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Storage Area<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="storageArea"
                          className="form-select form-select-sm"
                          value={rawMaterial.storageArea}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Pune">Pune</option>
                          <option value="PCMC">PCMC</option>
                        </Field>
                        <ErrorMessage
                          name="storageArea"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="minimumPurchaseQuantity"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Minimum Purchase Quantity
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <Field
                            type="text"
                            name="minimumPurchaseQuantity"
                            className="form-control form-control-sm"
                            value={rawMaterial.minimumPurchaseQuantity}
                            onChange={(e) =>
                              onRawMaterialHandler(e, setFieldValue)
                            }
                          />
                          <span className="input-group-text" id="basic-addon1">
                            {basicUnit}
                          </span>
                        </div>
                        <ErrorMessage
                          name="minimumPurchaseQuantity"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="remainderDays1"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Remainder days
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="remainderDays1"
                          className="form-control form-control-sm mb-1"
                          value={rawMaterial.remainderDays1}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        {/* {remainDays1 && (
                          <div className="text-success">Stock is low</div>
                        )} */}
                        <Field
                          type="text"
                          name="remainderDays2"
                          className="form-control form-control-sm mb-1"
                          value={rawMaterial.remainderDays2}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        {/* {remainDays2 && (
                          <div className="text-info">Stock is too low</div>
                        )} */}
                        <Field
                          type="text"
                          name="remainderDays3"
                          className="form-control form-control-sm"
                          value={rawMaterial.remainderDays3}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        {/* {remainDays3 && (
                          <div className="text-danger">Stock is critically low</div>
                        )} */}
                        <ErrorMessage
                          name="remainderDays1"
                          className="text-danger"
                          component="div"
                        />
                        <ErrorMessage
                          name="remainderDays2"
                          className="text-danger"
                          component="div"
                        />
                        <ErrorMessage
                          name="remainderDays3"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row mb-2">
                      <label
                        htmlFor="minOrderWeight"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Minimum Order Weight
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="minOrderWeight"
                          className="form-control form-control-sm"
                          value={rawMaterial.minOrderWeight}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="minOrderWeight"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="maxOrderWeight"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Maximum Order Weight
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="maxOrderWeight"
                          className="form-control form-control-sm"
                          value={rawMaterial.maxOrderWeight}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="maxOrderWeight"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="standardValuePerUnit"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Standard Value per Unit
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <FaRupeeSign />
                          </span>
                          <Field
                            type="text"
                            name="standardValuePerUnit"
                            className="form-control form-control-sm"
                            value={rawMaterial.standardValuePerUnit}
                            onChange={(e) =>
                              onRawMaterialHandler(e, setFieldValue)
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="standardValuePerUnit"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <label
                        htmlFor="maxStockAllowed"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Maximum stock allowed
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="maxStockAllowed"
                          className="form-control form-control-sm"
                          value={rawMaterial.maxStockAllowed}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="maxStockAllowed"
                          className="text-danger"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="minStockAllowed"
                        className="col-sm-4 col-form-label col-form-label-sm"
                      >
                        Minimum stock allowed
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="minStockAllowed"
                          className="form-control form-control-sm"
                          value={rawMaterial.minStockAllowed}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="minStockAllowed"
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
      </div>
    </>
  );
};

export default RawMaterial;
