import axios from "axios"
import { purchaseURL } from "../share/constant"

export const getPurchaseDetail = () => {
    return axios.get(purchaseURL)
}

export const addPurchaseDetail = (data) => {
    return axios.post(`${purchaseURL}`, data)
}

export const deletePurchaseDetail = (id) => {
    return axios.delete(`${purchaseURL}/${id}`,)
}

export const getPurchaseDetailById = (id) => {
    return axios.get(`${purchaseURL}/${id}`)
}

// export const getPurchaseDetailByEmpCode = (empid) => {
//     return axios.get(`${purchaseURL}?empCode=${empid}`)
// }

export const updatePurchaseDetail = (data) => {
    console.log("service", data)
    return axios.put(`${purchaseURL}/${data.id}`, data)
}

export const searchPurchaseDetailByAnyField = (data) => {
    return axios.get(`${purchaseURL}?q=${data}`)
}

