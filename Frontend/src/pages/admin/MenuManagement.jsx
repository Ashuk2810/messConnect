import { Link } from "react-router-dom";
import "./Admin.css";

function MenuManagement() {

    const menu = [
        {
            id: 1,
            meal: "Breakfast",
            food: "Idli, Dosa"
        },
        {
            id: 2,
            meal: "Lunch",
            food: "Rice Meal, Paneer Curry"
        },
        {
            id: 3,
            meal: "Snacks",
            food: "Tea, Samosa"
        },
        {
            id: 4,
            meal: "Dinner",
            food: "Veg Thali"
        }
    ];

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/food">Food Management</Link>
                <Link to="/admin/orders">
                    📋 Orders
                </Link>
                <Link to="/admin/menu">Today's Menu</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/staff">Staff</Link>
                <Link to="/admin/wallet">Wallet</Link>
                <Link to="/login">Logout</Link>

            </div>

            <div className="content">

                <h1>Today's Menu</h1>

                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>Meal</th>
                            <th>Food Items</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {menu.map(item => (

                            <tr key={item.id}>

                                <td>{item.meal}</td>

                                <td>{item.food}</td>

                                <td>

                                    <button className="editBtn">
                                        Edit
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MenuManagement;