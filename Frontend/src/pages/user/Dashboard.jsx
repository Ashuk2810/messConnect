import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "../admin/Admin.css";
import messFood from "../../assets/mess-food.jpg";

function Dashboard() {


const fullName = sessionStorage.getItem("fullName");
const userCode = sessionStorage.getItem("userCode");

const [balance, setBalance] = useState(0);
const [menu, setMenu] = useState([]);
const [loadingMenu, setLoadingMenu] = useState(true);
const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {

    const loadDashboard = async () => {

        try {

            const balanceResponse = await api.get(
                `/wallet/balance/${userCode}`
            );

            console.log(
                "Dashboard Balance:",
                balanceResponse.data
            );

            setBalance(
                Number(balanceResponse.data.balance || 0)
            );

            const menuResponse = await api.get(
                "/user/menu"
            );

            console.log(
                "Dashboard Menu:",
                menuResponse.data
            );

            setMenu(menuResponse.data || []);

            const notificationResponse =
                await api.get(
                    "/notifications/unread-count"
                );

            console.log(
                "Unread Notifications:",
                notificationResponse.data
            );

            setUnreadCount(
                notificationResponse.data
            );

        } catch (err) {

            console.log(
                "Dashboard Error:",
                err
            );

        } finally {

            setLoadingMenu(false);

        }

    };

    if (userCode) {
        loadDashboard();
    }

}, [userCode]);

return (

    <div className="dashboard">

        <div className="sidebar">

            <h2>
                🎓 MessConnect
            </h2>

            <Link to="/user/dashboard">
                🏠 Dashboard
            </Link>

            <Link to="/user/menu">
                🍽 Today's Menu
            </Link>

            <Link to="/user/profile">
                👤 Profile
            </Link>

            <Link to="/user/wallet">
                💳 Wallet
            </Link>

            <Link to="/user/notifications">

                🔔 Notifications

                {unreadCount > 0 && (
                    <span className="badge">
                        {unreadCount}
                    </span>
                )}

            </Link>

            <Link to="/user/feedback">
                ⭐ Feedback
            </Link>

            <Link to="/login">
                🚪 Logout
            </Link>

        </div>

        <div className="content">

            {/* Dashboard Image */}

            <div className="dashboardHero">

                <img
                    src={messFood}
                    alt="MessConnect Food"
                />

            </div>

            {/* Welcome Text - OUTSIDE IMAGE */}

            <div className="dashboardWelcome">

                <h1>
                    Welcome, {fullName || "User"} 👋
                </h1>

                <p className="subTitle">
                    User Code: {userCode || "N/A"}
                </p>

                <p className="subTitle">
                    Smart Mess Management System
                </p>

            </div>

            <div className="cards">

                <div className="card">

                    <h2>
                        ₹{balance.toFixed(2)}
                    </h2>

                    <p>
                        Wallet Balance
                    </p>

                </div>

                <div className="card">

                    <h2>
                        {menu.length}
                    </h2>

                    <p>
                        Available Food Items
                    </p>

                </div>

                <div className="card">

                    <h2>

                        {loadingMenu
                            ? "Loading..."
                            : menu.length > 0
                                ? "Available"
                                : "No Menu"
                        }

                    </h2>

                    <p>
                        Today's Menu
                    </p>

                </div>

            </div>

            <br />

            <h2>
                Today's Menu
            </h2>

            {loadingMenu ? (

                <p>
                    Loading today's menu...
                </p>

            ) : (

                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Meal</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Available</th>

                        </tr>

                    </thead>

                    <tbody>

                        {menu.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No food items available today
                                </td>

                            </tr>

                        ) : (

                            menu.map(food => (

                                <tr key={food.foodId}>

                                    <td>
                                        {food.foodId}
                                    </td>

                                    <td>
                                        {food.category}
                                    </td>

                                    <td>
                                        {food.foodName}
                                    </td>

                                    <td>
                                        ₹{food.price}
                                    </td>

                                    <td>
                                        Yes
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            )}

            <br />

            <h2>
                Recent Meals
            </h2>

            <div className="card">

                <p>
                    Your recent meal transactions will appear here
                    after successful billing.
                </p>

                <Link to="/user/wallet">

                    <button className="addBtn">
                        💳 View Transaction History
                    </button>

                </Link>

            </div>

        </div>

    </div>

);


}

export default Dashboard;
