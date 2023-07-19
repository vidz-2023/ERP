import axios from "axios";
import { leaveFormURL } from "../share/constant";

export const getLeaveForm = () => {
    return axios.get(leaveFormURL)
}

export const addLeaveForm = (data) => {
    console.log(data)
    return axios.post(leaveFormURL, data)
}

export const editLeaveForm = (data) => {
    return axios.put(leaveFormURL + '/' + data.id,data)
}

export const deleteLeaveForm = (id) => {
    return axios.delete(leaveFormURL + "/" + id);
}

export const getLeaveFormByID = (id) => {
    const fetchByIDURL = leaveFormURL + "/" + id;
    return axios.get(fetchByIDURL)
        .then(res => res.data);
}

