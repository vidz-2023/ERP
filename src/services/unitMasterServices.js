import axios from "axios";
import { unitMasterURL } from "../share/constant";

export const getUnitMaster = () => {
    return axios.get(unitMasterURL)
}

export const addUnitMaster = (data) => {
    return axios.post(unitMasterURL, data)
}

export const updateUnitMaster = (data) => {
    return axios.put(unitMasterURL + '/' + data.id, data)
}

export const deleteUnitMaster = (id) => {
    return axios.delete(unitMasterURL + '/' + id)
}

export const getUnitMasterByID = (id) => {
    const fetchByIDURL = unitMasterURL + "/" + id;
    return axios.get(fetchByIDURL)
        .then(res => res.data);
}