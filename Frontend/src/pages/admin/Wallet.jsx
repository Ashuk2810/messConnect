import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function Wallet() {

const [userCode, setUserCode] = useState("");
const [amount, setAmount] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);

const handleRecharge = async (e) => {

    e.preventDefault();

    if (!userCode || !amount) {
        alert("Please enter User Code and Amount");
        return;
    }

    if (Number(amount) <= 0) {
        alert("Amount must be greater than zero");
        return;
    }

    try {

        setLoading(true);
        setResult(null);

        const response = await api.post("/wallet/recharge", {
            userCode: userCode.trim().toUpperCase(),
            amount: Number(amount)
        });

        console.log("Recharge Response:", response.data);

        setResult(response.data);

        alert(
            "Wallet Recharged Successfully!\n\n" +
            "User Code: " + response.data.userCode + "\n" +
            "Added Amount: ₹" + response.data.rechargeAmount + "\n" +
            "Current Balance: ₹" + response.data.currentBalance
        );

        setUserCode("");
        setAmount("");

    } catch (error) {

        console.error("Recharge Error:", error);

        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        alert(
            error.response?.data?.message ||
            "Unable to recharge wallet"
        );

    } finally {

        setLoading(false);

    }
};

return (

    <AdminLayout>

        <h1>Wallet Management</h1>

        <div className="foodForm">

            <h2>Recharge User Wallet</h2>

            <form onSubmit={handleRecharge}>

                <div>
                    <label>User Code</label>

                    <input
                        type="text"
                        placeholder="Example: HOS000001"
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Recharge Amount</label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="addBtn"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Recharge Wallet"}
                </button>

            </form>

        </div>

        {result && (

            <div className="card" style={{ marginTop: "25px" }}>

                <h2>Recharge Successful</h2>

                <p>
                    <strong>User Code:</strong>{" "}
                    {result.userCode}
                </p>

                <p>
                    <strong>Recharge Amount:</strong>{" "}
                    ₹{result.rechargeAmount}
                </p>

                <p>
                    <strong>Current Balance:</strong>{" "}
                    ₹{result.currentBalance}
                </p>

            </div>

        )}

    </AdminLayout>

);


}

export default Wallet;
