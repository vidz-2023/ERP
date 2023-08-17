import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { getRawMaterialData } from "../../../../services/rawMaterialService";
import DeleteEditRawMaterial from "./DeleteEditRawMaterial";

const RawMaterialTable = () => {
  const [rawData, setRawdata] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleRawMaterialData()
  }, []);

  const handleRawMaterialData = () => {
    getRawMaterialData().then((res) => {
      console.log(res.data);
      setRawdata(res.data)
    });
  };

  const column = [
    {
      headerName: "Material Id",
      field: "materialId",
    },
    {
      headerName: "Material Name",
      field: "materialName",
    },
    {
      headerName: "Remainder Days",
      field: "remainderDays3",
    },
    {
      headerName: "Minimum Purchase Quantity",
      field: "minimumPurchaseQuantity",
    },
    {
      headerName: "Standard Value PerUnit",
      field: "standardValuePerUnit",
    },
    {
      headerName: "Action",
      field: "materialId",
      cellRenderer: DeleteEditRawMaterial,
      cellRendererParams: {
        funGetRawInfo: handleRawMaterialData,
      },
    },
  ];

  // this way not to repeatedly write with all column
  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  }

  const handleRawMaterialTable = () => {
    navigate('/rawMaterial')
  }

  return (
    <>
      <div className="container-fluid mt-4 mb-5">
        <div className="row justify-content-md-center mb-3">
          <button
            type="button"
            className="w-25 btn btn-info"
            onClick={() => {
              handleRawMaterialTable();
            }}
          >
            Add Row
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300 }}>
          <AgGridReact
            rowData={rawData}
            columnDefs={column}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  );
};

export default RawMaterialTable;
