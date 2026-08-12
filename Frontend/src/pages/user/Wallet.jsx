import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "../admin/Admin.css";

function Wallet() {

const [balance, setBalance] = useState(0);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);

const userCode = sessionStorage.getItem("userCode");

useEffect(() => {

    const loadWallet = async () => {

        try {

            const balanceResponse = await api.get(
                `/wallet/balance/${userCode}`
            );

            console.log("Balance Response:", balanceResponse.data);

            setBalance(Number(balanceResponse.data.balance));

            const historyResponse = await api.get(
                `/wallet/history/${userCode}`
            );

            console.log(
                "Wallet History:",
                historyResponse.data
            );

            setTransactions(historyResponse.data);

        } catch (err) {

            console.log("Wallet Error:", err);

        } finally {

            setLoading(false);

        }

    };

    if (userCode) {
        loadWallet();
    }

}, [userCode]);

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

            <h1>Wallet</h1>

            <div className="cards">

                <div className="card">

                    <h2>Current Balance</h2>

                    <h1 style={{ color: "#0F5C4D" }}>
                        ₹ {balance}
                    </h1>

                </div>

            </div>

            <br />

            <div className="card">

                <h2>Wallet Information</h2>

                <p>
                    Your wallet can only be recharged by the Mess Admin.
                </p>

                <p>
                    Any recharge made by the Admin will be reflected
                    automatically in your wallet balance.
                </p>

                <p>
                    You will also receive a notification when money is
                    added to your wallet.
                </p>

            </div>

            <br />

            <h2>Transaction History</h2>

            {loading ? (

                <p>Loading transactions...</p>

            ) : (

                <table className="foodTable">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Balance After</th>
                        </tr>

                    </thead>

                    <tbody>

                        {transactions.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No transactions available
                                </td>

                            </tr>

                        ) : (

                            transactions.map(transaction => (

                                <tr key={transaction.historyId}>

                                    <td>
                                        {transaction.historyId}
                                    </td>

                                    <td>
                                        {transaction.transactionDate
                                            ? new Date(
                                                transaction.transactionDate
                                            ).toLocaleString()
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {transaction.transactionType}
                                    </td>

                                    <td>
                                        ₹{transaction.amount}
                                    </td>

                                    <td>
                                        ₹{transaction.balanceAfterTransaction}
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

export default Wallet;
