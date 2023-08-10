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
