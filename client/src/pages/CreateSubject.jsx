import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSubject } from "../store/subjectSlice";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

const SubjectCreatePage = () => {
  const dispatch = useDispatch();
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubject(subjectName));
    setSubjectName("");
    alert("Subject has been created")
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Create Subject
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="subjectName"
          label="Subject Name"
          name="subjectName"
          autoFocus
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default SubjectCreatePage;
