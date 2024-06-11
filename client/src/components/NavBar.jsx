import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "16px",
};

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={linkStyle}>
            My App
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/registration" style={linkStyle}>
            Registration
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/subjects/create" style={linkStyle}>
            Create Subject
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/questions/create" style={linkStyle}>
            Create Question
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/answers/create" style={linkStyle}>
            Create Answer
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/questions" style={linkStyle}>
            Questions
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
