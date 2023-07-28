import axios from "axios"
import { attendanceMarkMasterURL, attendanceMarkingURL } from "../share/constant"

export const getAttendance = () => {
    return axios.get(attendanceMarkingURL)
}

export const addAttendance = (data) => {
    return axios.post(`${attendanceMarkingURL}`, data)
}

export const updateAttendance = (data) => {
    console.log("update service", data)
    return axios.put(`${attendanceMarkingURL}/${data.id}`, data)
}

export const getAttendenceMark = () => {
    return axios.get(attendanceMarkMasterURL)
}

