
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function FoodManagement() {

    const [foods, setFoods] = useState([]);
    const [todayMenu, setTodayMenu] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        foodName: "",
        category: "BREAKFAST",
        price: ""
    });

    const [menuCategory, setMenuCategory] = useState("BREAKFAST");

    const categories = [
        "BREAKFAST",
        "LUNCH",
        "DINNER",
        "SNACKS",
        "BEVERAGE"
    ];

    const fetchFoods = async () => {

        try {

            const response = await api.get("/admin/food/all");

            setFoods(response.data);

        } catch (error) {

            console.error("Error fetching foods:", error);

            alert("Unable to load food items");

        }

    };

    const fetchTodayMenu = async () => {

        try {

            const response = await api.get("/admin/menu");

            setTodayMenu(response.data);

        } catch (error) {

            console.error("Error fetching today's menu:", error);

            alert("Unable to load today's menu");

        }

    };

    useEffect(() => {

        fetchFoods();
        fetchTodayMenu();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = {
                foodName: formData.foodName,
                category: formData.category,
                price: Number(formData.price)
            };

            if (editingId) {

                await api.put(
                    `/admin/food/update/${editingId}`,
                    data
                );

                alert("Food updated successfully");

            } else {

                await api.post(
                    "/admin/food/add",
                    data
                );

                alert("Food added successfully");

            }

            resetForm();

            fetchFoods();

        } catch (error) {

            console.error("Error saving food:", error);

            alert(
                error.response?.data?.message ||
                "Unable to save food"
            );

        }

    };

    const handleEdit = (food) => {

        setFormData({
            foodName: food.foodName,
            category: food.category,
            price: food.price
        });

        setEditingId(food.foodId);

        setShowForm(true);

    };

    const handleDelete = async (foodId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/admin/food/delete/${foodId}`
            );

            alert("Food deleted successfully");

            fetchFoods();
            fetchTodayMenu();

        } catch (error) {

            console.error("Error deleting food:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete food"
            );

        }

    };

    const addToTodayMenu = async (foodId) => {

        try {

            await api.post(
                `/admin/menu/add/${foodId}?category=${menuCategory}`
            );

            alert("Food added to today's menu");

            fetchTodayMenu();

        } catch (error) {

            console.error(
                "Error adding food to today's menu:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to add food to today's menu"
            );

        }

    };

    const removeFromTodayMenu = async (menuId) => {

        const confirmRemove = window.confirm(
            "Remove this food from today's menu?"
        );

        if (!confirmRemove) {
            return;
        }

        try {

            await api.delete(
                `/admin/menu/remove/${menuId}`
            );

            alert("Food removed from today's menu");

            fetchTodayMenu();

        } catch (error) {

            console.error(
                "Error removing food from today's menu:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to remove food"
            );

        }

    };

    const resetForm = () => {

        setFormData({
            foodName: "",
            category: "BREAKFAST",
            price: ""
        });

        setEditingId(null);
        setShowForm(false);

    };

    const filteredFoods = foods.filter(food =>
        food.foodName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const getCategoryName = (category) => {

        if (category === "BEVERAGE") {
            return "Beverages";
        }

        return category.charAt(0) +
            category.slice(1).toLowerCase();

    };

    return (

        <AdminLayout>

            <h1>Food Management</h1>

            <p className="subTitle">
                Manage food items and select today's menu
            </p>

            <div className="foodManagementTop">

                <button
                    className="addBtn"
                    onClick={() => {

                        setEditingId(null);

                        setFormData({
                            foodName: "",
                            category: "BREAKFAST",
                            price: ""
                        });

                        setShowForm(true);

                    }}
                >
                    + Add Food
                </button>

                <input
                    className="searchBox"
                    type="text"
                    placeholder="Search food item..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            {showForm && (

                <div className="foodForm">

                    <h2>
                        {editingId
                            ? "Update Food"
                            : "Add Food"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div>

                            <label>
                                Food Name
                            </label>

                            <input
                                type="text"
                                name="foodName"
                                value={formData.foodName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div>

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="BREAKFAST">
                                    Breakfast
                                </option>

                                <option value="LUNCH">
                                    Lunch
                                </option>

                                <option value="DINNER">
                                    Dinner
                                </option>

                                <option value="SNACKS">
                                    Snacks
                                </option>

                                <option value="BEVERAGE">
                                    Beverages
                                </option>

                            </select>

                        </div>

                        <div>

                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="addBtn"
                        >
                            {editingId
                                ? "Update Food"
                                : "Add Food"}
                        </button>

                        <button
                            type="button"
                            className="deleteBtn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            )}

            <br />

            <h2>Food Master List</h2>

            <table className="foodTable">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Food Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Today's Menu</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredFoods.length === 0 ? (

                        <tr>

                            <td colSpan="6">
                                No food items found
                            </td>

                        </tr>

                    ) : (

                        filteredFoods.map(food => (

                            <tr key={food.foodId}>

                                <td>
                                    {food.foodId}
                                </td>

                                <td>
                                    {food.foodName}
                                </td>

                                <td>
                                    {getCategoryName(food.category)}
                                </td>

                                <td>
                                    ₹{food.price}
                                </td>

                                <td>

                                    <div className="menuAddBox">

                                        <select
                                            value={menuCategory}
                                            onChange={(e) =>
                                                setMenuCategory(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            {categories.map(category => (

                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {getCategoryName(category)}
                                                </option>

                                            ))}

                                        </select>

                                        <button
                                            className="addBtn"
                                            onClick={() =>
                                                addToTodayMenu(
                                                    food.foodId
                                                )
                                            }
                                        >
                                            Add
                                        </button>

                                    </div>

                                </td>

                                <td>

                                    <button
                                        className="editBtn"
                                        onClick={() =>
                                            handleEdit(food)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="deleteBtn"
                                        onClick={() =>
                                            handleDelete(
                                                food.foodId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            <br />

            <h2>Today's Menu</h2>

            {categories.map(category => {

                const categoryItems =
                    todayMenu.filter(
                        item => item.category === category
                    );

                if (categoryItems.length === 0) {
                    return null;
                }

                return (

                    <div
                        key={category}
                        className="todayMenuSection"
                    >

                        <h3>
                            {getCategoryName(category)}
                        </h3>

                        <table className="foodTable">

                            <thead>

                                <tr>

                                    <th>Food</th>
                                    <th>Price</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {categoryItems.map(item => (

                                    <tr key={item.menuId}>

                                        <td>
                                            {item.foodName}
                                        </td>

                                        <td>
                                            ₹{item.price}
                                        </td>

                                        <td>

                                            <button
                                                className="deleteBtn"
                                                onClick={() =>
                                                    removeFromTodayMenu(
                                                        item.menuId
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                );

            })}

            {todayMenu.length === 0 && (

                <div className="card">

                    <p>
                        No food items have been added to
                        today's menu yet.
                    </p>

                </div>

            )}

        </AdminLayout>

    );

}

export default FoodManagement;

