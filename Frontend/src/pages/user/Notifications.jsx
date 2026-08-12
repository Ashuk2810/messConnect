import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../admin/Admin.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {

        try {

            const response = await api.get("/notifications/my");

            console.log("NOTIFICATIONS:", response.data);

            setNotifications(response.data);

        } catch (error) {

            console.error("Notification Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load notifications"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {

        try {

            await api.put(`/notifications/${id}/read`);

            fetchNotifications();

        } catch (error) {

            console.error("Mark Read Error:", error);

            alert("Unable to mark notification as read");

        }
    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>👤 MessConnect</h2>

                <Link to="/user/dashboard">🏠 Dashboard</Link>
                <Link to="/user/menu">🍽 Today's Menu</Link>
                
                <Link to="/user/profile">👤 Profile</Link>
                <Link to="/user/wallet">💳 Wallet</Link>
                <Link to="/user/notifications">🔔 Notifications</Link>
                <Link to="/user/feedback">⭐ Feedback</Link>
                <Link to="/login">🚪 Logout</Link>

            </div>

            <div className="content">

                <h1>Notifications</h1>

                {loading ? (

                    <p>Loading notifications...</p>

                ) : (

                    <table className="foodTable">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {notifications.length === 0 ? (

                                <tr>

                                    <td colSpan="5">
                                        No notifications found
                                    </td>

                                </tr>

                            ) : (

                                notifications.map(item => (

                                    <tr key={item.notificationId}>

                                        <td>
                                            {item.notificationId}
                                        </td>

                                        <td>
                                            {item.message}
                                        </td>

                                        <td>
                                            {item.createdDate
                                                ? new Date(item.createdDate).toLocaleString()
                                                : "N/A"}
                                        </td>

                                        <td>
                                            {item.isRead
                                                ? "Read"
                                                : "Unread"}
                                        </td>

                                        <td>

                                            {!item.isRead && (

                                                <button
                                                    className="editBtn"
                                                    onClick={() =>
                                                        markAsRead(item.notificationId)
                                                    }
                                                >
                                                    Mark as Read
                                                </button>

                                            )}

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

export default Notifications;