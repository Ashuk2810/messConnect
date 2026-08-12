import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Staff.css";

function StaffRefund() {

    const [billId, setBillId] = useState("");
    const [refundAmount, setRefundAmount] = useState("");
    const [reason, setReason] = useState("");

    const requestRefund = async () => {

        if (!billId || !refundAmount || !reason) {
            alert("Please fill all fields");
            return;
        }

        try {

            await api.post("/refund/request", {

                billId: Number(billId),
                refundAmount: Number(refundAmount),
                reason

            });

            alert("Refund request created successfully.");

            setBillId("");
            setRefundAmount("");
            setReason("");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to create refund request"
            );

        }

    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>💰 MessConnect</h2>

                <Link to="/staff/dashboard">
                    Dashboard
                </Link>

                <Link to="/staff/billing">
                    Billing Counter
                </Link>

                <Link to="/staff/refunds">
                    Refund Requests
                </Link>

                <Link to="/login">
                    Logout
                </Link>

            </div>

            <div className="content">

                <h1>Create Refund Request</h1>

                <div className="card">

                    <label>Bill ID</label>

                    <input
                        type="number"
                        value={billId}
                        onChange={(e) =>
                            setBillId(e.target.value)
                        }
                    />

                    <br /><br />

                    <label>Refund Amount</label>

                    <input
                        type="number"
                        value={refundAmount}
                        onChange={(e) =>
                            setRefundAmount(e.target.value)
                        }
                    />

                    <br /><br />

                    <label>Reason</label>

                    <textarea
                        rows="4"
                        value={reason}
                        onChange={(e) =>
                            setReason(e.target.value)
                        }
                    />

                    <br /><br />

                    <button
                        className="addBtn"
                        onClick={requestRefund}
                    >
                        Create Refund Request
                    </button>

                </div>

            </div>

        </div>

    );

}

export default StaffRefund;