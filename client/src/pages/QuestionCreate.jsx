import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../store/questionSlice";
import { fetchSubjects } from "../store/subjectSlice";
import NavBar from "../components/NavBar";

const QuestionCreatePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.question);
  const [questionText, setQuestionText] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const { loading: questionLoading, error: questionError } = useSelector(
    (state) => state.question
  );

  const {
    loading: subjectLoading,
    subjects,
    error: subjectError,
  } = useSelector((state) => state.subject);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text: questionText, difficulty, subjectId: selectedSubject });
    dispatch(createQuestion({ text: questionText, difficulty, subjectId: selectedSubject }));
    alert("Question has been created")
    setQuestionText('');
    setDifficulty('');
    setSelectedSubject('')
  };

  useEffect(() => {
    if (subjects.length === 0) {
      dispatch(fetchSubjects());
    }
  }, [dispatch, subjects]);
  return (
    <>
    <NavBar />
     <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Question
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          required
          label="Question Text"
          variant="outlined"
          margin="normal"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <FormControl fullWidth required variant="outlined" margin="normal">
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-select-label"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            label="Difficulty"
          >
            <MenuItem value={1}>1 (Очень легко)</MenuItem>
            <MenuItem value={2}>2 (Легко)</MenuItem>
            <MenuItem value={3}>3 (Средне)</MenuItem>
            <MenuItem value={4}>4 (Сложно)</MenuItem>
            <MenuItem value={5}>5 (Очень сложно)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required variant="outlined" margin="normal">
          <InputLabel id="subject-select-label">Subject</InputLabel>
          <Select
            labelId="subject-select-label"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            label="Subject"
          >
            {subjectLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : subjectError ? (
              <MenuItem disabled>Error loading subjects</MenuItem>
            ) : (
              subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={questionLoading}>
          {questionLoading ? "Creating..." : "Create"}
        </Button>
        {questionError && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {questionError}
          </Typography>
        )}
      </Box>
    </Container>
    </>
   
  );
};

export default QuestionCreatePage;
