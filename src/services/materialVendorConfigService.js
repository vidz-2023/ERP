import axios from "axios";
import { materialVendorConfigDetailURL, materialVendorConfigURL } from "../share/constant";

export const getMaterialVendorConfigData = () => {
  return axios.get(materialVendorConfigURL);
};

export const addMaterialVendorConfigData = (data) => {
  return axios.post(`${materialVendorConfigURL}`, data);
};

export const deleteMaterialVendorConfigData = (id) => {
  return axios.delete(`${materialVendorConfigURL}/${id}`);
};

export const updateMaterialVendorConfigData = (data) => {
  console.log("in update", data);
  return axios.put(`${materialVendorConfigURL}/${data.id}`, data);
};

export const getMaterialVendorDataByName = (data) => {
    return axios.get(`${materialVendorConfigURL}?materialName=${data}`)
}

export const getMaterialVendorDataByMaterialCode = (mcode) => {
    console.log(mcode)
    let url = `${materialVendorConfigURL}?materialId=${mcode}`
    return axios.get(url)
}

