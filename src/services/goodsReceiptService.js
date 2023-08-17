import axios from "axios"
import { goodsReceiptURL } from "../share/constant"

export const getGoodsReceiptDetail = () => {
    return axios.get(goodsReceiptURL)
}

export const addGoodsReceiptDetail = (data) => {
    return axios.post(`${goodsReceiptURL}`, data)
}

export const deleteGoodsReceiptDetail = (id) => {
    return axios.delete(`${goodsReceiptURL}/${id}`)
}

export const getGoodsReceiptById = (id) => {
    return axios.get(`${goodsReceiptURL}?pId=${id}`)
}

export const updateGoodsReceiptDetail = (data) => {
    return axios.put(`${goodsReceiptURL}/${data.id}`, data)
}



