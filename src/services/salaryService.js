import axios from "axios"
import { salaryURL } from "../share/constant"

export const getSalary = () => {
    return axios.get(salaryURL)
}

export const addSalary = (data) => {
    return axios.post(`${salaryURL}`, data)
}

export const deleteSalary = (id) => {
    return axios.delete(`${salaryURL}/${id}`,)
}

export const getSalaryById = (id) => {
    return axios.get(`${salaryURL}/${id}`)
}