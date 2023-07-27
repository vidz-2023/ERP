import { repayLaonInfoURL } from "../share/constant"
import axios from "axios"

export const getLoanDetailByLoanCode = (data) => {
    
    return axios.get(`${repayLaonInfoURL}?LoanNo=${data}`)

}