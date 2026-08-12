import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function Staff() {

const [staff, setStaff] = useState([]);
const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: ""
});

const fetchStaff = async () => {

    try {

        const response = await api.get("/users/all");

        const staffUsers = response.data.filter(
            user => user.userType === "STAFF"
        );

        setStaff(staffUsers);

    } catch (error) {

        console.error("Error fetching staff:", error);
        alert("Unable to load staff");

    }

};

useEffect(() => {

    fetchStaff();

}, []);

const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

};

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const data = {
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            userType: "STAFF",
            role: "BILLING_STAFF"
        };

        const response = await api.post(
    "/users/register",
    data
);

console.log("REGISTER RESPONSE:", response.data);

alert(
    `Staff Registered Successfully!\n\n` +
    `User Code: ${response.data.userCode}\n` +
    `Password: ${response.data.temporarayPassword}`
);
        setFormData({
            fullName: "",
            email: "",
            mobile: ""
        });

        setShowForm(false);

        fetchStaff();

    } catch (error) {

        console.error("Error registering staff:", error);

        alert(
            error.response?.data?.message ||
            "Unable to register staff"
        );

    }

};

const updateStatus = async (userId, currentStatus) => {

    const newStatus =
        currentStatus === "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";

    try {

        await api.put(
            `/users/${userId}/status?status=${newStatus}`
        );

        alert(`Staff status changed to ${newStatus}`);

        fetchStaff();

    } catch (error) {

        console.error("Status update error:", error);

        alert(
            error.response?.data?.message ||
            "Unable to update staff status"
        );

    }

};

const filteredStaff = staff.filter(emp =>
    emp.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    emp.userCode?.toLowerCase().includes(search.toLowerCase()) ||
    emp.mobile?.includes(search)
);

return (

    <AdminLayout>

        <h1>Staff Management</h1>

        <div style={{ marginBottom: "20px" }}>

            <input
                type="text"
                placeholder="Search Staff..."
                className="searchBox"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button
                className="addBtn"
                style={{ marginLeft: "10px" }}
                onClick={() => setShowForm(true)}
            >
                + Add Staff
            </button>

        </div>

        {showForm && (

            <div className="foodForm">

                <h2>Add Staff</h2>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Mobile</label>

                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Role</label>

                        <input
                            type="text"
                            value="Billing Staff"
                            readOnly
                        />
                    </div>

                    <button
                        type="submit"
                        className="addBtn"
                    >
                        Add Staff
                    </button>

                    <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => setShowForm(false)}
                    >
                        Cancel
                    </button>

                </form>

            </div>
        )}

        <br />

        <table className="foodTable">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>User Code</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                {filteredStaff.length === 0 ? (

                    <tr>

                        <td colSpan="7">
                            No staff members found
                        </td>

                    </tr>

                ) : (

                    filteredStaff.map(emp => (

                        <tr key={emp.userId}>

                            <td>{emp.userId}</td>

                            <td>{emp.userCode}</td>

                            <td>{emp.fullName}</td>

                            <td>{emp.mobile}</td>

                            <td>{emp.role}</td>

                            <td>{emp.status}</td>

                            <td>

                                <button
                                    className={
                                        emp.status === "ACTIVE"
                                            ? "deleteBtn"
                                            : "editBtn"
                                    }
                                    onClick={() =>
                                        updateStatus(
                                            emp.userId,
                                            emp.status
                                        )
                                    }
                                >
                                    {emp.status === "ACTIVE"
                                        ? "Deactivate"
                                        : "Activate"}
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

export default Staff;
