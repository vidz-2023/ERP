import axios from "axios";
import { expenseInfoURL, expenseApproveInfoURL } from '../share/constant';

export const getExpenseClaimDetail = () =>{
    return axios.get(expenseInfoURL)
}

export const addExpenseClaimDetail = (data) =>{
    return axios.post(expenseInfoURL, data)
}

export const getExpenseApproval = () =>{
    return axios.get(expenseApproveInfoURL)
}
export const addExpenseApproval = (data) =>{
    return axios.post(expenseApproveInfoURL, data)
}