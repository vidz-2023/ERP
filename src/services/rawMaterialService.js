import axios from "axios";
import { rawMaterialURL } from "../share/constant";

export const getRawMaterialData = () => {
  return axios.get(rawMaterialURL);
};

export const addRawMaterialData = (data) => {
  return axios.post(`${rawMaterialURL}`, data);
};

export const deleteRawMaterialData = (id) => {
  return axios.delete(`${rawMaterialURL}/${id}`);
};

export const updateRawMaterialData = (data) => {
  console.log("in update", data);
  return axios.put(`${rawMaterialURL}/${data.id}`, data);
};

export const getRawMaterialDataByMaterialCode = (mcode) => {
    console.log(mcode)
    let url = `${rawMaterialURL}?materialId=${mcode}`
    return axios.get(url)
}

export const getRawMaterialDataByMaterialName = (mcode) => {

  let url = `${rawMaterialURL}?materialName=${mcode}`
  return axios.get(url)
}
