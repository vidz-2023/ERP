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