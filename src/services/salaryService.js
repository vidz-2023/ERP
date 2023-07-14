import axios from "axios"
import { salaryURL } from "../share/constant"

//salaryprocess
import { salaryprocessURL } from "../share/constant"

export const getSalary = () => {
    return axios.get(salaryURL)
}