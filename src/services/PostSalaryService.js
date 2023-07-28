import axios from "axios"
import {attendanceMarkingURL } from "../share/constant"

export const getAttendanceEmpData= (data) => {
    return axios.get(`${attendanceMarkingURL}?empCode=${data}`)
}

export const getAttendanceData = () => {
    return axios.get(attendanceMarkingURL)
}