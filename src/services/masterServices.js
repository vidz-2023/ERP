import axios from "axios"
import { masterBranch, masterCategory, masterDepartment, masterDesignation, masterEmployeeShift, masterFreight } from "../share/constant"

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

export const getFreight = () => {
    return axios.get(masterFreight)
}

export const getEmployeeShifts = () => {
    return axios.get(masterEmployeeShift)
}