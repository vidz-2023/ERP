import axios from "axios"
import { SalaryAdvancesInfoURL } from "../share/constant"


export const getSalaryAdvancesInfo = () => {
    return axios.get(SalaryAdvancesInfoURL)
}

export const addSalAdvancesInfo = (data) => {
    console.log(data)
    return axios.post(SalaryAdvancesInfoURL, data)
}

export const deleteSalAdv = (data) => {

    return axios.delete(`${SalaryAdvancesInfoURL}/${data}`,)

}

export const getSalAdvancesByEmpCode = (data) => {
    
    return axios.get(`${SalaryAdvancesInfoURL}?empCode=${data}`)

}




