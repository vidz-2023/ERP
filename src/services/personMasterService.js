import axios from "axios";
import { personMasterURL } from "../share/constant";

export const getPersonMaster = () => {
    return axios.get(personMasterURL)
}

export const addPersonMaster = (data) => {
    return axios.post(personMasterURL, data)
}

export const updatePersonMaster = (data) => {
    return axios.put(personMasterURL + '/' + data.id, data)
}

export const deletePersonMaster = (id) => {
    return axios.delete(personMasterURL + '/' + id)
}

export const getPersonMasterByID = (id) => {
    const fetchByIDURL = personMasterURL + "/" + id;
    return axios.get(fetchByIDURL)
        .then(res => res.data);
}