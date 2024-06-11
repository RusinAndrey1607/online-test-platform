import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage";
import WithAuth from "../hoc/WithAuth";
import WithTeacherRole from "../hoc/WithTeacherRole";
import SubjectCreatePage from "../pages/CreateSubject";
import QuestionCreatePage from "../pages/QuestionCreate";
import AnswerCreatePage from "../pages/AnswerCreatePage";
import QuestionsPage from "../pages/QuestionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<WithAuth element={<App />} />
    ,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <AuthPage />,
  },
  {
    path: "/subjects/create",
    element: <WithTeacherRole element={<SubjectCreatePage />} />,
  },
  {
    path: "/questions/create",
    element: <WithTeacherRole element={<QuestionCreatePage />} />,
  },
  {
    path: "/answers/create",
    element: <WithTeacherRole element={<AnswerCreatePage />} />,
  },
  {
    path: "/questions",
    element: <WithAuth element={<QuestionsPage />} />
  }
]);
