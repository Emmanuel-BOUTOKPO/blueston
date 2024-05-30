import axios from "axios";
import { API } from "../../../axios";

const api_url = API;

export const axiosIntance = axios.create({
   baseURL: api_url,
   headers: {
       "content-Type" : "multipart/form-data"
   }
});

export const getAllCrew = () => axiosIntance.get("/crew/getAll");
export const getCrew = (crewId) => axiosIntance.get("/crew/getOn/" + crewId);
export const deleteCrew = (crewId) => axiosIntance.delete("/crew/delete/" + crewId);