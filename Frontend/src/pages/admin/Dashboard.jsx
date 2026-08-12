import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Admin.css";
import messFood from "../../assets/mess-food.jpg";
import "../../styles/DashboardHero.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [feedbackCount, setFeedbackCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const res = await api.get("/admin/dashboard");

                console.log("Admin Dashboard:", res.data);

                setDashboard(res.data);

                const feedbackResponse =
                    await api.get("/feedback/unread-count");

                console.log(
                    "Unread Feedback:",
                    feedbackResponse.data
                );

                setFeedbackCount(
                    Number(feedbackResponse.data || 0)
                );

            } catch (err) {

                console.log("Dashboard Error:", err);

                if (err.response) {
                    console.log(
                        "Status:",
                        err.response.status
                    );

                    console.log(
                        "Response:",
                        err.response.data
                    );
                }

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    const handleLogout = () => {

        sessionStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/admin/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/admin/food">
                    🍽 Food Management
                </Link>

                <Link to="/admin/orders">
                    📋 Orders
                </Link>

                <Link to="/admin/users">
                    👥 Users
                </Link>

                <Link to="/admin/staff">
                    👨‍🍳 Staff
                </Link>

                <Link to="/admin/wallet">
                    💳 Wallet
                </Link>

                <Link to="/admin/feedback">

                    ⭐ Feedback

                    {feedbackCount > 0 && (
                        <span className="feedbackBadge">
                            {feedbackCount}
                        </span>
                    )}

                </Link>

                <button onClick={handleLogout}>
                    🚪 Logout
                </button>

            </div>

            <div className="content">

                {/* Dashboard Food Image */}

                <div className="dashboardHero">

                    <img
                        src={messFood}
                        alt="MessConnect Food"
                    />

                </div>

                <h1>
                    Welcome Admin 👋
                </h1>

                <p className="subTitle">
                    College Mess Management Dashboard
                </p>

                {loading && (
                    <p>
                        Loading dashboard...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading && !error && dashboard && (

                    <div className="cards">

                        <div className="card">

                            <h2>
                                {dashboard.totalStudents}
                            </h2>

                            <p>
                                Total Students
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                {dashboard.totalStaff}
                            </h2>

                            <p>
                                Total Staff
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                {dashboard.totalFoodItems}
                            </h2>

                            <p>
                                Food Items
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                {dashboard.todayBills}
                            </h2>

                            <p>
                                Today's Orders
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                ₹{dashboard.todayRevenue}
                            </h2>

                            <p>
                                Today's Revenue
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                ₹{dashboard.totalWalletBalance}
                            </h2>

                            <p>
                                Total Wallet Balance
                            </p>

                        </div>

                    </div>

                )}

                <br />

                <h2>
                    Quick Actions
                </h2>

                <div className="cards">

                    <div className="card">

                        <Link to="/admin/food">

                            <button className="addBtn">
                                🍽 Manage Food
                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <Link to="/admin/users">

                            <button className="addBtn">
                                👥 Manage Users
                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <Link to="/admin/staff">

                            <button className="addBtn">
                                👨‍🍳 Manage Staff
                            </button>

                        </Link>

                    </div>

                    <div className="card">

                        <Link to="/admin/orders">

                            <button className="addBtn">
                                📋 View Orders
                            </button>

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;