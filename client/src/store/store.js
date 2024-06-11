import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth.slice'
import subjectSlice from './subjectSlice'
import questionSlice from './questionSlice'
import answerSlice from './answerSlice'


export const store = configureStore({
  reducer: {
    auth:authSlice,
    subject:subjectSlice,
    question:questionSlice,
    answer:answerSlice
  },
})