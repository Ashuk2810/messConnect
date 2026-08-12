import { useState } from "react";
import Navbar from "../components/Navbar";

function Wallet() {

    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");

    const addMoney = () => {

        if (amount === "" || amount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        setBalance(balance + parseInt(amount));
        setAmount("");

    };

    return (

        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>My Wallet</h2>

                    <h1>₹ {balance}</h1>

                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <br /><br />

                    <button onClick={addMoney}>
                        Add Money
                    </button>

                </div>

            </div>

        </>

    );

}

export default Wallet;