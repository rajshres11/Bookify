import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Context/FIrebase';
import CardBook from '../components/Card';
import './ViewOrder.css';

const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (firebase.user) {
                console.log("User is logged in:", firebase.user.uid); // Log the user UID
                try {
                    const fetchedBooks = await firebase.fetchMyBooks(firebase.user.uid);
                    if (fetchedBooks.empty) {
                        console.log("No books found for this user."); // Log if no books are found
                        setBooks([]); // Clear the books state
                    } else {
                        console.log("Books fetched:", fetchedBooks.docs); // Log the fetched books
                        setBooks(fetchedBooks.docs); // Set the fetched books
                    }
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            } else {
                console.log("User is not logged in."); // Log if user is not logged in
            }
        };

        fetchBooks();
    }, [firebase.user]);

    if (!firebase.user) return <h1>Loading...</h1>;

    return (
        <div className="view-order-container">
            {books.length === 0 ? (
                <h2>No books found</h2>
            ) : (
                <div className="book-grid">
                    {books.map((book) => {
                        const bookData = book.data();
                        console.log(`User ID in document: ${bookData.userID}, Logged in user ID: ${firebase.user.uid}`); // Log both IDs
                        return (
                            <CardBook
                                link={`/books/orders/${book.id}`}
                                key={book.id}
                                id={book.id}
                                {...bookData}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ViewOrder;
