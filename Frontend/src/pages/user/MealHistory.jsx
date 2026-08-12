import { Link } from "react-router-dom";
import "../admin/Admin.css";

function MealHistory() {

    const history = [

        { id: 1, date: "25 Jul 2026", meal: "Breakfast", items: "Idli + Tea", amount: 30, status: "Taken" },
        { id: 2, date: "25 Jul 2026", meal: "Lunch", items: "Rice Meal", amount: 60, status: "Taken" },
        { id: 3, date: "24 Jul 2026", meal: "Dinner", items: "Chapati + Curry", amount: 80, status: "Taken" },
        { id: 4, date: "23 Jul 2026", meal: "Breakfast", items: "Dosa", amount: 35, status: "Skipped" },
        { id: 5, date: "22 Jul 2026", meal: "Lunch", items: "Paneer Meal", amount: 90, status: "Taken" }

    ];

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>👤 MessConnect</h2>

                <Link to="/user/dashboard">🏠 Dashboard</Link>
                <Link to="/user/menu">🍽 Today's Menu</Link>
                <Link to="/user/booking">📅 Meal Booking</Link>
               
                <Link to="/user/profile">👤 Profile</Link>
                <Link to="/user/wallet">💳 Wallet</Link>
                <Link to="/user/notifications">🔔 Notifications</Link>
                <Link to="/user/feedback">⭐ Feedback</Link>
                <Link to="/login">🚪 Logout</Link>

            </div>

            <div className="content">

                <h1>Meal History</h1>

                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Date</th>
                            <th>Meal</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            history.map(record => (

                                <tr key={record.id}>

                                    <td>{record.id}</td>
                                    <td>{record.date}</td>
                                    <td>{record.meal}</td>
                                    <td>{record.items}</td>
                                    <td>₹{record.amount}</td>
                                    <td>{record.status}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MealHistory;