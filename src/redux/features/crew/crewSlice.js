import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosIntance, deleteCrew, getAllCrew, getCrew} from './crewService';

const initialState = {
  crew: [],
  singleCrew: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllCrews = createAsyncThunk("crew/getAllCrews", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllCrew();
    const crew = Array.isArray(response.data) ? response.data : [response.data];
    return crew;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getCrews = createAsyncThunk("crew/getCrew", async (crewId, { rejectWithValue }) => {
  try {
    const response = await getCrew(crewId);
    const crew = response.data && typeof response.data === 'object' ? response.data : null;
    return crew;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const createCrews = createAsyncThunk("crew/createCrew", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosIntance.post(`/crew/post`, formData);
    const newCrew = response.data && typeof response.data === 'object' ? response.data : null;
    return newCrew;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deleteCrews = createAsyncThunk("crew/deleteCrew", async (crewId, { rejectWithValue }) => {
  try {
    const response = await deleteCrew(crewId);
    const deletedCrew = response.data && typeof response.data === 'object' ? response.data : null;
    return deletedCrew;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updatedCrew = createAsyncThunk("crew/updatePost", async ({ id, firstname, lastname, poste, picture, social, link}, { rejectWithValue }) => {
  try {
    const response = await axiosIntance.put(`/crew/update/${id}`, { id, firstname, lastname, poste, picture, social, link});
    const updatedCrew = response.data && typeof response.data === 'object' ? response.data : null;
    return updatedCrew;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const crewSlice = createSlice({
  name: 'crew',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCrews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCrews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.crew = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllCrews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCrews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCrews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleCrew = action.payload;
      })
      .addCase(getCrews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCrews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCrews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        if (Array.isArray(state.crew)) {
          state.crew.push(action.payload);
        } else {
          state.crew = [action.payload]; 
        }
      })
      .addCase(createCrews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCrews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCrews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (Array.isArray(state.crew)) {
          state.crew = state.crew.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          state.crew = []; 
        }
      })
      .addCase(deleteCrews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatedCrew.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedCrew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (Array.isArray(state.crew)) {
          state.crew = state.crew.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        } else {
          state.crew = [action.payload]; 
        }
      })
      .addCase(updatedCrew.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = crewSlice.actions;
export default crewSlice.reducer;
