import React from 'react';
import MyNavbar from './Components/myNavbar';
import Footer from './Components/Footer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div>
      <MyNavbar/>
      <Row className="mt-5 mb-5">
        <Col md={12} className="text-center">
          <h1>Contact us</h1>
          <h5 className="mb-4">Need to get in touch with us? Either fill out the form with your inquiry or email us on <Link to="mailto:Fusion@gmail.com">Fusion@gmail.com</Link>. We would be happy to help you.</h5>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mx-auto">
          <Form>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First name" required />
                </Form.Group>
              </Col>

              <Col xs={6}>
                <Form.Group controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last name" required/>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridInquiry">
              <Form.Label>What can we help you with?</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your inquiry" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Footer/>
    </div>
  );
}
