import React, { useState, useEffect } from 'react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate, useParams } from 'react-router';
//Import Formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { addStorageLocMaster, getStorageLocMaster, getStorageLocMasterById, updateStorageLocMaster } from '../../../../services/storageLocationMasterServices';

function StorageLocationMaster() {

    // ------------------- Initial Value for Formik------------------//
    const inputFields = {
        storageId: '',
        Name: '',
        Branch: '',
        isActive: ''
    }

    // ------------------- It is for Yup ---------------------------//
    const validateyupSchema = Yup.object({
        Name: Yup.string().required('*Required'),
        Branch: Yup.string().required('*Required'),
        isActive: Yup.string().required('*Required')
    })

    // ------------------- Declarations ----------------------------//
    const [storageLocMasterValue, setStorageLocMasterValue] = useState([])
    const [isStorageUpdate, setIsStorageUpdate] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    // ------------------- Fetching the data ------------------------//
    useEffect(() => {
        if (id >= 0) {
            getStorageLocMasterById(id).then(res => {
                setStorageLocMasterValue(res)
            })
            setIsStorageUpdate(true)
        }
    }, [])

    // ------------------- Generating Unique ID  ---------------------------//
    const generateStorageID = async (lastID) => {

        let lastGeneratedStorageID = lastID
        await getStorageLocMaster().then((res) => {
            lastGeneratedStorageID = res.data[res.data.length - 1].storageId
        })
        let numStr = lastGeneratedStorageID.match(/\d+/)[0]
        let num = Number(numStr) + 1

        if (numStr.length) {
            const padding = '0'.repeat(numStr.length - num.toString().length);
            num = padding + num
        }

        let alphabet = lastGeneratedStorageID.match(/[a-z]{2}/i)
        return alphabet + num
    }

    // ------------------- For Submit the Function ---------------------------//
    const handleSubmit = (values) => {
        if (!isStorageUpdate) {
            generateStorageID().then(newId => {
                values = { ...values, storageId: newId }
                addStorageLocMaster(values).then((res) => {
                    navigate("/storageLocMasterTable")
                })
            })
        } else {
            updateStorageLocMaster(storageLocMasterValue, id)
            navigate('/storageLocMasterTable')
        }
    }

    // ------------------- On Change Function Declaration ---------------------------//
    const onStorageLocMasterHandlerChange = (e, setFieldValue) => {
        const { name, value } = e.target
        setStorageLocMasterValue({ ...storageLocMasterValue, [name]: value })
        setFieldValue([name], value)
    }

    const onStorageLocMasterHandlerChange1 = (e, setFieldValue) => {
        const { name, checked } = e.target
        setStorageLocMasterValue({ ...storageLocMasterValue, [name]: checked })
        setFieldValue([name], checked)
    }

    return (
        <>
            <div className='contianer mx-auto mb-5'>
                <fieldset>
                    <div className='m-3'>
                        <h4 className='text-info w-100 mb-3 text-center border border-info-subtle'>
                            <div className='m-2'>
                                Storage Location Master
                            </div>
                        </h4>
                        <Formik
                            initialValues={storageLocMasterValue}
                            validationSchema={validateyupSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitcting, setFieldValue }) => (
                                <Form>
                                    <div className='w-75 mx-auto'>

                                        <div className='row mb-1'>
                                            <div className='col-2  col-form-label col-form-label-sm '>
                                                Name
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='Name'
                                                        value={storageLocMasterValue.Name}
                                                        onChange={e => onStorageLocMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='Name' />
                                                </div>
                                            </div>
                                            <div className='col-1'></div>
                                            <div className='col-2  col-form-label col-form-label-sm '>
                                                Branch
                                            </div>
                                            <div className='col-3'>
                                                <div class="mb-2 text-danger">
                                                    <Field
                                                        className="form-control"
                                                        type='text'
                                                        name='Branch'
                                                        value={storageLocMasterValue.Branch}
                                                        onChange={e => onStorageLocMasterHandlerChange(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name='Branch' />
                                                </div>
                                            </div>
                                            <div className='col-1'></div>
                                            <div className='col-2 col-form-label col-form-label-sm'>
                                                <label
                                                    htmlFor='isActive'
                                                    className='col-sm-6 col-col-form-label col-form-label-sm'
                                                >
                                                    Is Active
                                                </label>
                                            </div>
                                            <div className='col-3'>
                                                <Field
                                                    className='form-check-input mt-3'
                                                    type='checkbox'
                                                    name='isActive'
                                                    checked={storageLocMasterValue.isActive}
                                                    onChange={e => onStorageLocMasterHandlerChange1(e, setFieldValue)}
                                                />
                                                <ErrorMessage name='isActive' />
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
                                                    onClick={() => setStorageLocMasterValue(inputFields)}
                                                >
                                                    Clear
                                                </button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="reset"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => setStorageLocMasterValue(inputFields)}
                                                >
                                                    Delete</button>
                                            </div>

                                            <div className='col-3'>
                                                <button
                                                    type="button"
                                                    className='w-50 btn btn-info'
                                                    onClick={() => navigate(`/storageLocMasterTable`)}
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

export default StorageLocationMaster
