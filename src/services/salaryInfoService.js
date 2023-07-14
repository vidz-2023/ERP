import axios from "axios";
import { officialInfoURL } from "../share/constant";

export const getSalaryInfo = () => {
    return axios.get(officialInfoURL)
}

export const addSalaryInfo = (data) => {
    return axios.post(`${officialInfoURL}`, data)
}

export const deleteSalaryInfo = (id) => {
    console.log(id)
    return axios.delete(`${officialInfoURL}/${id}`)
}