import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteMaterialVendorConfigData, getMaterialVendorConfigData } from "../../../../services/materialVendorConfigService";

const MaterialVendorDeleteEdit = (params) => {
  const navigate = useNavigate();

  const handleDelete = (p) => {
    console.log(p.data.id);
    deleteMaterialVendorConfigData(p.data.id);
    alert(`${p.data.materialName} get deleted`);
    getMaterialVendorConfigData().then();
    p.funGetmaterialVendor();
  };

  const handleEdit = (p) => {
    navigate(`/materialVendorConfig/${p.data.materialId}`);
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-info me-2"
          onClick={() => {
            handleEdit(params);
          }}
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => {
            handleDelete(params);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default MaterialVendorDeleteEdit;
