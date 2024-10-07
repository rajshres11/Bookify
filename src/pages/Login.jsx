import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/FIrebase';
import './LoginPage.css'; // CSS file for styling

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in...");
        try {
            const result = await firebase.signinUserWithEmailAndPassword(email, password);
            console.log("Login successful:");
        } catch (error) {
            console.error("Login error:");
        }
    };

    useEffect(() => {
        if (firebase.isloggedIn) {
            navigate("/");
        }
    }, [firebase, navigate]);

    return (
        <div className='login-container'>
            <h1 className="login-title">Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-button">
                    Login
                </Button>
            </Form>

            <h2 className="or-text">Or</h2>
            <Button onClick={firebase.signWithGoogle} variant='danger' className="google-button">
                Continue With Google
            </Button>
        </div>
    );
};

export default LoginPage;
