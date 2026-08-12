import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminLayout({ children }) {

    const [feedbackCount, setFeedbackCount] = useState(0);

    const location = useLocation();


    const fetchFeedbackCount = async () => {

        try {

            const response =
                await api.get("/feedback/unread-count");

            console.log(
                "Unread Feedback Count:",
                response.data
            );

            setFeedbackCount(
                Number(response.data || 0)
            );

        } catch (error) {

            console.error(
                "Feedback Count Error:",
                error
            );

        }

    };


    useEffect(() => {

        if (location.pathname === "/admin/feedback") {

            setFeedbackCount(0);

            return;

        }

        fetchFeedbackCount();

    }, [location.pathname]);


    return (

        <div className="dashboard">


            <div className="sidebar">


                <h2>
                    🍽 MessConnect
                </h2>


                <Link to="/admin/dashboard">
                    🏠 Dashboard
                </Link>


                <Link to="/admin/food">
                    🍽 Food Management
                </Link>
                
                 <Link to="/admin/orders">
                    Orders
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


                <Link to="/login">
                    🚪 Logout
                </Link>


            </div>


            <div className="content">

                {children}

            </div>


        </div>

    );

}

export default AdminLayout;