import React from 'react';
import MyNavbar from './Components/myNavbar';
import Footer from './Components/Footer';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Createposts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://localhost:3000/posts',
        { title, content },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log('Post created successfully');
        navigate('/posts');
        
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <MyNavbar />
      <Container className="mt-4">
        <Form onSubmit={handlePostSubmit}>
          <Form.Group className="mb-3" controlId="postForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={handleContentChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Post
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
