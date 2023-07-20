import axios from "axios"
import { addressInfoURL } from "../share/constant"

export const addAddressData = (data) => {

    console.log(addressInfoURL + "URL")

    for (let i = 0; i < data.length; i++) {

        axios.post(addressInfoURL, data[i])

    }
    return 0

}

export const getAddressDataByEmpCode = async (empCode) =>{
    
    console.log(`${addressInfoURL}?empCode=${empCode}`)
    return await axios.get(`${addressInfoURL}?empCode=${empCode}`)

}

export const deleteAddressInfo= (data) => {

    for (let i = 0; i < data.length; i++) {

        let putUrl = `${addressInfoURL}/${data[i].id}`
        console.log(putUrl)
         axios.delete(putUrl)

    }
    return 0

}

export const updateAddressInfo = (data) => {


    for (let i = 0; i < data.length; i++) {

        let putUrl = `${addressInfoURL}/${data[i].id}`
        console.log(putUrl)
        axios.put(putUrl, data)

    }
    return 0

}