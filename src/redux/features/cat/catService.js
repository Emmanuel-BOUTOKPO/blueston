import axios from "axios";
import { API } from "../../../axios";
 

 const token = window.localStorage.getItem('token');
 const api_url = API;

export const axiosIntance = axios.create({
    baseURL: api_url,
    headers: {
        "Authorization": token ? `Bearer ${token}` : ""
    }
});


export const getAllCat = () => axiosIntance.get("/cat/getAll");
