import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Table() {
    const data = [
        {
            name: "Nidhi",
            age: 35
        },
        {
            name: "Ankush",
            age: 40
        },
        {
            name: "Atishay",
            age: 7
        }

    ]

    const column = [{
        headerName: "Name",
        field: "name",
        checkboxSelection: true
        // sortable: true,
        // filter: true,
        // editable: true
    },
    {
        headerName: "Age", field: "age", sortable: true
    }]

    // this way not to repeatedly write with all column
    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: true
    }

    return (
        <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>

            <AgGridReact rowData={data} columnDefs={column} defaultColDef={defaultColDef} />
        </div>
    )
}

export default Table