import axios from "axios"
import { salaryURL } from "../share/constant"

export const getSalary = () => {
    return axios.get(salaryURL)
}