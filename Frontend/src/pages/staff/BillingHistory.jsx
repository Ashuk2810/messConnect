import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Staff.css";

function BillingHistory() {

    const [userCode, setUserCode] = useState("");
    const [history, setHistory] = useState([]);
    const [student, setStudent] = useState(null);

    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [correcting, setCorrecting] = useState(false);

    const [selectedBill, setSelectedBill] = useState(null);
    const [correctionItems, setCorrectionItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [correctionQuantity, setCorrectionQuantity] = useState(1);
    const [correctionReason, setCorrectionReason] =
        useState("Wrong item added");


    const searchHistory = async () => {

        if (!userCode.trim()) {
            alert("Enter User ID");
            return;
        }

        try {

            setSearching(true);
            setLoading(true);

            const usersResponse =
                await api.get("/users/all");

            const foundUser =
                usersResponse.data.find(
                    user =>
                        user.userCode.toLowerCase() ===
                        userCode.trim().toLowerCase()
                );

            if (!foundUser) {

                alert("User not found");

                setStudent(null);
                setHistory([]);

                return;
            }

            setStudent(foundUser);

            const historyResponse =
                await api.get(
                    `/billing/history/${foundUser.userCode}`
                );

            setHistory(historyResponse.data || []);

        } catch (error) {

            console.error(
                "Billing History Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load billing history"
            );

        } finally {

            setSearching(false);
            setLoading(false);

        }

    };


    const openCorrection = async (bill) => {

        try {

            const response =
                await api.get(
                    `/billing/correction/items/${bill.billId}`
                );

            const items = response.data || [];

            if (items.length === 0) {

                alert(
                    "No items available for correction in this bill."
                );

                return;
            }

            setSelectedBill(bill);
            setCorrectionItems(items);
            setSelectedItem(null);
            setCorrectionQuantity(1);
            setCorrectionReason("Wrong item added");

        } catch (error) {

            console.error(
                "Correction Items Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load correction items"
            );

        }

    };


    const correctBilling = async () => {

        if (!selectedBill) {
            alert("Select a bill first");
            return;
        }

        if (!selectedItem) {
            alert("Select an item to correct");
            return;
        }

        if (
            correctionQuantity <= 0 ||
            correctionQuantity >
                selectedItem.remainingQuantity
        ) {

            alert(
                "Correction quantity cannot be greater than remaining quantity"
            );

            return;
        }


        const restoreAmount =
            selectedItem.price *
            correctionQuantity;


        const confirmed = window.confirm(

            `Confirm Billing Correction?\n\n` +

            `Bill #${selectedBill.billId}\n` +

            `${selectedItem.foodName} × ` +
            `${correctionQuantity}\n\n` +

            `Amount to restore: ₹${restoreAmount}\n\n` +

            `Reason: ${correctionReason}\n\n` +

            `This amount will be added back ` +
            `to the student's wallet.`

        );


        if (!confirmed) {
            return;
        }


        try {

            setCorrecting(true);

            const request = {

                billId:
                    selectedBill.billId,

                foodId:
                    selectedItem.foodId,

                correctionQuantity:
                    correctionQuantity,

                reason:
                    correctionReason

            };


            await api.post(
                "/billing/correct",
                request
            );


            alert(
                `Billing corrected successfully.\n\n` +
                `₹${restoreAmount} restored to wallet.`
            );


            setSelectedBill(null);
            setCorrectionItems([]);
            setSelectedItem(null);
            setCorrectionQuantity(1);


            const historyResponse =
                await api.get(
                    `/billing/history/${student.userCode}`
                );

            setHistory(
                historyResponse.data || []
            );


        } catch (error) {

            console.error(
                "Billing Correction Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to correct billing"
            );

        } finally {

            setCorrecting(false);

        }

    };


    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>🍽 MessConnect</h2>

                <Link to="/staff/dashboard">
                    Dashboard
                </Link>

                <Link to="/staff/billing">
                    Billing Counter
                </Link>

                <Link to="/staff/billing-history">
                    Billing History
                </Link>

                <Link to="/login">
                    Logout
                </Link>

            </div>


            <div className="content">

                <h1>Billing History</h1>


                <div className="billingTop">

                    <input
                        className="searchBox"
                        placeholder="Enter Student ID"
                        value={userCode}
                        onChange={(e) =>
                            setUserCode(e.target.value)
                        }
                    />

                    <button
                        className="addBtn"
                        onClick={searchHistory}
                        disabled={searching}
                    >
                        {searching
                            ? "Searching..."
                            : "Search"}
                    </button>

                </div>


                {student && (

                    <div
                        className="card"
                        style={{ marginTop: "20px" }}
                    >

                        <h3>
                            Student Details
                        </h3>

                        <p>
                            <strong>Name:</strong>{" "}
                            {student.fullName}
                        </p>

                        <p>
                            <strong>User Code:</strong>{" "}
                            {student.userCode}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {student.status}
                        </p>

                    </div>

                )}


                {loading && (

                    <p style={{ marginTop: "20px" }}>
                        Loading billing history...
                    </p>

                )}


                {student && !loading && (

                    <div
                        className="card"
                        style={{ marginTop: "20px" }}
                    >

                        <h2>
                            Previous Bills
                        </h2>


                        {history.length === 0 ? (

                            <p>
                                No previous billing records found.
                            </p>

                        ) : (

                            <table className="foodTable">

                                <thead>

                                    <tr>

                                        <th>
                                            Bill ID
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Items
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {history.map(bill => (

                                        <tr
                                            key={bill.billId}
                                        >

                                            <td>
                                                #{bill.billId}
                                            </td>

                                            <td>
                                                {new Date(
                                                    bill.billDate
                                                ).toLocaleString()}
                                            </td>

                                            <td>
                                                {bill.items ||
                                                    "No items"}
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    bill.totalAmount
                                                }
                                            </td>

                                            <td>

                                                <button
                                                    className="editBtn"
                                                    onClick={() =>
                                                        openCorrection(
                                                            bill
                                                        )
                                                    }
                                                >
                                                    Correct Billing
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                )}


                {selectedBill && (

                    <div
                        className="card"
                        style={{
                            marginTop: "25px"
                        }}
                    >

                        <h2>
                            Billing Correction
                        </h2>

                        <hr />

                        <p>
                            <strong>
                                Bill ID:
                            </strong>{" "}
                            #{selectedBill.billId}
                        </p>

                        <p>
                            <strong>
                                Student:
                            </strong>{" "}
                            {selectedBill.userCode}
                        </p>

                        <p>
                            <strong>
                                Name:
                            </strong>{" "}
                            {selectedBill.fullName}
                        </p>


                        <h4>
                            Select item to correct:
                        </h4>


                        {correctionItems.map(item => (

                            <div
                                key={item.foodId}
                                style={{
                                    padding: "12px",
                                    marginBottom: "10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px"
                                }}
                            >

                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        cursor: "pointer"
                                    }}
                                >

                                    <input
                                        type="radio"
                                        name="correctionItem"
                                        checked={
                                            selectedItem?.foodId ===
                                            item.foodId
                                        }
                                        onChange={() => {

                                            setSelectedItem(item);
                                            setCorrectionQuantity(1);

                                        }}
                                    />

                                    <strong>
                                        {item.foodName}
                                    </strong>

                                    <span>
                                        Billed:{" "}
                                        {item.billedQuantity}

                                        {" | "}

                                        Already Corrected:{" "}
                                        {item.correctedQuantity}

                                        {" | "}

                                        Remaining:{" "}
                                        {item.remainingQuantity}

                                        {" × ₹"}

                                        {item.price}
                                    </span>

                                </label>

                            </div>

                        ))}


                        {selectedItem && (

                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px"
                                }}
                            >

                                <h4>
                                    Correction Quantity
                                </h4>

                                <p>
                                    Remaining Quantity:{" "}
                                    <strong>
                                        {
                                            selectedItem.remainingQuantity
                                        }
                                    </strong>
                                </p>


                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px"
                                    }}
                                >

                                    <button
                                        type="button"
                                        className="qtyBtn"
                                        onClick={() =>
                                            setCorrectionQuantity(
                                                previous =>
                                                    Math.max(
                                                        1,
                                                        previous - 1
                                                    )
                                            )
                                        }
                                        disabled={
                                            correctionQuantity <= 1
                                        }
                                    >
                                        -
                                    </button>


                                    <strong>
                                        {correctionQuantity}
                                    </strong>


                                    <button
                                        type="button"
                                        className="qtyBtn"
                                        onClick={() =>
                                            setCorrectionQuantity(
                                                previous =>
                                                    Math.min(
                                                        selectedItem.remainingQuantity,
                                                        previous + 1
                                                    )
                                            )
                                        }
                                        disabled={
                                            correctionQuantity >=
                                            selectedItem.remainingQuantity
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <p
                                    style={{
                                        marginTop: "15px"
                                    }}
                                >

                                    <strong>
                                        Amount to restore:
                                    </strong>{" "}

                                    ₹
                                    {
                                        selectedItem.price *
                                        correctionQuantity
                                    }

                                </p>

                            </div>

                        )}


                        <br />


                        <p>
                            <strong>
                                Reason:
                            </strong>
                        </p>


                        <select
                            value={correctionReason}
                            onChange={(e) =>
                                setCorrectionReason(
                                    e.target.value
                                )
                            }
                            style={{
                                padding: "10px",
                                width: "100%",
                                maxWidth: "400px"
                            }}
                        >

                            <option value="Wrong item added">
                                Wrong item added
                            </option>

                            <option value="Incorrect quantity">
                                Incorrect quantity
                            </option>

                            <option value="Billing mistake">
                                Billing mistake
                            </option>

                        </select>


                        <br />
                        <br />


                        <button
                            className="deleteBtn"
                            onClick={() => {

                                setSelectedBill(null);
                                setCorrectionItems([]);
                                setSelectedItem(null);
                                setCorrectionQuantity(1);

                            }}
                        >
                            Cancel
                        </button>


                        <button
                            className="addBtn"
                            style={{
                                marginLeft: "10px"
                            }}
                            onClick={correctBilling}
                            disabled={
                                correcting ||
                                !selectedItem
                            }
                        >

                            {correcting
                                ? "Correcting..."
                                : "Confirm Correction"}

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default BillingHistory;