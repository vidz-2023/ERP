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

const RawMaterial = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { materialCode } = useParams();
  const navigate = useNavigate();

  const rawInputFields = {
    materialCode: "",
    materialName: "",
    materialCategory: "",
    description: "",
    basicUnitOfMeasure: "",
    storageArea: "",
    minimumPurchaseQuantity: "",
    remainderDays: "",
    minOrderWeight: "",
    maxOrderWeight: "",
    standardValuePerUnit: "",
    maxStockAllowed: "",
    minStockAllowed: "",
  };

  const [rawMaterial, setRawMaterial] = useState(rawInputFields);

  useEffect(() => {
    getRawDataByMaterialCode();
  }, []);

  const getRawDataByMaterialCode = () => {
    console.log(materialCode);
    if (materialCode) {
      getRawMaterialDataByMaterialCode(materialCode).then((res) => {
        console.log(res.data[0]);
        setRawMaterial(res.data[0]);
      });
      setIsUpdate(true);
    }
  };

  const rawMaterialvalidationSchema = Yup.object({
    materialCode: Yup.string().required("Material code is required"),
    materialName: Yup.string().required("Material name required"),
    materialCategory: Yup.string().required("Material category required"),
    description: Yup.string(),
    basicUnitOfMeasure: Yup.string().required("Unit of measure required"),
    storageArea: Yup.string().required("Storage area field required"),
    minimumPurchaseQuantity: Yup.string().required(
      "Minimum Purchase Quantity required"
    ),
    remainderDays: Yup.string(),
    minOrderWeight: Yup.string().required("Min Order Weight required"),
    maxOrderWeight: Yup.string().required("Max Order Weight required"),
    standardValuePerUnit: Yup.string().required(
      "Standard Value Per Unit required"
    ),
    maxStockAllowed: Yup.string().required("Max Stock Allowed required"),
    minStockAllowed: Yup.string().required("Min Stock Allowed required"),
  });

  const onRawMaterialHandler = (e, setFieldValue) => {
    const { name, value } = e.target;
    setRawMaterial({ ...rawMaterial, [name]: value });
    setFieldValue([name], value);
  };

  const rawMaterialHandleSubmit = () => {
    console.log(rawMaterial);
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
                    <div className="row">
                      <label
                        htmlFor="materialCode"
                        className="col-sm-4 col-form-label"
                      >
                        Material Code
                      </label>
                      <div className="col-sm-8">
                        <Field
                          className="form-control form-control-sm"
                          type="text"
                          name="materialCode"
                          value={rawMaterial.materialCode}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="materialCode"
                          className="text-danger"
                        />
                      </div>
                      {/* {isUpdate && (
                          <div className="col-sm-8">
                            <Field
                              type="text"
                              className="form-control form-control-sm"
                              name="empCode"
                              value={expenseClaimRequest.empCode}
                              disabled
                            />
                          </div>
                        )} */}
                    </div>
                    <div className="row">
                      <label
                        htmlFor="materialName"
                        className="col-sm-4 col-form-label"
                      >
                        Material Name
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="category"
                        className="col-sm-4 col-form-label"
                      >
                        Material Category
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
                          <option value="Spices">Spices</option>
                        </Field>
                        <ErrorMessage
                          name="materialCategory"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="description"
                        className="col-sm-4 col-form-label"
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
                    <div className="row">
                      <label
                        htmlFor="basicUnitOfMeasure"
                        className="col-sm-4 col-form-label"
                      >
                        Basic Unit of Measure
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="storageArea"
                        className="col-sm-4 col-form-label"
                      >
                        Storage Area
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="minimumPurchaseQuantity"
                        className="col-sm-4 col-form-label"
                      >
                        Minimum Purchase Quantity
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="minimumPurchaseQuantity"
                          className="form-control form-control-sm"
                          value={rawMaterial.minimumPurchaseQuantity}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="minimumPurchaseQuantity"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="remainderDays"
                        className="col-sm-4 col-form-label"
                      >
                        Remainder days
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="remainderDays"
                          className="form-control form-control-sm mb-1"
                          value={rawMaterial.remainderDays}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <Field
                          type="text"
                          name="remainderDays"
                          className="form-control form-control-sm mb-1"
                          value={rawMaterial.remainderDays}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <Field
                          type="text"
                          name="remainderDays"
                          className="form-control form-control-sm"
                          value={rawMaterial.remainderDays}
                          onChange={(e) =>
                            onRawMaterialHandler(e, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="remainderDays"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row">
                      <label
                        htmlFor="minOrderWeight"
                        className="col-sm-4 col-form-label"
                      >
                        Minimum Order Weight
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="maxOrderWeight"
                        className="col-sm-4 col-form-label"
                      >
                        Maximum Order Weight
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="standardValuePerUnit"
                        className="col-sm-4 col-form-label"
                      >
                        Standard Value per Unit
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group mb-3">
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
                        />
                      </div>
                    </div>

                    <div className="row">
                      <label
                        htmlFor="maxStockAllowed"
                        className="col-sm-4 col-form-label"
                      >
                        Maximum stock allowed
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
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="minStockAllowed"
                        className="col-sm-4 col-form-label"
                      >
                        Minimum stock allowed
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
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <button
                    type="submit"
                    id="expenseRequestBtn"
                    className="w-25 mt-4 mb-4 btn btn-info"
                  >
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
