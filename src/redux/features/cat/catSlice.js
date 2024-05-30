import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCat } from './catService';


const initialState={
  category :[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const getAllCats = createAsyncThunk("post/getAllCats", async (_, { rejectWithValue }) => {
  try {
      const response = await getAllCat();
      return response.data;
     
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
});


export const catSlice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {
        reducers: {
            reset: (state) => initialState,
          },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAllCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       state.category = action.payload
      })
      .addCase(getAllCats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
    },
  })

  export const { reset } = catSlice.actions
  export default catSlice.reducer