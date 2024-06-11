import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAxios } from '../app/api';

export const createAnswer = createAsyncThunk(
  'answer/createAnswer',
  async (answerData, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/answers/create', answerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  answers: [],
  answer: null,
  loading: false,
  error: null
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    resetAnswerState(state) {
      state.answers = [];
      state.answer = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload;
        state.answers.push(action.payload);
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetAnswerState } = answerSlice.actions;

export default answerSlice.reducer;
