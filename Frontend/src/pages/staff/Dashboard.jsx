import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Staff.css";
import messFood from "../../assets/mess-food.jpg";
import "../../styles/DashboardHero.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response =
                    await api.get("/staff/dashboard");

                console.log(
                    "STAFF DASHBOARD:",
                    response.data
                );

                setDashboard(response.data);

            } catch (error) {

                console.error(
                    "Staff Dashboard Error:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Unable to load staff dashboard"
                );

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>MessConnect</h2>

                <Link to="/staff/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/staff/billing">
                    🧾 Billing Counter
                </Link>

                

                <Link to="/login">
                    🚪 Logout
                </Link>

            </div>

            <div className="content">
                <div className="dashboardHero">
    <img
        src="/mess-food.jpg"
        alt="MessConnect Food"
    />
</div>

                <h1>Welcome Staff 👋</h1>

                {loading ? (

                    <p>Loading dashboard...</p>

                ) : dashboard ? (

                    <div className="cards">

                        <div className="card">

                            <h2>
                                {dashboard.todayOrders}
                            </h2>

                            <p>
                                Today's Orders
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                ₹{dashboard.todayCollection}
                            </h2>

                            <p>
                                Today's Collection
                            </p>

                        </div>

                        <div className="card">

                            <h2>
                                {dashboard.studentsServed}
                            </h2>

                            <p>
                                Students Served
                            </p>

                        </div>

                    </div>

                ) : (

                    <p>
                        Unable to load dashboard data.
                    </p>

                )}

            </div>

        </div>

    );

}

export default Dashboard;