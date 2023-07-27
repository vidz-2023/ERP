import axios from "axios"
import { monthlyAttendanceURL } from "../share/constant"
import { monthlySalaryURL } from "../share/constant"

export const getMonthlyAttendance = () => {
    return axios.get(monthlyAttendanceURL)
}

export const getMonthlySalary = () => {
    return axios.get(monthlySalaryURL)
}

export const getEmpInfoByName = (data) => {
    console.log(data)
    return axios.get(`${monthlyAttendanceURL}?Name=${data}`)
    
}

export const getEmpByEmpCode = (empid) => {
    return axios.get(`${monthlyAttendanceURL}?empcode=${empid}`)
}

export const getPayslipData= (data) => {
    return axios.get(`${monthlySalaryURL}?empcode=${data}`)
}
