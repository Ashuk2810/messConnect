import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../admin/Admin.css";

function Menu() {

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenu = async () => {

        try {

            const response = await api.get("/user/menu");

            console.log("TODAY'S MENU:", response.data);

            setMenu(response.data || []);

        } catch (error) {

            console.error("Menu Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load today's menu"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const categories = [
        {
            key: "BREAKFAST",
            title: "🍳 Breakfast"
        },
        {
            key: "LUNCH",
            title: "🍛 Lunch"
        },
        {
            key: "SNACKS",
            title: "🍿 Snacks"
        },
        {
            key: "DINNER",
            title: "🍽 Dinner"
        },
        {
            key: "BEVERAGE",
            title: "🥤 Beverages"
        }
    ];

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>👤 MessConnect</h2>

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
                </Link>

                <Link to="/user/feedback">
                    ⭐ Feedback
                </Link>

                <Link to="/login">
                    🚪 Logout
                </Link>

            </div>

            <div className="content">

                <h1>Today's Menu</h1>

                <p className="subTitle">
                    Today's available food items
                </p>

                {loading ? (

                    <p>Loading today's menu...</p>

                ) : menu.length === 0 ? (

                    <div className="card">

                        <h2>No Menu Available</h2>

                        <p>
                            Today's menu has not been updated by the admin yet.
                        </p>

                    </div>

                ) : (

                    categories.map(category => {

                        const categoryFoods = menu.filter(
                            food => food.category === category.key
                        );

                        if (categoryFoods.length === 0) {
                            return null;
                        }

                        return (

                            <div
                                className="menuSection"
                                key={category.key}
                            >

                                <h2 className="menuSectionTitle">
                                    {category.title}
                                </h2>

                                <table className="foodTable">

                                    <thead>

                                        <tr>
                                            <th>Food</th>
                                            <th>Price</th>
                                            <th>Available</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {categoryFoods.map(food => (

                                            <tr key={food.foodId}>

                                                <td>
                                                    {food.foodName}
                                                </td>

                                                <td>
                                                    ₹{food.price}
                                                </td>

                                                <td>
                                                    <span className="availableText">
                                                        Yes
                                                    </span>
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    );
}

export default Menu;