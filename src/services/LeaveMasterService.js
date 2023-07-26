import axios from "axios";
import { leaveMasterURL } from "../share/constant";

export const getLeaveMaster = () => {
    return axios.get(leaveMasterURL)
}

export const getLeaveByNoOfLeave = (leaveCode) => {
    console.log(`${leaveMasterURL}?leaveCode=${leaveCode}`)
    return axios.get(`${leaveMasterURL}?leaveCode=${leaveCode}`)
}
export const addLeaveMaster = (data) => {
    console.log(data)
    return axios.post(leaveMasterURL, data)
}

export const updateLeaveMaster = (data) => {
    return axios.put(leaveMasterURL + '/' + data.id, data)
}

export const deleteLeaveMaster = (id) => {
    return axios.delete(leaveMasterURL + "/" + id);
}

export const getLeaveMasterByID = (id) => {
    let fetchByIDURL = leaveMasterURL + '/' + id
    return axios.get(fetchByIDURL)
        .then(res => res.data)
}

