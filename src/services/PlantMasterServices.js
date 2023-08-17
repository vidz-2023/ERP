import axios from "axios";

import { PlantMasterURL } from "../share/constant";



export const getPlantMaster = () => {

    return axios.get(PlantMasterURL)

}



export const addPlantMaster = (data) => {

    return axios.post(PlantMasterURL, data)

}



export const updatePlantMaster = (data) => {

    return axios.put(PlantMasterURL + '/' + data.id, data)

}



export const deletePlantMaster = (id) => {

    return axios.delete(PlantMasterURL + '/' + id)

}



export const getPlantMasterByID = (id) => {

    let fetchByIDURL = PlantMasterURL + '/' + id

    return axios.get(fetchByIDURL)

        .then(res => res.data)

} 