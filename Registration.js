import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GlobalStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap");
`;

const StyledH1 = styled.h1`
  font-family: "Pacifico", cursive;
  font-weight: 400;
  color: Black;
`;

export default function Registration() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ReenteredPassword, setReenteredPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleReenteredPassword = (event) => {
    setReenteredPassword(event.target.value);
  };

  const handleFormData = async (event) => {
    try {
      event.preventDefault();

      if (Password !== ReenteredPassword) {
        setPasswordMatchError("Passwords do not match");
        return;
      }
      const response = await axios.post("http://localhost:3000/register", {
        username: Username,
        password: Password,
      });

      if (response.status == 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameError("Username already exists");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <br></br>
        <Card
          style={{
            width: "500px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Card.Body>
            <GlobalStyle>
              <StyledH1>Fusion</StyledH1>
            </GlobalStyle>
            <br></br>
            <Form onSubmit={handleFormData}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={Username}
                  onChange={handleUsername}
                  required
                />
                <Form.Text className="text-danger">{usernameError}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={handlePassword}
                  required
                />
              </Form.Group>

              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter Password"
                value={ReenteredPassword}
                onChange={handleReenteredPassword}
                required
              />
              <Form.Text className="text-danger">{passwordMatchError}</Form.Text>
              <br></br>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Agree to all terms & Conditions"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Create Account
              </Button>
            </Form>
            <br></br>
            <p>
              Have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Log in
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
