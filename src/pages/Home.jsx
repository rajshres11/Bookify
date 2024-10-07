import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Context/FIrebase';
import CardBook from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Home.css'; // Custom CSS for styling

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Explore Books</h1>
      {books.length === 0 ? (
        <h3 className="text-center">No books available</h3>
      ) : (
        <CardGroup className="custom-card-group">
          {books.map((book) => (
            <CardBook
              link={`/book/view/${book.id}`}
              key={book.id}
              id={book.id}
              {...book.data()}
            />
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default Home;
