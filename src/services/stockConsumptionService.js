import axios from "axios"
import {stockConsumURL} from "../share/constant"

export const addStockConsumData = (data) => {
    console.log(data)
    return axios.post(stockConsumURL, data)
}

export const getStockConsumeData= () => {
    return axios.get(stockConsumURL)
}

export const deleteStockConsumeData= (data) => {
    return axios.delete(`${stockConsumURL}/${data}`,)
}

export const searchStockConsumeDataAnyField = (data) => {
    return axios.get(`${stockConsumURL}?q=${data}`)
}

export const updateStockConsumeData = (data, id) => {

    let url = `${stockConsumURL}/${id}`
    return axios.put(url, data)

}
export const getStockConsumeDataById = (data) => {
     
    return axios.get(`${stockConsumURL}?stockConsumId=${data}`)

}
