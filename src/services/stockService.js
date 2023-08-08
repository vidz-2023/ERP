import axios from 'axios';
import { stockURL } from '../share/constant';

export const getStockData= () => {
    return axios.get(stockURL)
}
