import React, { useState, useEffect } from 'react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate, useParams } from 'react-router';
// Import React Icons
import { MdOutlineHolidayVillage } from "react-icons/md";
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { addUnitMaster, getUnitMasterByID, updateUnitMaster } from '../../../../services/unitMasterServices';

function UnitMaster() {

    // Intial Value for Formik
    const inputFields = {
        unitName: '',
        measure: '',
    }

    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        unitName: Yup.string().required('*Required'),
        measure: Yup.string().required('*Required')
    })

    //Declaration
    const [unitMasterValue, setUnitMasterValue] = useState(inputFields)
    const [isUnitUpdate, setIsUnitUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

    //Fetching The Data
    useEffect(() => {
        console.log(id)
        if (id >= 0) {
            getUnitMasterByID(id).then(res => {
                console.log(res)
                setUnitMasterValue(res)
            })
            setIsUnitUpdate(true)
        }
    }, [])

    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = () => {
        if (!isUnitUpdate) {
            addUnitMaster(unitMasterValue)
            navigate('/unitMasterTable')
        } else {
            updateUnitMaster(unitMasterValue, id)
            navigate('/unitMasterTable')
        }
    }

    // ------------------- On Change Function Declaration ---------------------------//
    const onUnitMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setUnitMasterValue({ ...unitMasterValue, [name]: value })
        setFieldValue([name], value)
    }

    return (
        <>
       
            <div className='contianer mx-auto mb-5'>
                <fieldset>
                    <div className='m-3'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                Unit of Measurement
                            </div>
                        </h4>
                        <Formik
                            initialValues={unitMasterValue}
                            validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitcting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2  col-form-label col-form-label-sm '>
                                                Unit Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='unitName'
                                                        value={unitMasterValue.unitName}
                                                        onChange={e => onUnitMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='unitName' />
                                                </div>
                                            </div>
                                            <div className='col-2'></div>
                                            <div className='col-2 col-form-label col-form-label-sm '>
                                                Measure
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field as="select"
                                                        name="measure"
                                                        className="form-select"
                                                        value={unitMasterValue.measure}
                                                        onChange={e => onUnitMasterHandlerChange(e, setFieldValue)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Piece">Piece</option>
                                                        <option value="gms">gms</option>
                                                        <option value="Kg">Kg</option>
                                                        <option value="tons">tons</option>
                                                        <option value="liters">liters</option>
                                                    </Field>                                                       <ErrorMessage name='measure' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className=' row mt-5 ms-5'>
                                            <div className='col-3'>
                                                <button
                                                    type="submit"
                                                    className='w-50 btn btn-info'
                                                >Save
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setUnitMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setUnitMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/unitMasterTable`)}
                                                >Exit
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </Form>)}
                        </Formik>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default UnitMaster