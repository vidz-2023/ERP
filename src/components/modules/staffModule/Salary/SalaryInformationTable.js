import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getOfficialInfo } from '../../../../services/salaryInfoService';

const SalaryInformationTable = () =>{
    const [officialInfo, setOfficialInfo] = useState([])

    useEffect(() => {
        getOfficialInfo().then((res) => {
            console.log(res.data)
            setOfficialInfo(res.data)
        })
    })

    return(
        <>
            <div className="ag-theme-alpine my-3" style={{ height: 300 }}>
                <AgGridReact rowData={officialInfo} columnDefs={columns} defaultColDef={defaultColDef}/>
            </div>
        </>
    )
}