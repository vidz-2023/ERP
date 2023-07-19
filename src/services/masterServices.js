import axios from "axios"
import { masterBranch, masterCategory, masterDepartment, masterDesignation, masterEmployeeShift } from "../share/constant"

export const getDesignations = () => {
    return axios.get(masterDesignation)
}

export const getCategories = () => {
    return axios.get(masterCategory)
}

export const getBranches = () => {
    return axios.get(masterBranch)
}

export const getDepartments = () => {
    return axios.get(masterDepartment)
}

export const getEmployeeShifts = () => {
    return axios.get(masterEmployeeShift)
}