import axios from "axios"

import { monthlyAttendanceURL} from "../share/constant"

export const getAttendanceProcess = () => {
    return axios.get(monthlyAttendanceURL)
}

export const addAttendanceProcess = (data) => {
    console.log(monthlyAttendanceURL)
    return axios.post(monthlyAttendanceURL, data);
}

export const deleteAttendanceProcess = (id) =>{
   return axios.delete(monthlyAttendanceURL + "/" + id);
}

export const searchAttendanceProcessAnyField = (data) => {
    return axios.get(`${monthlyAttendanceURL}?q=${data}`)
}