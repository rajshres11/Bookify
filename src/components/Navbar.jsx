import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/FIrebase'; // Correct import
import './MyNavbar.css'; // Custom CSS for additional styling

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.signOut(); // Call the sign out function
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar sticky top-0">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            {firebase.isloggedIn && ( // Render these links only if the user is logged in
              <>
                <Nav.Link as={NavLink} to="/book/list">
                  Add Listing
                </Nav.Link>
                <Nav.Link as={NavLink} to="/book/orders">
                  Orders
                </Nav.Link>
              </>
            )}
            {firebase.isloggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link> // Show logout if logged in
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
