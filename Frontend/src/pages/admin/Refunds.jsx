import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Admin.css";

function Refunds() {

    const [refunds, setRefunds] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRefunds = async () => {

        try {

            const response = await api.get("/refund/pending");

            console.log("PENDING REFUNDS:", response.data);

            setRefunds(response.data);

        } catch (error) {

            console.error("Refund Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load refund requests"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchRefunds();

    }, []);

    const approveRefund = async (refundId) => {

        if (!window.confirm("Approve this refund?")) {
            return;
        }

        try {

            await api.put(`/refund/${refundId}/approve`);

            alert("Refund approved successfully");

            fetchRefunds();

        } catch (error) {

            console.error("Approve Refund Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to approve refund"
            );

        }
    };

    const rejectRefund = async (refundId) => {

        if (!window.confirm("Reject this refund?")) {
            return;
        }

        try {

            await api.put(`/refund/${refundId}/reject`);

            alert("Refund rejected");

            fetchRefunds();

        } catch (error) {

            console.error("Reject Refund Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to reject refund"
            );

        }
    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/food">
                    Food Management
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <Link to="/admin/users">
                    Users
                </Link>

                <Link to="/admin/staff">
                    Staff
                </Link>

                <Link to="/admin/wallet">
                    Wallet
                </Link>

                <Link to="/admin/refunds">
                    Refunds
                </Link>

                <Link to="/admin/feedback">
                    Feedback
                </Link>

                <Link to="/login">
                    Logout
                </Link>

            </div>

            <div className="content">

                <h1>Refund Management</h1>

                {loading ? (

                    <p>Loading refund requests...</p>

                ) : (

                    <table className="foodTable">

                        <thead>

                            <tr>
                                <th>Refund ID</th>
                                <th>Bill ID</th>
                                <th>User Code</th>
                                <th>Amount</th>
                                <th>Reason</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {refunds.length === 0 ? (

                                <tr>

                                    <td colSpan="8">
                                        No pending refund requests
                                    </td>

                                </tr>

                            ) : (

                                refunds.map(refund => (

                                    <tr key={refund.refundId}>

                                        <td>
                                            {refund.refundId}
                                        </td>

                                        <td>
                                            {refund.billId}
                                        </td>

                                        <td>
                                            {refund.userCode}
                                        </td>

                                        <td>
                                            ₹{refund.refundAmount}
                                        </td>

                                        <td>
                                            {refund.reason || "N/A"}
                                        </td>

                                        <td>
                                            {refund.requestDate
                                                ? new Date(
                                                    refund.requestDate
                                                ).toLocaleString()
                                                : "N/A"}
                                        </td>

                                        <td>
                                            {refund.status}
                                        </td>

                                        <td>

                                            <button
                                                className="addBtn"
                                                onClick={() =>
                                                    approveRefund(
                                                        refund.refundId
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                            &nbsp;

                                            <button
                                                className="deleteBtn"
                                                onClick={() =>
                                                    rejectRefund(
                                                        refund.refundId
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

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

export default Refunds;