import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './MyNavbar.css'; // Custom CSS for additional styling

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"   className="custom-navbar sticky top-0">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/book/list">
              Add Listing
            </Nav.Link>
            <Nav.Link as={NavLink} to="/book/orders">
              Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
