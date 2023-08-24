import React, { useState, useEffect } from 'react'
import { GrFormAdd, GrFormFolder, GrSearch } from 'react-icons/gr';
import { MdDeleteSweep, MdFolder, MdAddCircleOutline, MdManageSearch } from 'react-icons/md';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import EditDeleteUnitmaster from './EditDeleteUnitmaster';
import { getUnitMaster } from '../../../../services/unitMasterServices';
import { useNavigate } from 'react-router-dom';

function UnitMasterTable() {

    const [unit, setUnit] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUnitMasterData()
    }, [])

    const getUnitMasterData = () => {
        getUnitMaster().then((res) => {
            setUnit(res.data)
        })
    }

    let iconStyles = { color: "white", fontSize: "1.5em" };
    const column = [
        {
            headerName: "Unit Id",
            field: "unitId"
        },
        {
            headerName: "Unit Name",
            field: "unitName"
        }, {
            headerName: "Measure",
            field: "measure"
        },
        {
            headerName: "Action",
            field: "",
            cellRenderer: EditDeleteUnitmaster,
            cellRendererParams: {
                GetMaster: getUnitMasterData
                // funGetInfo: handleStockItemsData,
                // openModalForEdit: openModalForEditData,
            }
        }
    ]
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true,
        flex: 1
    }

    const onAdd = () => {
        navigate('/unitMaster')
    }

    return (
        <>
            <div className="container mt-1 d-flex form-heading-alt">
                <span className='fs-6 font-weight-normal w-25' >
                    <MdFolder
                        className='me-2'
                        fill='#fd5190'
                        color='#fd5190'
                        style={{ color: 'white', position: 'relative', top: '-3px' }}
                        size="25px"
                    />
                    Unit Master
                </span>
                <input type="text" className='form-control form-control-sm w-50' />
                <GrSearch style={{ position: 'relative', left: '-30px' }} />

                <MdManageSearch
                    className='icons ms-2'
                    fill='#6E3562'
                    onClick={() => console.log('testing')}
                />

                <MdAddCircleOutline
                    className='icons ms-2'
                    fill='#3CB043'
                    onClick={() => onAdd()}
                />

                < MdDeleteSweep
                    className='icons ms-2'
                    fill='#FF0000'
                    color='#371CBF'
                />
            </div>

            <div className='mt-5' style={{ width: '100%' }} >
                <div className="ag-theme-alpine mx-auto mt-3" style={{ width: "85%", height: 300 }}>
                    <AgGridReact
                        rowData={unit}
                        columnDefs={column}
                        defaultColDef={defaultColDef}
                        animateRows={true}
                    />
                </div>

                <nav aria-label="Page navigation example" className='mt-3'
                    style={{ width: "100%", display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>

                    {/* <nav aria-label="Page navigation example m-auto" style={{  display: "flex", justifyContent: 'start' }}> */}
                    <div class="form-group row align-items-center ms-1 ">
                        <label for="inputEmail3" class="col-lg-3 col-form-label col-form-label-sm">Show</label>
                        <div class="col-lg-5">
                            <select class="form-control form-control-sm " id="exampleFormControlSelect2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <label for="inputEmail3" class="col-lg-3 col-form-label col-form-label-sm ps-0">Entries</label>
                    </div>

                    {/* </nav> */}
                    <p className='justify-content-start d-inline float-left'>
                        <em>Showing 1 to 10 of 50 entries</em>
                    </p>

                    {/* <ul class="pagination pagination-sm justify-content-end pe-4">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul> */}
                    <nav aria-label="Page navigation example">
                        <ul class="pagination pe-2">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </nav>

            </div >
        </>
    )
}

export default UnitMasterTable