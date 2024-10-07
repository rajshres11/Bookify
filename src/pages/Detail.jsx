import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/FIrebase';
import './Detail.css'; // CSS file for Detail

const Detail = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false); // State to track order success

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [params.bookId, firebase]);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data, firebase]);

    const placeOrder = async () => {
        try {
            const result = await firebase.placeOrder(params.bookId);
            console.log('Order placed', result);
            setOrderSuccess(true); // Set order success to true when order is placed
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    if (data === null) return <h1>Loading...</h1>;

    return (
        <div className="detail-container">
        <div className="detail-box">
            {url && <img src={url} alt={data.name} className="detail-image" />}
            <div className="detail-info">
                <h1 className="detail-title">{data.name}</h1>
                <h2>Details</h2>
                <h4 className="detail-price">Price: Rs.{data.price}</h4>
                <p><strong>ISBN:</strong> {data.isbn}</p>
                <h3>Owner: {data.displayname}</h3>
                <p><strong>Email:</strong> {data.userEmail}</p>
                <Button onClick={placeOrder} variant="success" className="buy-button ">Buy Now</Button>
            </div>
        </div>
        {orderSuccess && <div className="alert alert-success mt-3">Order placed successfully!</div>}
    </div>
    );
};

export default Detail;
