import axios from "axios";
import { officialInfoURL, esiPfInfoURL, bankInfoURL } from "../share/constant";

//oficial information
export const getOfficialInfo = () => {
    return axios.get(officialInfoURL)
}

export const addOfficialInfo = (data) => {
    return axios.post(`${officialInfoURL}`, data)
}

export const updateOfficialInfo = (data, id) => {
    let url = `${officialInfoURL}/${id}`
    return axios.put(url, data)
}

export const deleteOfficialInfo = (id) => {
    //console.log(id)
    return axios.delete(`${officialInfoURL}/${id}`)
}

export const getOfficialInfoById = (id) => {
    let url = `${officialInfoURL}/${id}`
    //console.log(url)
    return axios.get(url).then(res => res.data)
}

//esiPf information
export const addEsiPfInfo = (data) => {
    return axios.post(`${esiPfInfoURL}`, data)
}

export const addbanckInfo = (data) => {
    return axios.post(`${bankInfoURL}`, data)
}