import axios from "axios";
import { API } from "../../../axios";

const api_url = API;

export const axiosIntance = axios.create({
   baseURL: api_url,
   headers: {
       "content-Type" : "multipart/form-data"
   }
});

export const getAllPost = () => axiosIntance.get("/post/getAll");
export const getPost = (postId) => axiosIntance.get("/post/getOn/" + postId);
export const getPostByCat = (category) => axiosIntance.get("/post/get/" + encodeURIComponent(category));
export const deletePost = (postId) => axiosIntance.delete("/post/delete/" + postId);