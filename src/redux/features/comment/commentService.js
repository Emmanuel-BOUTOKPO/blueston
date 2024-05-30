import axios from "axios";
import { API } from "../../../axios";

const token = window.localStorage.getItem('token');
const api_url = API;

export const axiosIntance = axios.create({
   baseURL: api_url,
   headers: {
       "Authorization": token ? `Bearer ${token}` : "",
   }
});

export const getAllComment = () => axiosIntance.get("/comment/getAll");
export const getComment = (commentId) => axiosIntance.get("/comment/getOn/" + commentId);
export const postComment = ({postId, userId, comment}) => axiosIntance.post("/comment/post",{postId, userId, comment});
export const deleteComment = (commentId) => axiosIntance.delete("/comment/delete/" + commentId);
