import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer, resetAnswerState } from '../store/answerSlice';
import { fetchQuestions } from '../store/questionSlice';

const AnswerCreatePage = () => {
  const dispatch = useDispatch();
  const { loading: answerLoading, error: answerError } = useSelector((state) => state.answer);
  const { loading: questionLoading, questions, error: questionError } = useSelector((state) => state.question);

  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [value, setValue] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text: answerText, isCorrect, value, questionId: selectedQuestion })
    dispatch(createAnswer({ text: answerText, isCorrect, value, questionId: selectedQuestion }));
    setAnswerText('');
    setIsCorrect(false);
    setValue('');
    setSelectedQuestion('');
  };

  useEffect(() => {
    return () => {
      dispatch(resetAnswerState());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Create Answer</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          required
          label="Answer Text"
          variant="outlined"
          margin="normal"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <FormControl fullWidth required variant="outlined" margin="normal">
          <InputLabel id="isCorrect-select-label">Is Correct</InputLabel>
          <Select
            labelId="isCorrect-select-label"
            value={isCorrect}
            onChange={(e) => setIsCorrect(e.target.value)}
            label="Is Correct"
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          required
          type="number"
          label="Value"
          variant="outlined"
          margin="normal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FormControl fullWidth required variant="outlined" margin="normal">
          <InputLabel id="question-select-label">Question</InputLabel>
          <Select
            labelId="question-select-label"
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
            label="Question"
          >
            {questionLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : questionError ? (
              <MenuItem disabled>Error loading questions</MenuItem>
            ) : (
              questions.map((question) => (
                <MenuItem key={question.id} value={question.id}>
                  {question.text}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={answerLoading}>
          {answerLoading ? 'Creating...' : 'Create'}
        </Button>
        {answerError && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{answerError}</Typography>}
      </Box>
    </Container>
  );
};

export default AnswerCreatePage;
