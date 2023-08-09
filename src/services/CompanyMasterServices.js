import axios from "axios";
import { CompanyMasterURL } from "../share/constant";

export const getCompanyMaster = () => {
    return axios.get(CompanyMasterURL)
}

export const addCompanyMaster = (data) => {
    return axios.post(CompanyMasterURL, data)
}

export const updateCompanyMaster = (data) => {
    return axios.put(CompanyMasterURL + '/' + data.id, data)
}

export const deleteCompanyMaster = (id) => {
    return axios.delete(CompanyMasterURL + '/' + id)
}

export const getCompanyMasterByID = (id) => {
    let fetchByIDURL = CompanyMasterURL + '/' + id
    return axios.get(fetchByIDURL)
        .then(res => res.data)
}