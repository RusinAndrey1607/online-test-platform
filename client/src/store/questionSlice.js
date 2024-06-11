import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAxios } from "../app/api";

const initialState = {
  loading: false,
  error: null,
  questions: [],
  questionsWithAnswers: [],
};

export const createQuestion = createAsyncThunk(
  "questionCreate/createQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post("/questions/create", questionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQuestions = createAsyncThunk(
  "question/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get("/questions/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchQuestionsWithAnswers = createAsyncThunk(
  "question/fetchQuestionsWithAnswers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get("/questions/questions-with-answers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const questionCreateSlice = createSlice({
  name: "questionCreate",
  initialState,
  reducers: {
    resetQuestionState(state) {
      state.loading = false;
      state.error = null;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setQuestionsWithAnswers(state, action) {
      state.questionsWithAnswers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuestionsWithAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsWithAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.questionsWithAnswers = action.payload;
      })
      .addCase(fetchQuestionsWithAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuestionState, setQuestions, setQuestionsWithAnswers } = questionCreateSlice.actions;

export default questionCreateSlice.reducer;
