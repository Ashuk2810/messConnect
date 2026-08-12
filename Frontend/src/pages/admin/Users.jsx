import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        role: "USER",
        userType: "HOSTELLER"
    });

    const fetchUsers = async () => {

        try {

            const response = await api.get("/users/all");

            setUsers(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load users");

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "mobile") {

            const onlyNumbers = value.replace(/\D/g, "");

            if (onlyNumbers.length <= 10) {

                setForm({
                    ...form,
                    mobile: onlyNumbers
                });

            }

            return;
        }

        setForm({
            ...form,
            [name]: value
        });

    };

    const validateMobile = () => {

        const mobilePattern = /^[6-9][0-9]{9}$/;

        if (!mobilePattern.test(form.mobile)) {

            alert(
                "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9"
            );

            return false;
        }

        return true;
    };

    const clearForm = () => {

        setForm({
            fullName: "",
            email: "",
            mobile: "",
            role: "USER",
            userType: "HOSTELLER"
        });

        setEditing(false);
        setEditingId(null);
        setShowForm(false);

    };

    const addUser = async (e) => {

    e.preventDefault();

    if (loading) {
        return;
    }

    if (!validateMobile()) {
        return;
    }

    setLoading(true);

    try {

        const response = await api.post(
            "/users/register",
            form
        );

        alert(
            `User Created Successfully\n\nUser Code: ${response.data.userCode}\nPassword: ${response.data.password}`
        );

        clearForm();

        fetchUsers();

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Unable to add user"
        );

    } finally {

        setLoading(false);

    }

};

    const updateUser = async (e) => {

        e.preventDefault();

        if (!validateMobile()) {
            return;
        }

        try {

            await api.put(
                `/users/${editingId}`,
                form
            );

            alert("User Updated Successfully");

            clearForm();

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update user"
            );

        }

    };

    const editUser = (user) => {

        setEditing(true);

        setEditingId(user.userId);

        setShowForm(true);

        setForm({
            fullName: user.fullName || "",
            email: user.email || "",
            mobile: user.mobile || "",
            role: user.role || "USER",
            userType: user.userType || "HOSTELLER"
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const updateStatus = async (
        userId,
        currentStatus
    ) => {

        const newStatus =
            currentStatus === "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE";

        try {

            await api.put(
                `/users/${userId}/status?status=${newStatus}`
            );

            alert(
                `User status changed to ${newStatus}`
            );

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update status"
            );

        }

    };

    const filteredUsers = users.filter(user => {

        const name = user.fullName || "";
        const code = user.userCode || "";
        const email = user.email || "";

        return (
            name.toLowerCase().includes(
                search.toLowerCase()
            ) ||
            code.toLowerCase().includes(
                search.toLowerCase()
            ) ||
            email.toLowerCase().includes(
                search.toLowerCase()
            )
        );

    });

    return (

        <AdminLayout>

            <h1>User Management</h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search User..."
                    className="searchBox"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    className="addBtn"
                    onClick={() => {

                        if (showForm) {

                            clearForm();

                        } else {

                            setShowForm(true);

                        }

                    }}
                >

                    {showForm
                        ? "✖ Close"
                        : "➕ Add User"}

                </button>

            </div>

            {showForm && (

                <div
                    className="card"
                    style={{ marginBottom: "25px" }}
                >

                    <h2>
                        {editing
                            ? "Edit User"
                            : "Add New User"}
                    </h2>

                    <form
                        onSubmit={
                            editing
                                ? updateUser
                                : addUser
                        }
                    >

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="mobile"
                            placeholder="10-digit Mobile Number"
                            value={form.mobile}
                            onChange={handleChange}
                            maxLength="10"
                            inputMode="numeric"
                            required
                        />

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >

                            <option value="USER">
                                USER
                            </option>

                            <option value="BILLING_STAFF">
                                BILLING STAFF
                            </option>

                        </select>

                        <select
                            name="userType"
                            value={form.userType}
                            onChange={handleChange}
                        >

                            <option value="HOSTELLER">
                                HOSTELLER
                            </option>

                            <option value="DAY_SCHOLAR">
                                DAY SCHOLAR
                            </option>

                            <option value="STAFF">
                                STAFF
                            </option>

                        </select>

                        <br />
                        <br />

                        <button
                     type="submit"
                      className="addBtn"
                      disabled={!editing && loading}
                       >
                     {editing
                    ? "Update User"
                      : loading
                         ? "Registering..."
                             : "Create User"}
                     </button>

                        {editing && (

                            <button
                                type="button"
                                className="deleteBtn"
                                style={{
                                    marginLeft: "10px"
                                }}
                                onClick={clearForm}
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </div>

            )}

            <table className="foodTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>User Code</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>User Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredUsers.length === 0 ? (

                        <tr>

                            <td colSpan="9">
                                No users found
                            </td>

                        </tr>

                    ) : (

                        filteredUsers.map(user => (

                            <tr key={user.userId}>

                                <td>
                                    {user.userId}
                                </td>

                                <td>
                                    {user.userCode}
                                </td>

                                <td>
                                    {user.fullName}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.mobile}
                                </td>

                                <td>
                                    {user.role}
                                </td>

                                <td>
                                    {user.userType}
                                </td>

                                <td>
                                    {user.status}
                                </td>

                                <td>

                                    <button
                                        className="editBtn"
                                        style={{
                                            marginRight: "8px"
                                        }}
                                        onClick={() =>
                                            editUser(user)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={
                                            user.status === "ACTIVE"
                                                ? "deleteBtn"
                                                : "addBtn"
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                user.userId,
                                                user.status
                                            )
                                        }
                                    >

                                        {user.status === "ACTIVE"
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

export default Users;