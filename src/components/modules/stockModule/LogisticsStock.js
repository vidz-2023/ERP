import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";

function LogisticsStock({data}) {

    return (
        <>
            <div className="container  mb-2">
               
                    <div className="fs-5 fw-bolder text-info">
                        <FaBook className="me-2" />
                        Logistics
                    </div>
                

                <Formik>
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="mt-3">
                            <div className="row">

                                <div className="col-md-6">

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Destination
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="text"
                                                name=""
                                                className="form-control form-control-sm"
                                            />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Shipping Mode
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name=""
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Road">Road</option>
                                                <option value="Air">Air</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Shipping Company
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                as="select"
                                                name=""
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Company1">Company1</option>
                                                <option value="Company2">Company2</option>
                                            </Field>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Shipping Tracking No
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="text"
                                                name=""
                                                className="form-control form-control-sm"
                                            />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Shipping Date
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="date"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Shipping Charges
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                value = "0"
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Vehicle/Vessel No.
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="text"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                           Charge Type
                                        </label>
                                        <div className="col-sm-8">
                                        <Field
                                                as="select"
                                                name=""
                                                className="form-select form-select-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Paid">Paid</option>
                                                <option value="COD">COD</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Document Through
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="text"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                           No of Packs
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                           Weight
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                           Distance
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                          eWay Invoice No
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                        eWay Invoice Date
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="date"
                                                name=""
                                                className="form-control form-control-sm"
                                            />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                          IRN No
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="number"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                          IRN Cancel Date
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="date"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="col-sm-4 col-form-label">
                                          IRN Cancel Reason
                                        </label>
                                        <div className="col-sm-8">
                                            <Field
                                                type="text"
                                                name=""
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                  

                                </div>

                            </div>


                        </Form>)}
                </Formik>
            </div>
        </>
    )
}

export default LogisticsStock