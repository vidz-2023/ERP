import React from 'react'
import { GrFormAdd, GrFormFolder, GrSearch } from 'react-icons/gr';
import { MdDeleteSweep, MdFolder, MdAddCircleOutline, MdManageSearch } from 'react-icons/md';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteEditButtonStockItems from '../../stockModule/DeleteEditButtonStockItems';
import EditDeleteUnitmaster from './EditDeleteUnitmaster';

function UnitMaster() {

    let iconStyles = { color: "white", fontSize: "1.5em" };
    const column = [
        {
            headerName: "ID",
            field: "id"
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

    const rowData = [{
        "id": 1, "unitName": 'test', "measure": "kg"
    }]

    return (
        <>
            <div className="container mt-3 d-flex form-heading">
                <span className='fs-6 font-italic w-25' >
                    <MdFolder className='me-2' fill='#317773' color='#317773' style={{ color: 'white', position: 'relative', top: '-3px' }} size="25px" />
                    Unit Master</span>
                <input type="text" className='form-control form-control-sm w-50' />
                <GrSearch style={{ position: 'relative', left: '-30px' }} />

                <MdManageSearch className='icons ms-2' fill='#371CBF' onClick={() => console.log('testing')} />

                <MdAddCircleOutline className='icons ms-2' fill='#3CB043' />

                < MdDeleteSweep className='icons ms-2' fill='#FF0000' color='#371CBF' />
            </div>

            <div className='mt-3' style={{ width: '100%' }} >

                <nav aria-label="Page navigation example" style={{ width: "90%", display: "flex", justifyContent: 'start' }}>
                    <div class="form-group row align-items-center ">
                        <label for="inputEmail3" class="col-lg-3 col-form-label col-form-label-sm">Show</label>
                        <div class="col-lg-3">
                            <select class="form-control form-control-sm " id="exampleFormControlSelect2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <label for="inputEmail3" class="col-lg-3 col-form-label col-form-label-sm">Entries</label>
                    </div>
                    {/* <div class="form-group">
                        <label for="exampleFormControlSelect2" className='col-sm-2 form-label'>Example multiple select</label>
                        <select class="form-control col-sm-2" id="exampleFormControlSelect2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div> */}

                </nav>

            </div >

            <div className='' style={{ width: '100%' }} >
                <div className="ag-theme-alpine mx-auto" style={{ width: "85%", height: 300 }}>
                    <AgGridReact rowData={rowData} columnDefs={column} defaultColDef={defaultColDef} animateRows={true} />
                </div>

                <nav aria-label="Page navigation example" style={{ width: "90%", display: "flex", justifyContent: 'space-around' }}>
                    <p className='justify-content-start d-inline float-left'>
                        <em>Showing 1 to 10 of 50 entries</em>
                    </p>

                    <ul class="pagination justify-content-end">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>

            </div >
        </>
    )
}

export default UnitMaster