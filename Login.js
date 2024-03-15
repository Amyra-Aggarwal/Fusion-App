import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

export default function Login() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  
  const handleusername = (event) => {
    setUsername(event.target.value); //stored username
  };
  const handlepassword = (event) => {
    setPassword(event.target.value); //stored password
  };
  const handleformdata = async (event) => {
    try {
      event.preventDefault(); // dont get reloded
      const response = await axios.post("http://localhost:3000/login", {
        username: Username,
        password: Password,
      });
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/posts");
      }
    } catch (error) {
      setLoginErr("Invalid Username or Password");
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:60,

        }}
      >
        <br></br>
        <Card
          style={{
            width: "500px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin:40,
          }}
        >
          <Card.Body>
          <GlobalStyle><StyledH1>Fusion</StyledH1></GlobalStyle>
          <br></br>
            <Form onSubmit={handleformdata}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={Username}
                  onChange={handleusername}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={handlepassword}
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                Login
              </Button>
              <br></br>
             <Link to="/login" className="text-decoration-none text-black text-center" >Forgot Password?</Link>
              <p className="mb-3 text-danger" >{loginErr}</p>
              <p>Don't have an account? <Link to="/register" className="text-decoration-none">Sign Up</Link></p>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Footer/>
    </div>
  );
}
