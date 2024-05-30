import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {signIn, signUp} from "./authService";

const initialState = {
    users :{
        firstname : "",
        lastname : "" , 
        email : "" ,
    },
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ""
}

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate}, { rejectWithValue }) => {
    try {
        const response = await signIn(formValue)
        navigate("/");
        return response.data;
  
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
  });

export const register = createAsyncThunk("auth/register", async ({ formValue, navigate}, { rejectWithValue }) => {
    console.log(formValue);
    try {
        const response = await signUp(formValue)
        
        navigate("/login");
        return response.data;
  
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
  });


export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.users =  action.payload
          state.isSuccess = true;
          state.isLoading = false;
          state.isError = false
      },
        reset: (state) => {
          state.users =  null
          localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          localStorage.setItem('users', JSON.stringify(action.payload.users));
          state.users = action.payload.users;
          state.isError = false;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
       .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.message=action.payload
              state.isError = false;
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          }) 
      },
  })

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const users = JSON.parse(localStorage.getItem("users"))
        dispatch({
          type: "auth/setUser",
          payload: { 
                users
          }
        });
   
    }
}

export const { reset } = authSlice.actions
export default authSlice.reducer