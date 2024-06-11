import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onSubmit, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  const navigateTo = (url) => {
    navigate(url);
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
          {type === "login" ? "Login" : "Register"}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {type === "login" ? "Login" : "Register"}
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() =>
            navigateTo(type === "login" ? "/registration" : "/login")
          }
        >
          {type === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </Link>
      </Box>
    </Container>
  );
};

export default AuthForm;
