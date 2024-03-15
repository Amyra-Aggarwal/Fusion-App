import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyNavbar from './Components/myNavbar';
import Footer from './Components/Footer';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import image from './Components/image.png';

export default function Post() {
    const params = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
    
                if (!token) {
                    console.error('JWT token not found in local storage');
                    setLoading(false);
                    return;
                }
    
                const response = await axios.get(`http://localhost:3000/posts/${params.postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setPostData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };
    
        fetchPost();
    }, [params.postId]);

    if (loading) {
        return (
            <div className="text-center">
                <img src={image} alt="Loading..." />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <MyNavbar />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    {postData ? (
                        <Col xs={12} md={6} lg={3} className="mb-3">
                            <Card style={{ width: '300px', height: '250px' }} className="mx-auto">
                                <Card.Body>
                                    <Card.Title>{postData.title}</Card.Title>
                                    <Card.Text>{postData.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ) : (
                        <p>No post found.</p>
                    )}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}
