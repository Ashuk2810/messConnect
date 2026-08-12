import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function FeedbackManagement() {

    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchFeedback = async () => {

        try {

            const response = await api.get("/feedback/all");

            console.log("ALL FEEDBACK:", response.data);

            setFeedback(response.data);

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


    const markFeedbackViewed = async () => {

        try {

            await api.put("/feedback/viewed");

            console.log("Feedback marked as viewed");

        } catch (error) {

            console.error(
                "Mark Feedback Viewed Error:",
                error
            );

        }

    };


    useEffect(() => {

        const loadFeedback = async () => {

            await fetchFeedback();

            await markFeedbackViewed();

        };

        loadFeedback();

    }, []);


    return (

        <AdminLayout>

            <h1>
                Feedback Management
            </h1>


            <br />


            {loading ? (

                <p>
                    Loading feedback...
                </p>

            ) : (

                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                User Code
                            </th>

                            <th>
                                Food
                            </th>

                            <th>
                                Rating
                            </th>

                            <th>
                                Comment
                            </th>

                            <th>
                                Date
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {feedback.length === 0 ? (

                            <tr>

                                <td colSpan="6">
                                    No feedback found
                                </td>

                            </tr>

                        ) : (

                            feedback.map(item => (

                                <tr key={item.feedbackId}>

                                    <td>
                                        {item.feedbackId}
                                    </td>


                                    <td>
                                        {item.userCode}
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

        </AdminLayout>

    );

}

export default FeedbackManagement;