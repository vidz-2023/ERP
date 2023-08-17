import axios from "axios"
import {stockConsumURL} from "../share/constant"

export const addStockConsumData = (data) => {
    console.log(data)
    return axios.post(stockConsumURL, data)
}
