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

export const getSalaryStructureByEmpCode = (empid) => {
    return axios.get(`${salaryURL}?empCode=${empid}`)
}

export const updateSalaryDetail = (data) => {
    console.log("service", data)
    return axios.put(`${salaryURL}/${data.id}`, data)
}

export const searchSalaryStructureAnyField = (data) => {
    return axios.get(`${salaryURL}?q=${data}`)
}

