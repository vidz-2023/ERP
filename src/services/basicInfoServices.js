
import axios from 'axios';
import { basicInfoURL } from '../share/constant';

export const getBasicInfo = () => {
    return axios.get(basicInfoURL)
}

export const addBasicInfo = (data) => {
    console.log(data)
    return axios.post(basicInfoURL, data)
}

export const getBasicInfoByName = (data) => {
    return axios.get(`${basicInfoURL}?FirstName=${data}`)
}

/*export const getBasicInfoByEmpCode  = (data) => {
    console.log(data)
    return axios.get(`${basicInfoURL}?EmpCode=0000${data}`)
}
*/
export const deleteBasicInfo = (data) => {
    return axios.delete(`${basicInfoURL}/${data}`,)
}

export const getBasicInfoById = (id) => {
    let url = `${basicInfoURL}/${id}`
    console.log(url)
    return axios.get(url)
}

export const getBasicInfoByEmpCode = (data) => {
    
    return axios.get(`${basicInfoURL}?empCode=${data}`)

}



export const updateBasicInfo = (data, id) => {

    let url = `${basicInfoURL}/${id}`

    return axios.put(url, data)

}

export const searchBasicInfoAnyField = (data) => {
    return axios.get(`${basicInfoURL}?q=${data}`)
}
