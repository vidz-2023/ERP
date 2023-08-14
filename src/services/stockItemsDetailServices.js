import axios from "axios"
import { stocktemsDetailsURL } from "../share/constant"

export const getStockItemsByStockId = (id) => {
    return axios.get(`${stocktemsDetailsURL}?stockId=${id}`)
}

export const deleteStockItemsById = (data) => {

    return axios.delete(`${stocktemsDetailsURL}/${data}`,)

}

export const addItemDetails = (data) => {
    return axios.post(`${stocktemsDetailsURL}`, data)
}

export const getStockItemsByItemId = (id) => {
    return axios.get(`${stocktemsDetailsURL}?stockItemId=${id}`)
}

export const updateStockItemData = (data, id) => {

    let url = `${stocktemsDetailsURL}/${id}`

    return axios.put(url, data)

}