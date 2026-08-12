import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Staff.css";

function Billing() {

    const [userCode, setUserCode] = useState("");
    const [student, setStudent] = useState(null);
    const [wallet, setWallet] = useState(0);

    const [foodList, setFoodList] = useState([]);
    const [billItems, setBillItems] = useState([]);

    const [searching, setSearching] = useState(false);
    const [paying, setPaying] = useState(false);
    const [loadingMenu, setLoadingMenu] = useState(true);

    const [lastBill, setLastBill] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [selectedCorrectionItem, setSelectedCorrectionItem] = useState(null);

    const [billingHistory, setBillingHistory] = useState([]);
const [loadingHistory, setLoadingHistory] = useState(false);
const [showHistory, setShowHistory] = useState(false);
    const [correcting, setCorrecting] = useState(false);

    const [correctionQuantity, setCorrectionQuantity] = useState(1);
    const [correctionReason, setCorrectionReason] =
        useState("Wrong item added");


    useEffect(() => {

        const loadFood = async () => {

            try {

                setLoadingMenu(true);

                // Load ONLY today's menu selected by admin
                const response = await api.get("/user/menu");

                console.log(
                    "TODAY'S MENU FOR BILLING:",
                    response.data
                );

                setFoodList(response.data || []);

            } catch (error) {

                console.error(
                    "Today's Menu Loading Error:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Unable to load today's menu"
                );

            } finally {

                setLoadingMenu(false);

            }

        };

        loadFood();

    }, []);


    const searchStudent = async () => {

        if (!userCode.trim()) {

            alert("Enter User Code");

            return;

        }

        try {

            setSearching(true);

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
                setWallet(0);

                return;

            }

            setStudent(foundUser);

            const walletResponse =
                await api.get(
                    `/wallet/balance/${foundUser.userCode}`
                );

            setWallet(
                Number(walletResponse.data.balance || 0)
            );

            setBillItems([]);

            setLastBill(null);
            setShowCorrection(false);
            setSelectedCorrectionItem(null);
            setCorrectionQuantity(1);
            setCorrectionReason("Wrong item added");

        } catch (error) {

            console.error(
                "Search Student Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to find student"
            );

        } finally {

            setSearching(false);

        }

    };
    const loadBillingHistory = async (code) => {

    try {

        setLoadingHistory(true);

        const response = await api.get(
            `/billing/history/${code}`
        );

        setBillingHistory(response.data || []);
        setShowHistory(true);

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

        setLoadingHistory(false);

    }

};
const loadCorrectionItems = async (bill) => {

    try {

        const response = await api.get(
            `/billing/correction/items/${bill.billId}`
        );

        const items = response.data || [];

        if (items.length === 0) {
            alert("No items available for correction in this bill.");
            return;
        }

        setLastBill({
            billId: bill.billId,
            userCode: bill.userCode,
            fullName: bill.fullName,
            totalAmount: bill.totalAmount,

            items: items.map(item => ({
                foodId: item.foodId,
                foodName: item.foodName,
                quantity: item.remainingQuantity,
                price: item.price
            }))
        });

        setSelectedCorrectionItem(null);
        setCorrectionQuantity(1);
        setCorrectionReason("Wrong item added");
        setShowCorrection(true);

    } catch (error) {

        console.error(
            "Correction Items Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Unable to load bill items"
        );

    }

};

    const addItem = (food) => {

        if (!student) {

            alert("Search student first");

            return;

        }

        const existing =
            billItems.find(
                item => item.foodId === food.foodId
            );

        if (existing) {

            setBillItems(
                billItems.map(item =>
                    item.foodId === food.foodId
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                )
            );

        } else {

            setBillItems([
                ...billItems,
                {
                    foodId: food.foodId,
                    foodName: food.foodName,
                    category: food.category,
                    price: Number(food.price),
                    quantity: 1
                }
            ]);

        }

    };


    const increaseQty = (foodId) => {

        setBillItems(
            billItems.map(item =>
                item.foodId === foodId
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item
            )
        );

    };


    const decreaseQty = (foodId) => {

        setBillItems(

            billItems.flatMap(item => {

                if (item.foodId !== foodId) {
                    return item;
                }

                if (item.quantity === 1) {
                    return [];
                }

                return {
                    ...item,
                    quantity:
                        item.quantity - 1
                };

            })

        );

    };


    const removeItem = (foodId) => {

        setBillItems(
            billItems.filter(
                item => item.foodId !== foodId
            )
        );

    };


    const total = billItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    const remaining = wallet - total;


    const payNow = async () => {

        if (!student) {

            alert("Search student first");

            return;

        }

        if (billItems.length === 0) {

            alert("Add at least one food item");

            return;

        }

        if (total > wallet) {

            alert("Insufficient wallet balance");

            return;

        }

        try {

            setPaying(true);

            const request = {

                userCode: student.userCode,

                items: billItems.map(item => ({
                    foodId: item.foodId,
                    quantity: item.quantity
                }))

            };

            const response =
                await api.post(
                    "/billing/generate",
                    request
                );


            setLastBill({

                billId:
                    response.data.billId,

                userCode:
                    student.userCode,

                fullName:
                    student.fullName,

                totalAmount:
                    response.data.totalAmount,

                items: [...billItems]

            });


            setWallet(
                wallet - total
            );

            setBillItems([]);

            setShowCorrection(false);
            setSelectedCorrectionItem(null);
            setCorrectionQuantity(1);
            setCorrectionReason("Wrong item added");

            alert("Payment Successful!");

        } catch (error) {

            console.error(
                "Payment Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Payment failed"
            );

        } finally {

            setPaying(false);

        }

    };


    const correctBilling = async () => {

        if (!lastBill) {

            alert(
                "No bill available for correction"
            );

            return;

        }

        if (!selectedCorrectionItem) {

            alert(
                "Select an item to correct"
            );

            return;

        }

        if (
            correctionQuantity <= 0 ||
            correctionQuantity >
                selectedCorrectionItem.quantity
        ) {

            alert(
                "Correction quantity cannot be greater than billed quantity"
            );

            return;

        }


        const restoreAmount =
            selectedCorrectionItem.price *
            correctionQuantity;


        const confirmed = window.confirm(

            `Confirm Billing Correction?\n\n` +

            `${selectedCorrectionItem.foodName} × ` +
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
                    lastBill.billId,

                foodId:
                    selectedCorrectionItem.foodId,

                correctionQuantity:
                    correctionQuantity,

                reason:
                    correctionReason

            };


            await api.post(
                "/billing/correct",
                request
            );


            setWallet(
                previousWallet =>
                    previousWallet + restoreAmount
            );


            alert(
                `Billing corrected successfully\n\n` +
                `₹${restoreAmount} restored to wallet.`
            );


            setSelectedCorrectionItem(null);

            setCorrectionQuantity(1);

            setCorrectionReason(
                "Wrong item added"
            );

            setShowCorrection(false);

            setLastBill(null);


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


    const categories = [
        "BREAKFAST",
        "LUNCH",
        "DINNER",
        "SNACKS",
        "BEVERAGE"
    ];


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

                <h1>Billing Counter</h1>


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
                        onClick={searchStudent}
                        disabled={searching}
                    >

                        {searching
                            ? "Searching..."
                            : "Search"}

                    </button>

                </div>
                 {student && (
    <div className="card" style={{ marginTop: "15px" }}>

        <h3>Previous Billing History</h3>

        <p>
            View previous bills of{" "}
            <strong>{student.fullName}</strong>
        </p>

        <button
            className="addBtn"
            onClick={() =>
                loadBillingHistory(student.userCode)
            }
            disabled={loadingHistory}
        >
            {loadingHistory
                ? "Loading..."
                : "View Previous Bills"}
        </button>

        {showHistory && (
            <div style={{ marginTop: "20px" }}>

                {billingHistory.length === 0 ? (

                    <p>
                        No previous billing records found.
                    </p>

                ) : (

                    <table className="foodTable">

                        <thead>
                            <tr>
                                <th>Bill ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Correction</th>
                            </tr>
                        </thead>

                        <tbody>

                            {billingHistory.map(bill => (

                                <tr key={bill.billId}>

                                    <td>
                                        #{bill.billId}
                                    </td>

                                    <td>
                                        {new Date(
                                            bill.billDate
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {bill.items || "No items"}
                                    </td>

                                    <td>
                                        ₹{bill.totalAmount}
                                    </td>

                                    <td>

                                        <button
                                            className="editBtn"
                                           onClick={() => loadCorrectionItems(bill)}
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

    </div>
)}

                <br />


                {student && (

                    <div className="card">

                        <h3>
                            Student Details
                        </h3>


                        <p>

                            <strong>
                                Name :
                            </strong>{" "}

                            {student.fullName}

                        </p>


                        <p>

                            <strong>
                                User Code :
                            </strong>{" "}

                            {student.userCode}

                        </p>


                        <p>

                            <strong>
                                Wallet :
                            </strong>{" "}

                            ₹{wallet}

                        </p>


                        {student.status !== "ACTIVE" && (

                            <p
                                style={{
                                    color: "red",
                                    fontWeight: "bold"
                                }}
                            >

                                User account is inactive.
                                Billing is not allowed.

                            </p>

                        )}

                    </div>

                )}


                <br />


                <h2>
                    Today's Menu
                </h2>


                {loadingMenu ? (

                    <p>
                        Loading today's menu...
                    </p>

                ) : (

                    categories.map(category => {

                        const categoryFoods =
                            foodList.filter(
                                food =>
                                    food.category ===
                                    category
                            );


                        if (
                            categoryFoods.length === 0
                        ) {

                            return null;

                        }


                        return (

                            <div key={category}>

                                <h3
                                    className="menuCategoryTitle"
                                >
                                    {category}
                                </h3>


                                <table
                                    className="foodTable"
                                >

                                    <thead>

                                        <tr>

                                            <th>
                                                Food
                                            </th>

                                            <th>
                                                Price
                                            </th>

                                            <th>
                                                Add
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {categoryFoods.map(
                                            food => (

                                                <tr
                                                    key={
                                                        food.foodId
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            food.foodName
                                                        }
                                                    </td>


                                                    <td>
                                                        ₹
                                                        {
                                                            food.price
                                                        }
                                                    </td>


                                                    <td>

                                                        <button
                                                            className="editBtn"
                                                            onClick={() =>
                                                                addItem(
                                                                    food
                                                                )
                                                            }
                                                            disabled={
                                                                !student ||
                                                                student.status !==
                                                                    "ACTIVE"
                                                            }
                                                        >

                                                            Add

                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        );

                    })

                )}


                {!loadingMenu &&
                    foodList.length === 0 && (

                        <p>
                            No food items have been
                            added to today's menu.
                        </p>

                    )}


                <br />


                <h2>
                    Current Bill
                </h2>


                <table className="foodTable">

                    <thead>

                        <tr>

                            <th>
                                Food
                            </th>

                            <th>
                                Qty
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Total
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {billItems.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No items added
                                </td>

                            </tr>

                        ) : (

                            billItems.map(item => (

                                <tr
                                    key={
                                        item.foodId
                                    }
                                >

                                    <td>
                                        {
                                            item.foodName
                                        }
                                    </td>


                                    <td>

                                        <button
                                            className="qtyBtn"
                                            onClick={() =>
                                                decreaseQty(
                                                    item.foodId
                                                )
                                            }
                                        >
                                            -
                                        </button>


                                        <span
                                            style={{
                                                margin:
                                                    "0 12px"
                                            }}
                                        >
                                            {
                                                item.quantity
                                            }
                                        </span>


                                        <button
                                            className="qtyBtn"
                                            onClick={() =>
                                                increaseQty(
                                                    item.foodId
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </td>


                                    <td>
                                        ₹
                                        {
                                            item.price
                                        }
                                    </td>


                                    <td>
                                        ₹
                                        {
                                            item.price *
                                            item.quantity
                                        }
                                    </td>


                                    <td>

                                        <button
                                            className="deleteBtn"
                                            onClick={() =>
                                                removeItem(
                                                    item.foodId
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>


                <br />


                <div className="card">

                    <h2>
                        Total Bill : ₹{total}
                    </h2>


                    <h3>
                        Remaining Wallet : ₹
                        {remaining}
                    </h3>


                    <br />


                    <button
                        className="addBtn"
                        onClick={payNow}
                        disabled={
                            paying ||
                            !student ||
                            student.status !==
                                "ACTIVE" ||
                            billItems.length === 0
                        }
                    >

                        {paying
                            ? "Processing..."
                            : "Pay Now"}

                    </button>

                </div>


                {lastBill && (

                    <div
                        className="card"
                        style={{
                            marginTop: "25px"
                        }}
                    >

                        <h2>
                            ✓ Payment Successful
                        </h2>


                        <p>

                            <strong>
                                Bill #{lastBill.billId}
                            </strong>

                        </p>


                        <p>

                            Student:{" "}
                            {lastBill.userCode}

                        </p>


                        <p>

                            Name:{" "}
                            {lastBill.fullName}

                        </p>


                        <p>

                            Amount: ₹
                            {lastBill.totalAmount}

                        </p>


                        <br />


                        <button
                            className="addBtn"
                            onClick={() =>
                                setShowCorrection(
                                    !showCorrection
                                )
                            }
                        >

                            {showCorrection
                                ? "Close Correction"
                                : "Correct Billing"}

                        </button>


                        {showCorrection && (

                            <div
                                className="card"
                                style={{
                                    marginTop: "20px",
                                    background:
                                        "#f8f9fa"
                                }}
                            >

                                <h3>
                                    Billing Correction
                                </h3>


                                <hr />


                                <p>

                                    <strong>
                                        Bill ID:
                                    </strong>{" "}

                                    #{lastBill.billId}

                                </p>


                                <p>

                                    <strong>
                                        Student:
                                    </strong>{" "}

                                    {lastBill.userCode}

                                </p>


                                <p>

                                    <strong>
                                        Name:
                                    </strong>{" "}

                                    {lastBill.fullName}

                                </p>


                                <h4>
                                    Select item to
                                    correct:
                                </h4>


                                {lastBill.items.map(
                                    item => (

                                        <div
                                            key={
                                                item.foodId
                                            }
                                            style={{
                                                padding:
                                                    "12px",
                                                marginBottom:
                                                    "10px",
                                                border:
                                                    "1px solid #ddd",
                                                borderRadius:
                                                    "6px"
                                            }}
                                        >

                                            <label
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap:
                                                        "10px",
                                                    cursor:
                                                        "pointer"
                                                }}
                                            >

                                                <input
                                                    type="radio"
                                                    name="correctionItem"
                                                    checked={
                                                        selectedCorrectionItem?.foodId ===
                                                        item.foodId
                                                    }
                                                    onChange={() => {

                                                        setSelectedCorrectionItem(
                                                            item
                                                        );

                                                        setCorrectionQuantity(
                                                            1
                                                        );

                                                    }}
                                                />


                                                <strong>
                                                    {
                                                        item.foodName
                                                    }
                                                </strong>


                                                <span>

                                                    Billed:{" "}
                                                    {
                                                        item.quantity
                                                    }{" "}

                                                    × ₹
                                                    {
                                                        item.price
                                                    }

                                                </span>

                                            </label>

                                        </div>

                                    )
                                )}


                                {selectedCorrectionItem && (

                                    <div
                                        style={{
                                            marginTop:
                                                "20px",
                                            padding:
                                                "15px",
                                            border:
                                                "1px solid #ddd",
                                            borderRadius:
                                                "8px"
                                        }}
                                    >

                                        <h4>
                                            Correction Quantity
                                        </h4>


                                        <p>

                                            Billed Quantity:{" "}

                                            <strong>
                                                {
                                                    selectedCorrectionItem.quantity
                                                }
                                            </strong>

                                        </p>


                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap:
                                                    "15px"
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
                                                                previous -
                                                                    1
                                                            )
                                                    )
                                                }
                                                disabled={
                                                    correctionQuantity <=
                                                    1
                                                }
                                            >
                                                -
                                            </button>


                                            <strong>
                                                {
                                                    correctionQuantity
                                                }
                                            </strong>


                                            <button
                                                type="button"
                                                className="qtyBtn"
                                                onClick={() =>
                                                    setCorrectionQuantity(
                                                        previous =>
                                                            Math.min(
                                                                selectedCorrectionItem.quantity,
                                                                previous +
                                                                    1
                                                            )
                                                    )
                                                }
                                                disabled={
                                                    correctionQuantity >=
                                                    selectedCorrectionItem.quantity
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        <p
                                            style={{
                                                marginTop:
                                                    "15px"
                                            }}
                                        >

                                            <strong>
                                                Amount to restore:
                                            </strong>{" "}

                                            ₹
                                            {
                                                selectedCorrectionItem.price *
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
                                    value={
                                        correctionReason
                                    }
                                    onChange={(e) =>
                                        setCorrectionReason(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        padding:
                                            "10px",
                                        width:
                                            "100%",
                                        maxWidth:
                                            "400px"
                                    }}
                                >

                                    <option
                                        value="Wrong item added"
                                    >
                                        Wrong item added
                                    </option>


                                    <option
                                        value="Incorrect quantity"
                                    >
                                        Incorrect quantity
                                    </option>


                                    <option
                                        value="Billing mistake"
                                    >
                                        Billing mistake
                                    </option>

                                </select>


                                <br />
                                <br />


                                <button
                                    className="deleteBtn"
                                    onClick={() => {

                                        setShowCorrection(
                                            false
                                        );

                                        setSelectedCorrectionItem(
                                            null
                                        );

                                        setCorrectionQuantity(
                                            1
                                        );

                                        setCorrectionReason(
                                            "Wrong item added"
                                        );

                                    }}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="addBtn"
                                    style={{
                                        marginLeft:
                                            "10px"
                                    }}
                                    onClick={
                                        correctBilling
                                    }
                                    disabled={
                                        correcting ||
                                        !selectedCorrectionItem
                                    }
                                >

                                    {correcting
                                        ? "Correcting..."
                                        : "Confirm Correction"}

                                </button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Billing;