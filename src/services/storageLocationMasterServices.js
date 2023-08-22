import axios from "axios"
import { storageLocMasterURL } from "../share/constant";

export const getStorageLocMaster = () => {
    return axios.get(storageLocMasterURL)
}

export const addStorageLocMaster = (data) => {
    return axios.post(storageLocMasterURL, data)
}

export const updateStorageLocMaster = (data) => {
    return axios.put(storageLocMasterURL + '/' + data.id, data)
}

export const deleteStorageLocMaster = (id) => {
    return axios.delete(storageLocMasterURL + '/' + id)
}

export const getStorageLocMasterById = (id) => {
    const fetchByIDURL = storageLocMasterURL + '/' + id
    return axios.get(fetchByIDURL)
        .then(res => res.data)
}