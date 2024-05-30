import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosIntance, deletePost, getAllPost, getPost, getPostByCat } from './postService';

const initialState = {
  post: [],
  singlePost: [],
  catPost: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllPost();
    const posts = Array.isArray(response.data) ? response.data : [response.data];
    return posts;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getPosts = createAsyncThunk("post/getPost", async (postId, { rejectWithValue }) => {
  try {
    const response = await getPost(postId);
    const post = response.data && typeof response.data === 'object' ? response.data : null;
    return post;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const getPostsByCat = createAsyncThunk("post/getPostByCat", async (category, { rejectWithValue }) => {
  try {
    const response = await getPostByCat(category);
    const posts = Array.isArray(response.data) ? response.data : [response.data];
    return posts;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const createPost = createAsyncThunk("post/createPost", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosIntance.post(`/post/post`, formData);
    const newPost = response.data && typeof response.data === 'object' ? response.data : null;
    return newPost;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deletePosts = createAsyncThunk("post/deletePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await deletePost(postId);
    const deletedPost = response.data && typeof response.data === 'object' ? response.data : null;
    return deletedPost;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async ({ id, title, eventdate, description, categoryId, userId, place, imgprod, prodimgs }, { rejectWithValue }) => {
  try {
    const response = await axiosIntance.put(`/post/update/${id}`, { id, title, eventdate, description, categoryId, userId, place, imgprod, prodimgs });
    const updatedPost = response.data && typeof response.data === 'object' ? response.data : null;
    return updatedPost;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPostsByCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsByCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.catPost = action.payload;
      })
      .addCase(getPostsByCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singlePost = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        if (Array.isArray(state.post)) {
          state.post.push(action.payload);
        } else {
          state.post = [action.payload]; 
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (Array.isArray(state.post)) {
          state.post = state.post.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          state.post = []; 
        }
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (Array.isArray(state.post)) {
          state.post = state.post.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        } else {
          state.post = [action.payload]; 
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
