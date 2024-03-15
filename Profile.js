import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './Components/myNavbar';
import Footer from './Components/Footer';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from './Components/image.png'; 
import Something from './Components/Something.png';

export default function Profile() {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            (async () => {
                try {
                    const response = await axios.get('http://localhost:3000/posts', {
                        headers: {
                            authorization: 'Bearer ' + localStorage.getItem('jwtToken')
                        }
                    });
                    setApiData(response.data);
                    setLoading(false);
                } catch (error) {
                    setApiError(true);
                }
            })();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (apiError) {
        return (
            <div className="Error-container d-flex align-items-center justify-content-center vh-100">
                <Container className="text-center">
                    <img src={Something} alt="Error" className="Error-image mb-3" />
                    <h3>
                        Sorry, something went wrong. <br />
                        Try reloading the page. We're working hard to fix Fusion <br />
                        for you as soon as possible
                    </h3>
                </Container>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-container justify-content-center d-flex align-items-center h-100vh">
                <img src={image} alt="Logo" className="loading-image" />
            </div>
        );
    }

    const posts = apiData.map((post) => (
        <Col key={post._id} xs={12} md={6} lg={3} className="mb-3">
            <Card style={{ width: '300px', height: '250px' }} className="mx-auto">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ));

    return (
        <div>
            <MyNavbar />
            <Container className="mt-4">
                <Row className="justify-content-center">{posts}</Row>
            </Container>
            <Footer />
        </div>
    );
}
