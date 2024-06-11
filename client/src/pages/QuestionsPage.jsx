import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsWithAnswers } from "../store/questionSlice";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { apiAxios } from "../app/api";
import NavBar from "../components/NavBar";

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const { questionsWithAnswers, loading, error } = useSelector(
    (state) => state.question
  );
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (questionsWithAnswers.length === 0) {
      dispatch(fetchQuestionsWithAnswers());
    }
  }, [dispatch, questionsWithAnswers.length]);

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async () => {
    const answers = Object.entries(selectedAnswers).map(
      ([questionId, answerId]) => ({
        questionId: parseInt(questionId, 10),
        answerId: parseInt(answerId, 10),
      })
    );

    const payload = {
      userId,
      answers,
    };
    console.log(payload);
    try {
      const response = await apiAxios.post("/result/submit", payload);
      console.log("Result submitted successfully:", response.data);
      const scoreResponse = await apiAxios.get(
        `/result/user/${userId}/total-score`
      );
      const { totalScore, possibleTotalScore } = scoreResponse.data;

      alert(
        `Total Score: ${totalScore}, Possible Total Score: ${possibleTotalScore}`
      );
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Questions
        </Typography>
        {questionsWithAnswers.map(
          (question) =>
            question.Answers &&
            question.Answers.length > 0 && (
              <div key={question.id}>
                <Typography variant="h6" component="h2">
                  {question.text}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedAnswers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                  >
                    {question.Answers.map((answer) => (
                      <FormControlLabel
                        key={answer.id}
                        value={answer.id}
                        control={<Radio />}
                        label={answer.text}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Answers
        </Button>
      </Container>
    </>
  );
};

export default QuestionsPage;
