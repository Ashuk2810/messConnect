import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Admin.css";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const response =
                await api.get("/billing/all");

            console.log(
                "ADMIN ORDERS:",
                response.data
            );

            setOrders(response.data);

        } catch (error) {

            console.error(
                "Error fetching orders:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load orders"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/food">
                    Food Management
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <Link to="/admin/users">
                    Users
                </Link>

                <Link to="/admin/staff">
                    Staff
                </Link>

                <Link to="/admin/wallet">
                    Wallet
                </Link>

                <Link to="/admin/feedback">
                    Feedback
                </Link>

                <Link to="/login">
                    Logout
                </Link>

            </div>

            <div className="content">

                <h1>Order Management</h1>

                {loading ? (

                    <p>Loading orders...</p>

                ) : (

                    <table className="foodTable">

                        <thead>

                            <tr>

                                <th>Bill ID</th>
                                <th>User Code</th>
                                <th>Student</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.length === 0 ? (

                                <tr>

                                    <td colSpan="7">
                                        No orders found
                                    </td>

                                </tr>

                            ) : (

                                orders.map(order => (

                                    <tr key={order.billId}>

                                        <td>
                                            {order.billId}
                                        </td>

                                        <td>
                                            {order.userCode}
                                        </td>

                                        <td>
                                            {order.studentName}
                                        </td>

                                        <td>
                                            {order.items}
                                        </td>

                                        <td>
                                            ₹{order.amount}
                                        </td>

                                        <td>
                                            {order.status}
                                        </td>

                                        <td>
                                            {new Date(
                                                order.billDate
                                            ).toLocaleString()}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default Orders;