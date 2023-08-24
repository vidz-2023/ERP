import axios from "axios";
import { vendorMasterURL } from "../share/constant";

export const getVendorMaster = () => {
    return axios.get(vendorMasterURL)
}

export const addVendorMaster = (data) => {
    return axios.post(vendorMasterURL, data)
}

export const updateVendorMaster = (data) => {
    return axios.put(vendorMasterURL + '/' + data.id, data)
}

export const deleteVendorMaster = (id) => {
    return axios.delete(vendorMasterURL + '/' + id)
}

export const getVendorMasterByID = (id) => {
    const fetchByIDURL = vendorMasterURL + "/" + id;
    return axios.get(fetchByIDURL)
        .then(res => res.data);
}

export const getVendorMasterByID1 = (vendorId) => {
    return axios.get(`${vendorMasterURL}?vendorId=${vendorId}`)
}

export const getVendorMasterDataByName = (data) => {
    return axios.get(`${vendorMasterURL}?firstName=${data}`)
}

export const searchVendorMasterAnyField = (data) => {
    return axios.get(`${vendorMasterURL}?q=${data}`)
}