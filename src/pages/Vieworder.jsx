import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Context/FIrebase';
import CardBook from '../components/Card';
import './ViewOrder.css'; // Make sure to create this CSS file

const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isloggedIn) {
            console.log("Fetching books for user:", firebase.user.uid);
            firebase.fetchMyBooks(firebase.user.uid)
                .then((books) => {
                    console.log("Books fetched:", books.docs);
                    setBooks(books.docs);
                })
                .catch((error) => {
                    console.error("Error fetching books:", error);
                });
        }
    }, [firebase]);

    if (!firebase.isloggedIn) return <h1>Please login</h1>;

    return (
        <div className="view-order-container">
            {books.length === 0 ? (
                <h2>No books found</h2>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <CardBook
                            link={`/books/orders/${book.id}`}
                            key={book.id}
                            id={book.id}
                            {...book.data()}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewOrder;
