import axios from "axios"
import { purchasedItemsDetailsURL } from "../share/constant"

// export const getPurchasedItemsDetail = () => {
//     return axios.get(purchasedItemsDetailsURL)
// }

export const addPurchasedItemsDetail = (data) => {
    return axios.post(`${purchasedItemsDetailsURL}`, data)
}

export const deletePurchasedItem = (id) => {
    return axios.delete(`${purchasedItemsDetailsURL}/${id}`)
}

export const getPurchasedItemsByPId = (id) => {
    return axios.get(`${purchasedItemsDetailsURL}?pId=${id}`)
}

export const updatePurchasedItems = (data) => {
    console.log("service", data)
    return axios.put(`${purchasedItemsDetailsURL}/${data.id}`, data)
}

