import axios from "axios"
import { workLocationURL } from "../share/constant"

export const getWorkLocation = () => {
    return axios.get(workLocationURL)
}

export const addWorkLocation = (data) => {
    return axios.post(`${workLocationURL}`, data)
}

export const deleteWorkLocation = (id) => {
    return axios.delete(`${workLocationURL}/${id}`,)
}

export const getWorkLocationById = (id) => {
    return axios.get(`${workLocationURL}/${id}`)
}

export const getWorkLocationByEmpCode = (empid) => {
    return axios.get(`${workLocationURL}?empCode=${empid}`)
}

export const updateWorkLocationDetail = (data) => {
    return axios.put(`${workLocationURL}/${data.id}`, data)
}

export const searchWorkLocationAnyField = (data) => {
    return axios.get(`${workLocationURL}?q=${data}`)
}