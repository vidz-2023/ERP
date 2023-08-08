import React from "react";
import { FaBook } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RawMaterial = () => {
  const rawMaterial = {
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
      minStockAllowed: ""
  };

  const rawMaterialvalidationSchema = Yup.object({});

  const rawMaterialHandleSubmit = () => {};
  
  const onRawMaterialHandler = (e, setFieldValue) => {};

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
                          value=""
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
                          type="number"
                          name="materialName"
                          className="form-control form-control-sm"
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
                        >
                            <option value="">Select</option>
                        </Field>
                        <ErrorMessage
                          name="materialCategory"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label htmlFor="desc" className="col-sm-4 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="textarea"
                          name="desc"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage name="desc" className="text-danger" />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="unitMeasure"
                        className="col-sm-4 col-form-label"
                      >
                        Basic Unit of Measure
                      </label>
                      <div className="col-sm-8">
                        <Field
                          as="select"
                          name="unitMeasure"
                          className="form-select form-select-sm"
                        >
                            <option value="">Select</option>
                        </Field>
                        <ErrorMessage
                          name="VoucherNo"
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
                        >
                            <option value="">Select</option>
                        </Field>
                        <ErrorMessage
                          name="storageArea"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="minpurquantity"
                        className="col-sm-4 col-form-label"
                      >
                        Minimum Purchase Quantity
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="minpurquantity"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="minpurquantity"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="remaindays"
                        className="col-sm-4 col-form-label"
                      >
                        Remainder days
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="remaindays"
                          className="form-control form-control-sm mb-1"
                        />
                        <Field
                          type="text"
                          name="remaindays"
                          className="form-control form-control-sm mb-1"
                        />
                        <Field
                          type="text"
                          name="remaindays"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="remaindays"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    
                  </div>

                  <div className="col-md-6">
                    
                    <div className="row">
                      <label
                        htmlFor="minOrderWt"
                        className="col-sm-4 col-form-label"
                      >
                        Minimum Order Weight
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="minOrderWt"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="minOrderWt"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="maxOrderWt"
                        className="col-sm-4 col-form-label"
                      >
                        Maximum Order Weight
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="maxOrderWt"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="maxOrderWt"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label
                        htmlFor="stValuepUnit"
                        className="col-sm-4 col-form-label"
                      >
                        Standard Value per Unit
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="stValuepUnit"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="stValuepUnit"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <label
                        htmlFor="maxstockallowed"
                        className="col-sm-4 col-form-label"
                      >
                        Maximum stock allowed
                      </label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          name="maxstockallowed"
                          className="form-control form-control-sm"
                        />
                        <ErrorMessage
                          name="maxstockallowed"
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
                        />
                        <ErrorMessage
                          name="maxStockAllowed"
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
