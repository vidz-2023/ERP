import axios from "axios";
import { leaveMasterURL } from "../share/constant";

export const getLeaveMaster = () => {
    return axios.get(leaveMasterURL)
}

