import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/FIrebase';
import './Register.css'; // CSS file for styling

const Register = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signing up...");
        try {
            const result = await firebase.signupUserWithEmailAndPassword(email, password);
            console.log("Registration successful:");
        } catch (error) {
            console.error("Registration error:");
        }
    };

    useEffect(() => {
        if (firebase.isloggedIn) {
            navigate("/");
        }
    }, [firebase, navigate]);

    return (
        <div className='register-container'>
            <h1 className="register-title">Create Account</h1>
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
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
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

                <Button variant="primary" type="submit" className="create-account-button">
                    Create Account
                </Button>
            </Form>
        </div>
    );
};

export default Register;
