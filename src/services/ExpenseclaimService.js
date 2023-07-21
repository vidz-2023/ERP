import axios from "axios";
import { expenseClaimURL, expenseClaimDetailURL } from '../share/constant';

//Expense Claim
export const getExpenseClaim = () =>{
    return axios.get(expenseClaimURL)
}

export const addExpenseClaim = (data) =>{
    return axios.post(expenseClaimURL, data)
}

export const updateExpenseClaim = (data, id) => {
    let url = `${expenseClaimURL}/${id}`
    return axios.put(url, data)
}

export const deleteExpenseClaim = (id) => {
    //console.log(id)
    return axios.delete(`${expenseClaimURL}/${id}`)
}

//Expense Claim Detail
export const getExpenseClaimDetail = () =>{
    return axios.get(expenseClaimDetailURL)
}
export const addExpenseClaimDetail = (data) =>{
    return axios.post(expenseClaimDetailURL, data)
}

export const deleteExpenseClaimDetail = (id) => {
    //console.log(id)
    return axios.delete(`${expenseClaimDetailURL}/${id}`)
}