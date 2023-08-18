import React, { useEffect, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBook } from "react-icons/fa";
import { getStockDataByStockId } from "../../../services/stockService";

function LogisticsStock(props) {


    const initialValue = {
        "destination": "",
        "shippingMode": "",
        "shippingCompany": "",
        "shippingTrackingNo": "",
        "shippingDate": "",
        "shippingCharges": 0,
        "vesselNo": "",
        "chargeType": "",
        "documentThrough": "",
        "noOfPack": "",
        "weight": "",
        "distance": "",
        "eWayInvoiceNo": "",
        "eWayInvoiceDate": "",
        "irnNo": "",
        "irnCancelDate": "",
        "irnCancelReason": ""
    }

    const [formData, setFormData] = useState({})

    useEffect(() => {
        // setFormData({...props.data})
        console.log(props.id)
        if (props.id != 0) {
            console.log()
            getStockDataByStockId(props.id).then(res => {
                delete res.data[0].toBranch
                delete res.data[0].fromBranch
                delete res.data[0].toWarehouse
                delete res.data[0].fromWarehouse
                delete res.data[0].requestDate
                delete res.data[0].requestNo
                delete res.data[0].remark
                delete res.data[0].instruction
                delete res.data[0].fileName
                delete res.data[0].category
                setFormData(res.data[0])
                console.log(res.data[0])
            })
        }
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target
        console.log(name)
        console.log(value)
        setFormData({ ...formData, [name]: value })

        // setFieldValue([name], value)
        console.log(formData)
        props.sendDataFromLogistics(formData)
        // console.log(data)
    }
    return (
        <>
            <div className="container  mb-2">

                <div className="fs-5 fw-bolder text-info">
                    <FaBook className="me-2" />
                    Logistics
                </div>


                <div className="row">

                    <div className="col-md-6">

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm ">
                                Destination
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />

                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Shipping Mode
                            </label>
                            <div className="col-sm-8">
                                <select
                                    name="shippingMode"
                                    value={formData.shippingMode}
                                    onChange={e => handleChange(e)}
                                    className="form-select form-select-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Road">Road</option>
                                    <option value="Air">Air</option>
                                </select>

                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Shipping Company
                            </label>
                            <div className="col-sm-8">
                                <select
                                    name="shippingCompany"
                                    value={formData.shippingCompany}
                                    onChange={e => handleChange(e)}
                                    className="form-select form-select-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Company1">Company1</option>
                                    <option value="Company2">Company2</option>
                                </select>

                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Shipping Tracking No
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="shippingTrackingNo"
                                    value={formData.shippingTrackingNo}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />

                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Shipping Date
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="shippingDate"
                                    value={formData.shippingDate}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Shipping Charges
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name="shippingCharges"
                                    value={formData.shippingCharges}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Vehicle/Vessel No.
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="vesselNo"
                                    value={formData.vesselNo}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Charge Type
                            </label>
                            <div className="col-sm-8">
                                <select

                                    name="chargeType"
                                    value={formData.chargeType}
                                    onChange={e => handleChange(e)}
                                    className="form-select form-select-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Paid">Paid</option>
                                    <option value="COD">COD</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Document Through
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="documentThrough"
                                    value={formData.documentThrough}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                No of Packs
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name="noOfPack"
                                    value={formData.noOfPack}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Weight
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="string"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                Distance
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="distance"
                                    value={formData.distance}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                eWay Invoice No
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name="eWayInvoiceNo"
                                    value={formData.eWayInvoiceNo}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                eWay Invoice Date
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="eWayInvoiceDate"
                                    value={formData.eWayInvoiceDate}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />

                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                IRN No
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name="irnNo"
                                    value={formData.irnNo}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                IRN Cancel Date
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="irnCancelDate"
                                    value={formData.irnCancelDate}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="col-sm-4 col-form-label col-form-label-sm">
                                IRN Cancel Reason
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="irnCancelReason"
                                    value={formData.irnCancelReason}
                                    onChange={e => handleChange(e)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default LogisticsStock