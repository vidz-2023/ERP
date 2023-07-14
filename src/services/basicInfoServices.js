import axios from 'axios';
import { basicInfoURL } from '../share/constant';


export const getBasicInfo = () => {
    return axios.get(basicInfoURL)
}

export const addBasicInfo = (data) => {
    return axios.post(basicInfoURL, data)
}

export const getBasicInfoByName = (data) => {
    return axios.get(`${basicInfoURL}?First name=${data}`)
}

