import axios from "axios"

import { monthlySalaryURL} from "../share/constant"

export const getSalaryProcess = () => {
    return axios.get(monthlySalaryURL)
}

export const addSalaryProcess = (data) => {
    console.log(monthlySalaryURL)
    return axios.post(monthlySalaryURL, data);
}

// export const updateSalaryProcess = (data) => {
//     return axios.put(monthlySalaryURL + "/" + data.id, data);
// }

export const deleteSalaryProcess = (id) =>{
   return axios.delete(monthlySalaryURL + "/" + id);
}

export const searchSalaryProcessAnyField = (data) => {
    return axios.get(`${monthlySalaryURL}?q=${data}`)
}