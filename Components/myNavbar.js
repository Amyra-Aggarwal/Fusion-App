import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import axios from "axios";

const GlobalStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap");
`;

const StyledH1 = styled.h1`
  font-family: "Pacifico", cursive;
  font-weight: 400;
`;

export default function MyNavbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await axios.get("http://localhost:3000/getusername", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);
  const handleLogout = () => {
 localStorage.removeItem('jwtToken');
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <GlobalStyle>
              <StyledH1>Fusion</StyledH1>
            </GlobalStyle>
          </Navbar.Brand>
          <Navbar.Brand href="/posts">Home</Navbar.Brand>
          <Navbar.Brand href="/About">About</Navbar.Brand>
          <Navbar.Brand href="/Contact">Contact Us</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand href="/Createposts">Create Post</Navbar.Brand>
            <Navbar.Text>
              <NavDropdown title={`Hi, ${username}`} id="basic-nav-dropdown">
                <NavDropdown.Item href="/myposts">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login"onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
