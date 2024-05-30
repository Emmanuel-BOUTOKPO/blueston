import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import postSlice from "../features/post/postSlice";
import catSlice from "../features/cat/catSlice";
import commentSlice from "../features/comment/commentSlice";
import crewSlice from "../features/crew/crewSlice";

export const store = configureStore({
    reducer: {
        auth : authSlice,
        post : postSlice,
        cat : catSlice,
        comment : commentSlice, 
        crew : crewSlice
    }
})
