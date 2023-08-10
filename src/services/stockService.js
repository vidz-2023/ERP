import axios from 'axios';
import { stockURL } from '../share/constant';

export const getStockData= () => {
    return axios.get(stockURL)
}

export const deleteStockData= (data) => {
    return axios.delete(`${stockURL}/${data}`,)
}

export const searchStockDataAnyField = (data) => {
    return axios.get(`${stockURL}?q=${data}`)
}

export const getStockDataByStockId = (data) => {
     
    return axios.get(`${stockURL}?stockId=${data}`)

}
export const addStockData = (data) => {
    console.log(data)
    return axios.post(stockURL, data)
}

export const updateStockData = (data, id) => {

    let url = `${stockURL}/${id}`

    return axios.put(url, data)

}