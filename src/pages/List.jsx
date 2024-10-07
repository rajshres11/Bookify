import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/FIrebase';
import './List.css'; // CSS file for styling

const List = () => {
  const firebase = useFirebase();

  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [coverPic, setCoverPic] = useState(null); // File state should be null initially
  const [message, setMessage] = useState(''); // For success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverPic) {
      setMessage('No file selected');
      return;
    }

    // Make sure firebase logic is correct for file uploads.
    try {
      await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
      setMessage('Listing created successfully');
      setName('');
      setIsbnNumber('');
      setPrice('');
      setCoverPic(null);
    } catch (error) {
      setMessage('Error creating listing');
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className='list-container'>
      <h1 className="form-title">Create New Listing</h1>
      <Form onSubmit={handleSubmit} className="listing-form">
        <Form.Group controlId="formBasicName">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter book name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group controlId="formFileUpload">
          <Form.Label>Cover Picture</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])} // Set the file object
            type="file"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter amount (INR)"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="create-button">
          Create
        </Button>

        {/* Display success/error message */}
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </Form>
    </div>
  );
};

export default List;
