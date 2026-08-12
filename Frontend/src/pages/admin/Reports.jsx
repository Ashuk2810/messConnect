import { Link } from "react-router-dom";
import "./Admin.css";

function Reports() {

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/admin/dashboard">🏠 Dashboard</Link>
                <Link to="/admin/food">🍽 Food Management</Link>
                <Link to="/admin/orders">📋 Orders</Link>
                <Link to="/admin/reports">📊 Reports</Link>
                <Link to="/admin/users">👥 Users</Link>
                <Link to="/admin/staff">👨‍🍳 Staff</Link>
                <Link to="/admin/wallet">💳 Wallet</Link>
                <Link to="/login">🚪 Logout</Link>

            </div>

            <div className="content">

                <h1>Reports & Analytics</h1>

                <div className="cards">

                    <div className="card">
                        <h2>₹8,240</h2>
                        <p>Today's Revenue</p>
                    </div>

                    <div className="card">
                        <h2>₹1,84,500</h2>
                        <p>Monthly Revenue</p>
                    </div>

                    <div className="card">
                        <h2>1,542</h2>
                        <p>Total Orders</p>
                    </div>

                    <div className="card">
                        <h2>Paneer Curry</h2>
                        <p>Most Ordered Food</p>
                    </div>

                    <div className="card">
                        <h2>152</h2>
                        <p>Registered Students</p>
                    </div>

                    <div className="card">
                        <h2>₹45,670</h2>
                        <p>Total Wallet Balance</p>
                    </div>

                </div>

                <br />

                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>Report</th>
                            <th>Value</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>Breakfast Orders</td>
                            <td>310</td>
                        </tr>

                        <tr>
                            <td>Lunch Orders</td>
                            <td>540</td>
                        </tr>

                        <tr>
                            <td>Snacks Orders</td>
                            <td>390</td>
                        </tr>

                        <tr>
                            <td>Dinner Orders</td>
                            <td>302</td>
                        </tr>

                        <tr>
                            <td>Successful Payments</td>
                            <td>1542</td>
                        </tr>

                        <tr>
                            <td>Failed Payments</td>
                            <td>5</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Reports;