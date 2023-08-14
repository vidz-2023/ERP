import axios from "axios";
import { customerMasterURL } from "../share/constant";

export const getCustomerMaster = () => {
    return axios.get(customerMasterURL)
}

export const addCustomerMaster = (data) => {
    return axios.post(customerMasterURL, data)
}

export const updateCustomerMaster = (data) => {
    return axios.put(customerMasterURL + '/' + data.id, data)
}

export const deleteCustomerMaster = (id) => {
    return axios.delete(customerMasterURL + '/' + id)
}

export const getCustomerMasterByID = (id) => {
    const fetchByIDURL = customerMasterURL + "/" + id;
    return axios.get(fetchByIDURL)
        .then(res => res.data);
}