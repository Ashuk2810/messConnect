import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function WalletManagement() {

const [users, setUsers] = useState([]);
const [balances, setBalances] = useState({});
const [search, setSearch] = useState("");
const [selectedUser, setSelectedUser] = useState(null);
const [amount, setAmount] = useState("");

const fetchUsers = async () => {

    try {

        const response = await api.get("/users/all");

        const userList = response.data.filter(
            user => user.role !== "ADMIN"
        );

        setUsers(userList);

        const balanceData = {};

        await Promise.all(

            userList.map(async user => {

                try {

                    const balanceResponse =
                        await api.get(`/wallet/balance/${user.userCode}`);

                    balanceData[user.userCode] =
                        balanceResponse.data.balance;

                } catch (error) {

                    console.error(
                        "Error loading balance:",
                        user.userCode,
                        error
                    );

                    balanceData[user.userCode] = 0;
                }

            })

        );

        setBalances(balanceData);

    } catch (error) {

        console.error("Error fetching users:", error);

        alert("Unable to load wallet information");

    }

};

useEffect(() => {

    fetchUsers();

}, []);

const handleRecharge = async () => {

    if (!selectedUser) {

        alert("Please select a user");

        return;

    }

    if (!amount || Number(amount) <= 0) {

        alert("Enter a valid recharge amount");

        return;

    }

    try {

        const response = await api.post(
            "/wallet/recharge",
            {
                userCode: selectedUser.userCode,
                amount: Number(amount)
            }
        );

        alert(response.data.message);

        setSelectedUser(null);
        setAmount("");

        fetchUsers();

    } catch (error) {

        console.error("Recharge error:", error);

        alert(
            error.response?.data?.message ||
            "Unable to recharge wallet"
        );

    }

};

const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    user.userCode.toLowerCase().includes(search.toLowerCase())
);

return (

    <AdminLayout>

        <h1>Wallet Management</h1>

        <div style={{ marginBottom: "20px" }}>

            <input
                className="searchBox"
                placeholder="Search User..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

        {selectedUser && (

            <div className="foodForm">

                <h2>
                    Recharge Wallet
                </h2>

                <p>
                    <b>User:</b> {selectedUser.fullName}
                </p>

                <p>
                    <b>User Code:</b> {selectedUser.userCode}
                </p>

                <p>
                    <b>Current Balance:</b> ₹
                    {balances[selectedUser.userCode] ?? 0}
                </p>

                <input
                    type="number"
                    placeholder="Enter Amount"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <br />
                <br />

                <button
                    className="addBtn"
                    onClick={handleRecharge}
                >
                    Recharge
                </button>

                <button
                    className="deleteBtn"
                    onClick={() => {
                        setSelectedUser(null);
                        setAmount("");
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel
                </button>

            </div>

        )}

        <br />

        <table className="foodTable">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>User Code</th>
                    <th>User Name</th>
                    <th>Wallet Balance</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {filteredUsers.length === 0 ? (

                    <tr>

                        <td colSpan="5">
                            No users found
                        </td>

                    </tr>

                ) : (

                    filteredUsers.map(user => (

                        <tr key={user.userId}>

                            <td>{user.userId}</td>

                            <td>{user.userCode}</td>

                            <td>{user.fullName}</td>

                            <td>
                                ₹{balances[user.userCode] ?? 0}
                            </td>

                            <td>

                                <button
                                    className="editBtn"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setAmount("");
                                    }}
                                >
                                    Add Money
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>

    </AdminLayout>

);


}

export default WalletManagement;
