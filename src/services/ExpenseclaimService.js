import axios from "axios";
import { expenseClaimURL, expenseClaimDetailURL } from '../share/constant';

//----------------Expense Claim-------------------
export const getExpenseClaim = () =>{
    return axios.get(expenseClaimURL)
}

export const addExpenseClaim = (data) =>{
    return axios.post(`${expenseClaimURL}`, data)
}

export const updateExpenseClaim = (data, id) => {
    let url = `${expenseClaimURL}/${id}`
    return axios.put(url, data)
}

export const deleteExpenseClaim = (id) => {
    //console.log(id)
    return axios.delete(`${expenseClaimURL}/${id}`)
}

export const getExpenseClaimById = (id) => {
    let url = `${expenseClaimURL}/${id}`
    //console.log(url)
    return axios.get(url).then(res => res.data)
}

//------------Expense Claim Detail-------------
export const getExpenseClaimDetail = () =>{
    return axios.get(expenseClaimDetailURL)
}
export const addExpenseClaimDetail = (data) =>{
    return axios.post(expenseClaimDetailURL, data)
}

export const updateExpenseClaimDetail = (data, id) => {
    let url = `${expenseClaimDetailURL}/${id}`
    return axios.put(url, data)
}

export const deleteExpenseClaimDetail = (id) => {
    //console.log(id)
    return axios.delete(`${expenseClaimDetailURL}/${id}`)
}