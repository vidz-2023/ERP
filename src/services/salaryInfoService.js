import axios from "axios";
import { officialInfoURL } from "../share/constant";

export const getOfficialInfo = () => {
    return axios.get(officialInfoURL)
}