import axios from "axios";
import { API } from "../../../axios";

const token = window.localStorage.getItem("token");
const api_url = API;

export const axiosInstance = axios.create({
    baseURL : api_url,
    headers : {
         "Authorization" : token ? `Bearer${token}` : ""
    }
});

export const signIn = (formValue) => axiosInstance.post("/login", formValue);
export const signUp = (formValue) => axiosInstance.post("/register", formValue);
