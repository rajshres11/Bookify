import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/FIrebase';
import './ViewOrderDetail.css'; // CSS file for styling

const ViewOrderDetail = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (params.bookId) {
            console.log("Fetching orders for book ID:", params.bookId);
            firebase.getOrders(params.bookId)
                .then((orders) => {
                    if (orders.docs.length === 0) {
                        console.log("No orders found for this book");
                    } else {
                        console.log("Orders fetched:");
                    }
                    setOrders(orders.docs);
                })
                .catch((error) => {
                    console.error("Error fetching orders:");
                });
        }
    }, [firebase, params.bookId]);

    if (orders.length === 0) {
        return <h2 className="no-orders-message">No orders found for this book.</h2>;
    }

    return (
        <div className="view-order-detail-container">
            <h1 className="title">View Order Detail</h1>
            <div className="order-list">
                {orders.map((order) => {
                    const data = order.data();
                    return (
                        <div className="order-card" key={order.id}>
                            <p className="order-username"><strong>Order by:</strong> {data.displayName}</p>
                            <p className="order-email"><strong>User Email:</strong> {data.userEmail}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewOrderDetail;
