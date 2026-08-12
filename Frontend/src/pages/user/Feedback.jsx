import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../admin/Admin.css";

function Feedback() {

    const [foods, setFoods] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const [foodId, setFoodId] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {

        try {

            const foodResponse = await api.get("/user/menu");
            setFoods(foodResponse.data);

            const feedbackResponse = await api.get("/feedback/my");
            setFeedback(feedbackResponse.data);

        } catch (error) {

            console.error("Feedback Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load feedback"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitFeedback = async (e) => {

        e.preventDefault();

        if (!foodId) {
            alert("Please select food");
            return;
        }

        if (!rating) {
            alert("Please select rating");
            return;
        }

        try {

            const response = await api.post("/feedback/submit", {
                foodId: Number(foodId),
                rating: Number(rating),
                comment: comment
            });

            console.log("FEEDBACK RESPONSE:", response.data);

            alert("Feedback submitted successfully");

            setFoodId("");
            setRating("");
            setComment("");

            const feedbackResponse = await api.get("/feedback/my");
            setFeedback(feedbackResponse.data);

        } catch (error) {

            console.error("Submit Feedback Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to submit feedback"
            );

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

                <h1>Feedback</h1>

                <div className="card">

                    <h2>Give Feedback</h2>

                    <br />

                    <form onSubmit={submitFeedback}>

                        <label>Food Item</label>

                        <br />

                        <select
                            value={foodId}
                            onChange={(e) => setFoodId(e.target.value)}
                            required
                        >

                            <option value="">
                                Select Food
                            </option>

                            {foods.map(food => (

                                <option
                                    key={food.foodId}
                                    value={food.foodId}
                                >
                                    {food.foodName} - ₹{food.price}
                                </option>

                            ))}

                        </select>

                        <br />
                        <br />

                        <label>Rating</label>

                        <br />

                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >

                            <option value="">
                                Select Rating
                            </option>

                            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                            <option value="4">⭐⭐⭐⭐ - Good</option>
                            <option value="3">⭐⭐⭐ - Average</option>
                            <option value="2">⭐⭐ - Poor</option>
                            <option value="1">⭐ - Very Poor</option>

                        </select>

                        <br />
                        <br />

                        <label>Comment</label>

                        <br />

                        <textarea
                            rows="4"
                            placeholder="Write your feedback..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />

                        <br />
                        <br />

                        <button
                            type="submit"
                            className="addBtn"
                        >
                            Submit Feedback
                        </button>

                    </form>

                </div>

                <br />

                <h2>My Feedback</h2>

                {loading ? (

                    <p>Loading feedback...</p>

                ) : (

                    <table className="foodTable">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Food</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {feedback.length === 0 ? (

                                <tr>

                                    <td colSpan="5">
                                        No feedback submitted yet
                                    </td>

                                </tr>

                            ) : (

                                feedback.map(item => (

                                    <tr key={item.feedbackId}>

                                        <td>
                                            {item.feedbackId}
                                        </td>

                                        <td>
                                            {item.foodName}
                                        </td>

                                        <td>
                                            {"⭐".repeat(item.rating)}
                                        </td>

                                        <td>
                                            {item.comment}
                                        </td>

                                        <td>
                                            {item.feedbackDate
                                                ? new Date(
                                                    item.feedbackDate
                                                ).toLocaleString()
                                                : "N/A"}
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

export default Feedback;