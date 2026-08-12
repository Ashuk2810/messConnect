import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function Menu() {

const [foods, setFoods] = useState([]);
const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);
const [editingFood, setEditingFood] = useState(null);

const [formData, setFormData] = useState({
    foodName: "",
    category: "BREAKFAST",
    price: ""
});

const fetchFoods = async () => {

    try {

        const response = await api.get("/admin/food/all");

        setFoods(response.data);

    } catch (error) {

        console.error("Error fetching food:", error);

        alert(
            error.response?.data?.message ||
            "Unable to load food menu"
        );

    }

};

useEffect(() => {

    fetchFoods();

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

        if (editingFood) {

            await api.put(
                `/admin/food/update/${editingFood.foodId}`,
                data
            );

            alert("Food Updated Successfully");

        } else {

            await api.post(
                "/admin/food/add",
                data
            );

            alert("Food Added Successfully");

        }

        setFormData({
            foodName: "",
            category: "BREAKFAST",
            price: ""
        });

        setEditingFood(null);
        setShowForm(false);

        fetchFoods();

    } catch (error) {

        console.error("Food save error:", error);

        alert(
            error.response?.data?.message ||
            "Unable to save food"
        );

    }

};

const editFood = (food) => {

    setEditingFood(food);

    setFormData({
        foodName: food.foodName,
        category: food.category,
        price: food.price
    });

    setShowForm(true);

};

const deleteFood = async (foodId) => {

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

        alert("Food Deleted Successfully");

        fetchFoods();

    } catch (error) {

        console.error("Delete food error:", error);

        alert(
            error.response?.data?.message ||
            "Unable to delete food"
        );

    }

};

const cancelForm = () => {

    setShowForm(false);
    setEditingFood(null);

    setFormData({
        foodName: "",
        category: "BREAKFAST",
        price: ""
    });

};

const filteredFoods = foods.filter(food =>

    food.foodName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

    food.category
        ?.toLowerCase()
        .includes(search.toLowerCase())

);

return (

    <AdminLayout>

        <h1>Food Menu Management</h1>

        <div style={{ marginBottom: "20px" }}>

            <input
                type="text"
                placeholder="Search Food..."
                className="searchBox"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <button
                className="addBtn"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                    setEditingFood(null);
                    setShowForm(true);
                }}
            >
                + Add Food
            </button>

        </div>

        {showForm && (

            <div className="foodForm">

                <h2>
                    {editingFood
                        ? "Edit Food"
                        : "Add Food"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div>

                        <label>Food Name</label>

                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleChange}
                            placeholder="Enter food name"
                            required
                        />

                    </div>

                    <div>

                        <label>Category</label>

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
                                Beverage
                            </option>

                        </select>

                    </div>

                    <div>

                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="1"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="addBtn"
                    >
                        {editingFood
                            ? "Update Food"
                            : "Add Food"}
                    </button>

                    <button
                        type="button"
                        className="deleteBtn"
                        style={{ marginLeft: "10px" }}
                        onClick={cancelForm}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        )}

        <br />

        <table className="foodTable">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Food Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {filteredFoods.length === 0 ? (

                    <tr>

                        <td colSpan="5">
                            No food found
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
                                {food.category}
                            </td>

                            <td>
                                ₹{food.price}
                            </td>

                            <td>

                                <button
                                    className="editBtn"
                                    onClick={() =>
                                        editFood(food)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="deleteBtn"
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                    onClick={() =>
                                        deleteFood(
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

    </AdminLayout>

);


}

export default Menu;
