import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAxios } from "../app/api";

export const createSubject = createAsyncThunk(
  "subjects/create",
  async (subjectName, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post("/subjects/create", {
        name: subjectName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  subjects: [],
};

export const fetchSubjects = createAsyncThunk(
  "subject/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get("/subjects/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSubject.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createSubject.fulfilled, (state) => {
      state.status = "idle";
    });
    builder
      .addCase(createSubject.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subjectSlice.reducer;
