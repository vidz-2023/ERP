import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { getMaterialVendorConfigData } from '../../../../services/materialVendorConfigService';
import MaterialVendorDeleteEdit from './MaterialVendorDeleteEdit';

const MaterialVendorConfigTable = () => {
    const [materialVendorData, setMaterialVendordata] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      handleMaterialVendorData()
    }, []);
  
    const handleMaterialVendorData = () => {
        getMaterialVendorConfigData().then((res) => {
        console.log(res.data);
        setMaterialVendordata(res.data)
      });
    };
  
    const column = [
    //   {
    //     headerName: "Vendor Id",
    //     field: "vendorId",
    //   },
      {
        headerName: "Vendor Name",
        field: "vendorName",
      },
      {
        headerName: "Material Id",
        field: "materialId",
      },
      {
        headerName: "Material Name",
        field: "materialName",
      },
      {
        headerName: "Invoice Date",
        field: "invoiceDate",
      },
      {
        headerName: "Payment Method",
        field: "paymentMethod",
      },
      {
        headerName: "Amount",
        field: "amount",
      },
      {
        headerName: "Action",
        field: "vendorId",
        cellRenderer: MaterialVendorDeleteEdit,
        cellRendererParams: {
          funGetmaterialVendor: handleMaterialVendorData,
        },
      },
    ];
  
    // this way not to repeatedly write with all column
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    }
  
    const handleMaterialVendorConfigTable = () => {
      navigate('/materialVendorConfig/0')
    }
  
    return (
      <>
        <div className="container-fluid mt-4 mb-5">
          <div className="row justify-content-md-center mb-3">
            <button
              type="button"
              className="w-25 btn btn-info"
              onClick={() => {
                handleMaterialVendorConfigTable();
              }}
            >
              Add Row
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ height: 300 }}>
            <AgGridReact
              rowData={materialVendorData}
              columnDefs={column}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </>
    );
}

export default MaterialVendorConfigTable