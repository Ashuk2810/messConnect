import Navbar from "../components/Navbar";

function Dashboard() {

const fullName = sessionStorage.getItem("fullName");
const userCode = sessionStorage.getItem("userCode");

return (

    <div>

        <Navbar />

        <div style={{ padding: "20px" }}>

            <h1>Welcome, {fullName || "User"} 👋</h1>

            <p>
                User Code: <strong>{userCode || "N/A"}</strong>
            </p>

            <h2>Today's Meals</h2>

            <ul>
                <li>Breakfast</li>
                <li>Lunch</li>
                <li>Dinner</li>
            </ul>

            <h2>Wallet Balance</h2>

            <p>₹0</p>

        </div>

    </div>

);

}

export default Dashboard;
