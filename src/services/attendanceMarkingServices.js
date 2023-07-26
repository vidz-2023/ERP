import axios from "axios"
import { attendanceMarkMasterURL, attendanceMarkingURL } from "../share/constant"

export const getAttendance = () => {
    return axios.get(attendanceMarkingURL)
}

export const getAttendenceMark = () => {
    return axios.get(attendanceMarkMasterURL)
}